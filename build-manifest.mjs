/* Generates data/manifest.json — a static snapshot of the reports listing and the
   daily logs, so the portal still works fully when it is served without server.mjs
   (GitHub Pages, or any plain static host).

   Run it before publishing:  node build-manifest.mjs
*/

import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

const ROOT = path.dirname(url.fileURLToPath(import.meta.url));
const AUTHORS = ["anshu", "veer"];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

async function walkReports() {
  const base = path.join(ROOT, "reports");
  const out = [];
  async function rec(rel) {
    for (const e of await fs.readdir(path.join(base, rel), { withFileTypes: true })) {
      const r = rel ? rel + "/" + e.name : e.name;
      if (e.isDirectory()) { await rec(r); continue; }
      const st = await fs.stat(path.join(base, r));
      out.push({ p: "reports/" + r, name: e.name, ext: path.extname(e.name).toLowerCase(), bytes: st.size, mtime: st.mtimeMs });
    }
  }
  await rec("");
  out.sort((a, b) => b.mtime - a.mtime);
  return out;
}

const logs = {};
const contents = {};
for (const a of AUTHORS) {
  logs[a] = [];
  const dir = path.join(ROOT, "logs", a);
  let names = [];
  try { names = await fs.readdir(dir); } catch { continue; }
  for (const nm of names) {
    if (!nm.endsWith(".md")) continue;
    const date = nm.slice(0, -3);
    if (!DATE_RE.test(date)) continue;
    const txt = await fs.readFile(path.join(dir, nm), "utf8");
    if (!txt.trim()) continue;
    const st = await fs.stat(path.join(dir, nm));
    logs[a].push({
      date, bytes: st.size, words: txt.trim().split(/\s+/).length,
      preview: txt.replace(/^#.*$/gm, "").replace(/\s+/g, " ").trim().slice(0, 140),
      mtime: st.mtimeMs
    });
    contents[a + "/" + date] = txt;
  }
  logs[a].sort((x, y) => (x.date < y.date ? 1 : -1));
}

/* Briefs, with their text, so the public copy reads fully offline. */
const briefs = [];
const briefContents = {};
{
  const dir = path.join(ROOT, "reports", "newsletter");
  let names = [];
  try { names = await fs.readdir(dir); } catch {}
  for (const nm of names) {
    if (!nm.endsWith(".md")) continue;
    const date = nm.slice(0, -3);
    if (!DATE_RE.test(date)) continue;
    const txt = await fs.readFile(path.join(dir, nm), "utf8");
    if (!txt.trim()) continue;
    const one = /##\s*THE ONE THING\s*\n+([^\n]+)/.exec(txt);
    briefs.push({
      date,
      words: txt.trim().split(/\s+/).length,
      lede: (one ? one[1] : txt.replace(/^#.*$/gm, "").replace(/\s+/g, " ").trim()).slice(0, 180)
    });
    briefContents[date] = txt;
  }
  briefs.sort((a, b) => (a.date < b.date ? 1 : -1));
}

let userCards = [];
try { userCards = JSON.parse(await fs.readFile(path.join(ROOT, "data", "library-user.json"), "utf8")); } catch {}

const manifest = {
  static: true,
  builtAt: new Date().toISOString(),
  authors: AUTHORS,
  reports: await walkReports(),
  briefs,
  briefContents,
  logs,
  contents,
  userCards
};

await fs.writeFile(path.join(ROOT, "data", "manifest.json"), JSON.stringify(manifest, null, 1), "utf8");
console.log("manifest.json written — " + manifest.reports.length + " reports, " +
  briefs.length + " briefs, " + AUTHORS.map((a) => a + ":" + logs[a].length + "d").join(" "));
