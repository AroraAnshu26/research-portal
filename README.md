# Research Portal

A local portal for the five-axis worldview: where capital is moving, macro cycles,
geopolitics × technology, what is genuinely new, and a portfolio of explicit theses.

## Running it

Double-click **`Start Portal.cmd`**. A console window opens, the browser opens at
`http://localhost:4173`, and the portal has read/write access to the folders below.
Closing the console stops the portal. If Node is not found, the launcher opens
`index.html` directly in browser-only mode — everything still reads, and the
scratchpad saves inside the browser instead of to disk.

## What lives where

| Path | What it holds |
|---|---|
| `index.html`, `assets/` | The portal itself. No build step, no dependencies. |
| `data/library.js` | The curated research cards. Edit this file to add or amend a card by hand. |
| `data/agents.js` | The agent registry — one standing charter per agent. |
| `data/library-user.json` | Cards added through the portal's **+ Add material** form. Created on first use. |
| `logs/anshu/YYYY-MM-DD.md` | The daily scratchpad. One plain markdown file per day. |
| `logs/veer/YYYY-MM-DD.md` | Same, for the co-founder. Separate directory, same portal. |
| `reports/` | Full deliverables. Anything dropped in here shows up on the Reports tab automatically. |
| `server.mjs` | The local file store. Plain `node:http`, no dependencies. |

## Adding research

Three ways, in increasing permanence:

1. **From the portal** — *+ Add material* on the Library tab. Writes to
   `data/library-user.json`.
2. **A file** — drop a PDF, a markdown file, or a self-contained HTML dashboard into
   `reports/`. It appears on the Reports tab with no registration step.
3. **A curated card** — add an entry to `data/library.js`. That is where cards with
   metrics, sectioned bodies and attached files live. Shape:

```js
{
  id: "unique-slug",
  axis: "money" | "macro" | "geo" | "new" | "thesis",
  kind: "brief" | "report" | "dashboard" | "thesis" | "map" | "link" | "paper" | "person",
  title: "…",
  dek:   "One sentence.",
  status: "live" | "running" | "current" | "done" | "closed",
  date: "2026-09-10",
  owner: "anshu",
  open: "reports/thing.pdf",        // optional
  openLabel: "Open PDF",            // optional
  tags: ["…"],                      // EDGE / DATE / CROWD render highlighted
  metrics: [{ v: "3.0% → 20.1%", l: "what the number is" }],
  body: [["Section heading", "Paragraph."]],
  files: [{ p: "reports/thing.pdf", d: "what it is" }]
}
```

## Agents

Six standing briefs are written out on the Agents tab, each with its sources, cadence,
required output, and what it must never do. None of them run yet.

- **Ready to wire:** `batch-delta` — the YC scraper and classifier already exist.
- **No external access needed:** `geo-tech`, `assurance-watch`, `stanford-radar` — all
  public feeds with usable APIs.
- **Blocked on access:** `x-frontier` needs X API access or an authorised browser
  session plus the hand-built account list; `capital-flows` needs a rounds data source.

Until they are wired, **Copy charter** puts the full brief on the clipboard to paste into
a session. Agents write their output as `reports/<agent-id>-<YYYY-MM-DD>.md`, which the
Reports tab picks up on its own.

## When the co-founder joins

Already in place: the author selector, per-author log directories, and an `owner` field
on every card. What is left is hosting — put this folder behind git and run the same
`server.mjs` somewhere both of you can reach. No restructuring, and no data migration.

## House rules the research follows

1. Facts and observations. No ambition scores, no recommended verdicts, no selling.
2. Quantities over adjectives — counts, shares, dates, dollar figures, who pays.
   Estimates labelled as estimates, with the basis stated.
3. Observations stated as observations. "X went from 12% to 31%," not "you should look at X."
4. Recommendations only when explicitly asked for.
5. Pain is only real when learned from someone already spending money badly on it.
