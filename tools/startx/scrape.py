"""Harvest the StartX community directory.

StartX is the Stanford-affiliated accelerator: zero equity, no fees. Its
community page at web.startx.com/community is a Webflow CMS list rendered
server-side with Finsweet field attributes, 25 companies per page, paginated
with ?6a151520_page=N. Fields available per company: title, description,
session (e.g. "Spring 2026"), industry, year, and the outbound website link.

What it does NOT carry: founders, or any valuation. So degree level and worth
have to come from elsewhere — the YC founder dataset for the overlap, and
targeted research for the rest. This script only does the directory.

Output: tools/startx/companies.json
"""
import json, os, re, sys, io, time, html, urllib.request

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
HERE = os.path.dirname(os.path.abspath(__file__))
UA = {"User-Agent": "Mozilla/5.0 (research; anshuaro@stanford.edu)"}
BASE = "https://web.startx.com/community"
PAGE_PARAM = "6a151520_page"

ITEM = re.compile(r'<div role="listitem" class="comn-list-item w-dyn-item">(.*?)(?=<div role="listitem" class="comn-list-item w-dyn-item">|$)', re.S)


def get(url):
    for attempt in range(3):
        try:
            return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=45).read().decode("utf-8", "replace")
        except Exception:
            if attempt == 2:
                raise
            time.sleep(3)


def field(block, name):
    m = re.search(r'fs-list-field="%s"[^>]*>([^<]*)<' % name, block)
    return html.unescape(m.group(1)).strip() if m else ""


def parse(page_html):
    out = []
    for m in ITEM.finditer(page_html):
        b = m.group(1)
        title = field(b, "title")
        if not title:
            continue
        # first external href that is not a CDN asset
        site = ""
        for hm in re.finditer(r'href="(https?://[^"]+)"', b):
            u = hm.group(1)
            if "website-files.com" in u or "startx.com" in u:
                continue
            site = u
            break
        sessions = [html.unescape(x) for x in re.findall(r'fs-list-value="([^"]+)" fs-list-field="session"', b)]
        inds = [html.unescape(x) for x in re.findall(r'fs-list-value="([^"]+)" fs-list-field="industry"', b)]
        out.append({
            "name": title,
            "description": field(b, "description"),
            "session": sessions[0] if sessions else "",
            "sessions": sessions,
            "industry": inds[0] if inds else "",
            "industries": inds,
            "year": field(b, "year"),
            "website": site,
        })
    return out


def main():
    seen, rows, page = set(), [], 1
    while True:
        url = BASE if page == 1 else "%s?%s=%d" % (BASE, PAGE_PARAM, page)
        h = get(url)
        got = parse(h)
        fresh = [r for r in got if r["name"].lower() not in seen]
        for r in fresh:
            seen.add(r["name"].lower())
            rows.append(r)
        print("  page %-3d parsed=%-3d new=%-3d total=%d" % (page, len(got), len(fresh), len(rows)), flush=True)
        if not got or not fresh:
            break
        page += 1
        if page > 200:
            print("  stopping at page 200 guard")
            break
        time.sleep(0.25)

    path = os.path.join(HERE, "companies.json")
    json.dump(rows, io.open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("\nwrote %s" % path)
    print("companies: %d" % len(rows))
    from collections import Counter
    print("by year:", dict(sorted(Counter(r["year"] for r in rows).items(), reverse=True)))
    print("with a website: %d" % sum(1 for r in rows if r["website"]))


if __name__ == "__main__":
    main()
