"""Harvest founder records for every company in the YC directory.

The Algolia index that scrape.py reads carries no founder data at all — that
absence is why a press-search census of "Stanford student founders" undercounts
by roughly an order of magnitude. Each YC company page, however, embeds a JSON
blob containing founders[] with full_name, title and founder_bio, and the bios
routinely name the school. So the company page is the systematic source.

Run order:  scrape.py  ->  founders.py  ->  stanford_filter.py

Resumable: every page is cached under .cache/yc-founders/<slug>.json, so a
re-run only fetches what is missing. Delete the cache dir to force a refetch.
"""
import json, os, re, sys, io, time, html, threading, queue, urllib.request, urllib.error

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
CACHE = os.path.join(ROOT, ".cache", "yc-founders")
os.makedirs(CACHE, exist_ok=True)

UA = {"User-Agent": "Mozilla/5.0 (research; anshuaro@stanford.edu)"}
WORKERS = int(os.environ.get("YC_WORKERS", "8"))
DELAY = float(os.environ.get("YC_DELAY", "0.15"))   # per worker, between requests

# The founders array lives inside an HTML-escaped JSON attribute on the page.
# A non-greedy regex is not safe here: the avatar URLs are long, signed S3 links
# and the array is one element of a much larger blob, so the closing bracket has
# to be found by scanning with string-awareness rather than by pattern.
def _match_array(s, start):
    """Given s[start] == '[', return the index just past the matching ']'."""
    depth, i, n = 0, start, len(s)
    in_str, esc = False, False
    while i < n:
        c = s[i]
        if in_str:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == '"':
                in_str = False
        else:
            if c == '"':
                in_str = True
            elif c in "[{":
                depth += 1
            elif c in "]}":
                depth -= 1
                if depth == 0:
                    return i + 1
        i += 1
    return -1


def fetch(slug):
    """Return the page HTML, or None on a hard failure."""
    url = "https://www.ycombinator.com/companies/" + slug
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers=UA)
            return urllib.request.urlopen(req, timeout=45).read().decode("utf-8", "replace")
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return ""          # company page withdrawn; record as empty, do not retry
            if attempt == 2:
                return None
            time.sleep(2 + attempt * 3)
        except Exception:
            if attempt == 2:
                return None
            time.sleep(2 + attempt * 3)
    return None


def extract(page):
    """Pull the founders array out of a company page."""
    if not page:
        return []
    # Unescape once, then the blob is ordinary JSON text we can scan.
    s = html.unescape(page)
    arr = None
    for m in re.finditer(r'"founders"\s*:\s*\[', s):
        start = s.index("[", m.start())
        end = _match_array(s, start)
        if end < 0:
            continue
        try:
            cand = json.loads(s[start:end])
        except Exception:
            continue
        if isinstance(cand, list) and (not cand or isinstance(cand[0], dict)):
            arr = cand
            break
    if arr is None:
        return []
    out = []
    for f in arr:
        if not isinstance(f, dict):
            continue
        out.append({
            "name": (f.get("full_name") or "").strip(),
            "title": (f.get("title") or "").strip(),
            "bio": (f.get("founder_bio") or "").strip(),
            "active": bool(f.get("is_active", True)),
            "linkedin": (f.get("linkedin_url") or "").strip(),
            "twitter": (f.get("twitter_url") or "").strip(),
        })
    return out


def worker(q, results, lock, counters):
    while True:
        try:
            slug = q.get_nowait()
        except queue.Empty:
            return
        fp = os.path.join(CACHE, slug.replace("/", "_") + ".json")
        if os.path.exists(fp):
            try:
                with io.open(fp, encoding="utf-8") as fh:
                    rec = json.load(fh)
                with lock:
                    results[slug] = rec
                    counters["cached"] += 1
                q.task_done()
                continue
            except Exception:
                pass  # corrupt cache entry, refetch
        page = fetch(slug)
        if page is None:
            with lock:
                counters["failed"] += 1
                results[slug] = {"founders": [], "error": "fetch failed"}
        else:
            rec = {"founders": extract(page)}
            if page == "":
                rec["error"] = "404"
            with io.open(fp, "w", encoding="utf-8") as fh:
                json.dump(rec, fh, ensure_ascii=False)
            with lock:
                results[slug] = rec
                counters["fetched"] += 1
        with lock:
            n = counters["cached"] + counters["fetched"] + counters["failed"]
            if n % 100 == 0:
                print("  %d/%d  fetched=%d cached=%d failed=%d"
                      % (n, counters["total"], counters["fetched"],
                         counters["cached"], counters["failed"]), flush=True)
        time.sleep(DELAY)
        q.task_done()


def main():
    raw = json.load(io.open(os.path.join(HERE, "yc_raw.json"), encoding="utf-8"))
    slugs = [r["slug"] for r in raw if r.get("slug")]
    by_slug = {r["slug"]: r for r in raw if r.get("slug")}
    print("companies to resolve: %d  (workers=%d)" % (len(slugs), WORKERS))

    q = queue.Queue()
    for s in slugs:
        q.put(s)
    results, lock = {}, threading.Lock()
    counters = {"total": len(slugs), "fetched": 0, "cached": 0, "failed": 0}

    threads = [threading.Thread(target=worker, args=(q, results, lock, counters), daemon=True)
               for _ in range(WORKERS)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()

    out = []
    no_founders = 0
    for slug in slugs:
        rec = results.get(slug) or {"founders": []}
        f = rec.get("founders") or []
        if not f:
            no_founders += 1
        c = by_slug[slug]
        out.append({
            "slug": slug, "name": c.get("name"), "batch": c.get("batch"),
            "status": c.get("status"), "one_liner": c.get("one_liner"),
            "industry": c.get("industry"), "team_size": c.get("team_size"),
            "top_company": c.get("top_company"), "website": c.get("website"),
            # kept because "Stanford spinout" is sometimes stated in the company
            # blurb even when no founder filled in a bio
            "long_description": c.get("long_description") or "",
            "founders": f, "error": rec.get("error"),
        })
    path = os.path.join(HERE, "founders.json")
    with io.open(path, "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False)

    total_f = sum(len(r["founders"]) for r in out)
    print("\nwrote %s" % path)
    print("companies: %d   founder records: %d" % (len(out), total_f))
    print("companies with no founder data: %d (%.1f%%)"
          % (no_founders, 100.0 * no_founders / max(1, len(out))))
    print("fetch failures: %d" % counters["failed"])


if __name__ == "__main__":
    main()
