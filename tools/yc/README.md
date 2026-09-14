# YC batch census pipeline

Produces `reports/yc-batch-map.html`, the dashboard behind the **YC batch census**
card on the Money Flows column. Three scripts, run in order, no dependencies
beyond the Python standard library.

```bash
cd tools/yc
python scrape.py      # -> yc_raw.json   (live pull from YC's directory)
python classify2.py   # -> companies.json, trends.json
python build.py       # -> ../../reports/yc-batch-map.html
```

## What each script does

**`scrape.py`** — pulls every company YC publishes, batch by batch, from the
Algolia index behind ycombinator.com/companies.

- The search key **rotates**, so the script reads it live out of
  `window.AlgoliaOpts` in the directory page HTML and only falls back to the
  hardcoded key (valid 2026-09-10) if that fails. If you see
  `WARNING: window.AlgoliaOpts not found`, YC changed the page shape — find the
  new key in the HTML before trusting the run.
- Batches are **discovered from the index facet**, not hardcoded, so a batch YC
  adds later appears with no code edit. Anything before Winter 2022 is out of
  scope (`discover_batches(from_year=2022)`).
- `top_company` is present in the public index but always `false`. Do not use it
  as a quality signal.
- `yc_raw.json` is gitignored — it is a 3.3 MB raw API dump, regenerable in one
  command, and the same records are already embedded in the dashboard.

**`classify2.py`** — single-label theme per company (21 themes) plus multi-label
keyword flags (22 flags). Scoring is weighted: a hit in the one-liner counts 4, in
YC's tags 3, in the description up to 3, plus a bonus when YC's own subindustry
agrees, with a boost for narrow unambiguous themes. Below a score of 4 a company
lands in `Other / Unclassified` — about 16–17% of any given pull. Batch order and
short codes (W/X/S/F + year, Spring is X) derive from the data.

**`build.py`** — emits the single-file dashboard. Header, batch range, company
count and pull date derive from the data. `YC_MAP_OUT` overrides the output path;
`YC_PULL_DATE` overrides the pull date stamp.

## Before you republish a refreshed dashboard

The observation list and the RFS-vs-reality panel in `build_html()` are **hand
written for the 2026-09-10 pull**. Every figure in them — and the four `metrics`
on the library card — has to be re-checked against the new run's printed tables.
`build.py` prints a reminder to that effect. The data files checked in here are
the 2026-09-10 snapshot (3,009 companies, 15 batches, Winter 2022 → Fall 2026) so
that the pipeline, the data and the published artefact agree.

## Known soft spots, carried from the original pass

- web.archive.org is unreachable from this machine, so historical page states
  came from secondary sources.
- ycombinator.com/rfs only server-renders the currently selected edition; the tab
  buttons are React state with no href and no reachable JSON. Earlier RFS
  editions in `rfs.json` are reconstructed from named secondary sources, and the
  Winter-2025-vs-Spring-2025 boundary is explicitly unreliable. Fall 2026 is
  primary.
- Classification is keyword-derived and not hand-verified per company. Expect
  false positives in the flags.
- Every figure in `market.json` under `estimate` and `equity` is an
  order-of-magnitude estimate with its arithmetic shown, not sourced market
  research. `pool` mixes public statistics with companies' own claims and says
  which is which.

## Generating a batch delta

This is what the F-series `batch-delta` agent charter needs. Keep the previous
`companies.json`, run `scrape.py` + `classify2.py`, then diff on the `slug` field
for entrants and on `status` for exits. A first re-run on 2026-09-14 showed what
the diff surfaces: Winter 2027 had appeared as a batch (1 company), Fall 2026 had
grown 46 → 51, and Summer 2022 had dropped 234 → 233 — a company removed from the
directory, which is the kind of change only a diff catches.
