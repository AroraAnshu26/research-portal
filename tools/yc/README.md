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

- ~~web.archive.org is unreachable from this machine~~ **CORRECTED 2026-10-19.**
  The CDX API (`web.archive.org/cdx/search/cdx?...&output=json`) and raw snapshot
  fetches (`/web/<ts>id_/<url>`) both answer normally. The earlier "unreachable"
  reading was almost certainly the gzip trap: raw snapshots come back
  gzip-encoded, and a client that does not decompress gets binary that looks
  like a failed fetch. Use `--compressed`, or check for the `` magic and
  `gzip.decompress`. `prepivot.py` does this.
- ycombinator.com/rfs only server-renders the currently selected edition; the tab
  buttons are React state with no href and no reachable JSON. **Worked around
  2026-10-19**: open the page in a real browser engine, click each edition tab,
  read the rendered DOM. All three 2026 editions in `rfs_hardware_2026.json` are
  primary by that route. `rfs.json`'s pre-Fall-2026 editions remain the older
  secondary-source reconstruction and are superseded where the two overlap.

## The RFS hardware slice (added 2026-10-19)

A second pipeline sharing the same scrape, covering the eight space / defense /
silicon / metal RFS requests. Unlike the batch census it has **no Winter-2022
floor** — `scrape_all.py` pulls all 50 batches, Summer 2005 to Summer 2027
(6,306 companies), because the 2022 cut would hide Astranis (W16), Scale AI
(S16) and Solugen (W17).

```bash
python scrape_all.py     # -> yc_raw_all.json   (ALL batches, no 2022 floor)
python rfs_match.py      # -> rfs_companies.json, rfs_slugs.json
YC_FOUNDERS_SRC=yc_raw_all.json YC_FOUNDERS_ONLY=rfs_slugs.json   YC_FOUNDERS_OUT=rfs_founders.json python founders.py
python prepivot.py       # -> rfs_prepivot.json  (Wayback; slow, cached, resumable)
python build_rfs.py      # -> ../../reports/yc-rfs-hardware-map.html
python card_rfs.py       # registers the Library card (idempotent)
```

`founders.py` now takes three env vars (`YC_FOUNDERS_SRC`, `YC_FOUNDERS_ONLY`,
`YC_FOUNDERS_OUT`) so it can be pointed at a slug subset; with none set it
behaves exactly as before.

**Matching rule that matters.** The theme word must appear in a field the
company chose to describe itself by — one-liner, YC tags, or industry — not
merely somewhere in the long description. Without that rule a dating app and a
payments company scored as chip companies. There is also a hand-read exclusion
list in `rfs_match.py` for cases where the word is real but means something
else: a fundraising tool called "Metal", a bank offering "bare-metal" access,
mosquito-killing drones under defense. Do not regress those.

**Thin counts are findings.** Modern Metal Mills matches 4 companies and Compute
at Sea matches 1, out of 6,306. Those requests exist because the field is empty.
Resist the urge to loosen the query until the number looks respectable — an
earlier pass that did exactly that admitted the junk listed above.

**prepivot.py is rate-limited and partial.** 12 workers, per-slug JSON cache
under `.cache/yc-prepivot`, resumable. Of 134 matched companies with a former
name, the archive returned a usable pitch for 29 and a materially different one
for 20. The recovered pitch is the EARLIEST ARCHIVED one, which for some
companies postdates their batch — it is not necessarily the application pitch,
and the dashboard says so.
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
