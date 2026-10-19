# -*- coding: utf-8 -*-
"""Recover each matched company's ORIGINAL YC pitch from the Wayback Machine.

Why this exists: the YC directory only ever serves a company's CURRENT pitch.
A company that pivoted -- and 181 of the 388 matched companies carry a
`former_names` entry -- has had its original thesis overwritten in place. The
only public record of what it pitched YC is an archived copy of its own YC
page.

Two routes to that record, and both are needed:
  1. the CURRENT slug, earliest snapshot  -- catches a pitch rewritten in place
  2. a FORMER name slugified              -- catches a rename, where the old
                                             pitch lives at a dead URL

NOTE ON A STALE CONSTRAINT: tools/yc/README.md and the brain both record
"web.archive.org is unreachable from this machine". That was true when written
and is NOT true now (verified 2026-10-19: CDX API returns 200). Raw snapshots
come back gzipped, so --compressed / decompress is mandatory; without it you
get binary and may wrongly conclude the fetch failed.
"""
import json, os, io, re, time, html, queue, threading, urllib.request, urllib.error, gzip

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
CACHE = os.path.join(ROOT, ".cache", "yc-prepivot")
os.makedirs(CACHE, exist_ok=True)
WORKERS = int(os.environ.get("PREPIVOT_WORKERS", "4"))
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) research/1.0"}


def slugify(n):
    s = (n or "").lower().strip()
    s = re.sub(r"\(.*?\)", " ", s)
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    s = re.sub(r"-(inc|llc|corp|corporation|co|ltd|labs?)$", "", s)
    return s


def get(url, timeout=60, tries=3):
    for a in range(tries):
        try:
            req = urllib.request.Request(url, headers=dict(UA, **{"Accept-Encoding": "gzip"}))
            r = urllib.request.urlopen(req, timeout=timeout)
            b = r.read()
            if r.headers.get("Content-Encoding") == "gzip" or b[:2] == b"\x1f\x8b":
                try:
                    b = gzip.decompress(b)
                except Exception:
                    pass
            return b.decode("utf-8", "replace")
        except urllib.error.HTTPError as e:
            if e.code in (404, 403):
                return None
            time.sleep(2 + a * 3)
        except Exception:
            time.sleep(2 + a * 3)
    return None


def cdx(slug):
    """Earliest archived snapshots of a YC company page, oldest first."""
    u = ("https://web.archive.org/cdx/search/cdx?url=ycombinator.com/companies/%s"
         "&output=json&fl=timestamp,statuscode&filter=statuscode:200&collapse=digest&limit=3" % slug)
    t = get(u, timeout=60)
    if not t:
        return []
    try:
        rows = json.loads(t)
    except Exception:
        return []
    return [r[0] for r in rows[1:]] if len(rows) > 1 else []


FIELDS = ("one_liner", "long_description", "name")


def extract(page):
    """Pull the company fields out of the HTML-escaped JSON blob YC embeds."""
    if not page:
        return {}
    u = html.unescape(page)
    out = {}
    for f in FIELDS:
        m = re.search(r'"%s"\s*:\s*"((?:[^"\\]|\\.)*)"' % f, u)
        if m:
            try:
                out[f] = json.loads('"%s"' % m.group(1))
            except Exception:
                out[f] = m.group(1)
    return out


def snapshot(slug, ts):
    p = get("https://web.archive.org/web/%sid_/https://www.ycombinator.com/companies/%s" % (ts, slug))
    d = extract(p)
    if d:
        d["timestamp"] = ts
        d["slug_used"] = slug
        d["archive_url"] = "https://web.archive.org/web/%s/https://www.ycombinator.com/companies/%s" % (ts, slug)
    return d


def norm(s):
    return re.sub(r"\s+", " ", (s or "")).strip().lower()


def resolve(c):
    """Earliest recoverable pitch for one company, across current + former slugs."""
    cur = c["slug"]
    cands = [cur] + [s for s in (slugify(n) for n in (c.get("former_names") or [])) if s and s != cur]
    seen, found = set(), []
    for s in cands:
        if s in seen:
            continue
        seen.add(s)
        for ts in cdx(s)[:1]:
            d = snapshot(s, ts)
            if d.get("one_liner") or d.get("long_description"):
                d["is_former_slug"] = (s != cur)
                found.append(d)
                break
    if not found:
        return None
    found.sort(key=lambda d: d["timestamp"])
    return found


def worker(q, res, lock, ctr):
    while True:
        try:
            c = q.get_nowait()
        except queue.Empty:
            return
        slug = c["slug"]
        fp = os.path.join(CACHE, slug.replace("/", "_") + ".json")
        if os.path.exists(fp):
            try:
                with lock:
                    res[slug] = json.load(io.open(fp, encoding="utf-8"))
                    ctr["cached"] += 1
                q.task_done(); continue
            except Exception:
                pass
        try:
            r = resolve(c) or []
        except Exception as e:
            r = []
            with lock:
                ctr["failed"] += 1
        json.dump(r, io.open(fp, "w", encoding="utf-8"), ensure_ascii=False)
        with lock:
            res[slug] = r
            ctr["done"] += 1
            n = ctr["done"] + ctr["cached"]
            if n % 20 == 0:
                print("  %d/%d  fetched=%d cached=%d failed=%d"
                      % (n, ctr["total"], ctr["done"], ctr["cached"], ctr["failed"]), flush=True)
        q.task_done()


def main():
    d = json.load(io.open(os.path.join(HERE, "rfs_companies.json"), encoding="utf-8"))
    comps = d["unique"]
    only = os.environ.get("PREPIVOT_ONLY")
    if only:
        keep = set(json.load(io.open(os.path.join(HERE, only), encoding="utf-8")))
        comps = [c for c in comps if c["slug"] in keep]
    elif os.environ.get("PREPIVOT_ALL") != "1":
        comps = [c for c in comps if c.get("former_names")]
    print("resolving pre-pivot pitches for %d companies (workers=%d)" % (len(comps), WORKERS))

    q = queue.Queue()
    for c in comps:
        q.put(c)
    res, lock = {}, threading.Lock()
    ctr = {"total": len(comps), "done": 0, "cached": 0, "failed": 0}
    ts = [threading.Thread(target=worker, args=(q, res, lock, ctr), daemon=True) for _ in range(WORKERS)]
    for t in ts: t.start()
    for t in ts: t.join()

    out, changed = {}, 0
    for c in comps:
        hist = res.get(c["slug"]) or []
        if not hist:
            continue
        first = hist[0]
        same = norm(first.get("one_liner")) == norm(c.get("one_liner"))
        rec = dict(
            slug=c["slug"], name=c["name"], batch=c["batch"],
            current_one_liner=c.get("one_liner"),
            original_one_liner=first.get("one_liner"),
            original_description=(first.get("long_description") or "")[:1400],
            original_name=first.get("name"),
            archived=first.get("timestamp"), archive_url=first.get("archive_url"),
            from_former_slug=first.get("is_former_slug", False),
            slug_used=first.get("slug_used"),
            former_names=c.get("former_names"),
            pitch_changed=(not same),
        )
        if not same:
            changed += 1
        out[c["slug"]] = rec

    json.dump(out, io.open(os.path.join(HERE, "rfs_prepivot.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    print("\nrecovered an archived pitch for %d of %d" % (len(out), len(comps)))
    print("pitch materially changed since the earliest snapshot: %d" % changed)
    print("recovered via a FORMER slug (dead URL): %d"
          % sum(1 for r in out.values() if r["from_former_slug"]))
    print("wrote rfs_prepivot.json")


if __name__ == "__main__":
    main()
