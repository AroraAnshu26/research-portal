/* CTO-Portal local server. No dependencies — plain node:http.
   Serves the portal and gives it a file-backed store so the daily log,
   the reports list and any cards added from the UI all live on disk
   as ordinary files you can read, edit, back up or commit.

   Start it with "Start Portal.cmd" (double-click) or: node server.mjs
*/

import http from "node:http";
import fs from "node:fs/promises";
import fssync from "node:fs";
import path from "node:path";
import url from "node:url";
import { exec, spawn } from "node:child_process";
import os from "node:os";

const ROOT = path.dirname(url.fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 4173);
const AUTHORS = ["anshu", "veer"];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".py": "text/plain; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".csv": "text/csv; charset=utf-8"
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const USER_CARDS = path.join(ROOT, "data", "library-user.json");

function j(res, code, obj) {
  const b = Buffer.from(JSON.stringify(obj));
  res.writeHead(code, { "content-type": "application/json; charset=utf-8", "content-length": b.length, "cache-control": "no-store" });
  res.end(b);
}

function safeAuthor(a) {
  return AUTHORS.includes(a) ? a : "anshu";
}

function logPath(author, date) {
  if (!DATE_RE.test(date)) return null;
  return path.join(ROOT, "logs", safeAuthor(author), date + ".md");
}

async function readBody(req, limit = 4 * 1024 * 1024) {
  const chunks = [];
  let n = 0;
  for await (const c of req) {
    n += c.length;
    if (n > limit) throw new Error("body too large");
    chunks.push(c);
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function listLogs(author) {
  const dir = path.join(ROOT, "logs", safeAuthor(author));
  await fs.mkdir(dir, { recursive: true });
  const names = await fs.readdir(dir);
  const out = [];
  for (const nm of names) {
    if (!nm.endsWith(".md")) continue;
    const date = nm.slice(0, -3);
    if (!DATE_RE.test(date)) continue;
    const full = path.join(dir, nm);
    const st = await fs.stat(full);
    let preview = "";
    if (st.size > 0) {
      const txt = await fs.readFile(full, "utf8");
      preview = txt.replace(/^#.*$/gm, "").replace(/\s+/g, " ").trim().slice(0, 140);
      out.push({ date, bytes: st.size, words: (txt.trim() ? txt.trim().split(/\s+/).length : 0), preview, mtime: st.mtimeMs });
    }
  }
  out.sort((a, b) => (a.date < b.date ? 1 : -1));
  return out;
}

async function walkReports() {
  const base = path.join(ROOT, "reports");
  await fs.mkdir(base, { recursive: true });
  const out = [];
  async function rec(rel) {
    const abs = path.join(base, rel);
    for (const e of await fs.readdir(abs, { withFileTypes: true })) {
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

/* The daily briefs. One file per weekday under reports/newsletter/.
   This list only ever grows, so it is deliberately metadata-only: the Brief
   tab loads one day's text at a time rather than all of them. */
async function listBriefs() {
  const dir = path.join(ROOT, "reports", "newsletter");
  await fs.mkdir(dir, { recursive: true });
  const out = [];
  for (const nm of await fs.readdir(dir)) {
    if (!nm.endsWith(".md")) continue;
    const date = nm.slice(0, -3);
    if (!DATE_RE.test(date)) continue;
    const txt = await fs.readFile(path.join(dir, nm), "utf8");
    const one = /##\s*THE ONE THING\s*\n+([^\n]+)/.exec(txt);
    out.push({
      date,
      words: txt.trim() ? txt.trim().split(/\s+/).length : 0,
      lede: (one ? one[1] : txt.replace(/^#.*$/gm, "").replace(/\s+/g, " ").trim()).slice(0, 180)
    });
  }
  out.sort((a, b) => (a.date < b.date ? 1 : -1));
  return out;
}

async function readUserCards() {
  try { return JSON.parse(await fs.readFile(USER_CARDS, "utf8")); } catch { return []; }
}

async function writeUserCards(arr) {
  await fs.mkdir(path.dirname(USER_CARDS), { recursive: true });
  await fs.writeFile(USER_CARDS, JSON.stringify(arr, null, 2), "utf8");
}

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, "http://localhost");
  const p = decodeURIComponent(u.pathname);

  try {
    /* ---------------- API ---------------- */
    if (p === "/api/ask/status" || p === "/api/ask") {
      // Tutor for reports that embed one. Runs the local Claude CLI with every tool disabled.
      // Only same-origin pages may call it: a random website cannot drive Claude on this machine.
      const origin = req.headers.origin;
      if (origin && !/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) return j(res, 403, { ok: false, error: "origin not allowed" });
      if (p === "/api/ask/status") return j(res, 200, await claudeStatus());
      if (req.method !== "POST") return j(res, 405, { ok: false });
      const body = JSON.parse((await readBody(req, 600 * 1024)).toString("utf8") || "{}");
      return askClaude(body, req, res);
    }

    if (p === "/api/meta") {
      const logs = {};
      for (const a of AUTHORS) logs[a] = await listLogs(a);
      return j(res, 200, {
        ok: true, authors: AUTHORS, logs,
        reports: await walkReports(), briefs: await listBriefs(),
        userCards: await readUserCards(), today: localDate()
      });
    }

    if (p === "/api/brief") {
      const date = u.searchParams.get("date") || "";
      if (!DATE_RE.test(date)) return j(res, 400, { ok: false, error: "bad date" });
      try {
        const content = await fs.readFile(path.join(ROOT, "reports", "newsletter", date + ".md"), "utf8");
        return j(res, 200, { ok: true, date, content });
      } catch { return j(res, 404, { ok: false, error: "no brief for " + date }); }
    }

    if (p === "/api/log") {
      const author = safeAuthor(u.searchParams.get("author"));
      const date = u.searchParams.get("date") || "";
      const fp = logPath(author, date);
      if (!fp) return j(res, 400, { ok: false, error: "bad date" });

      if (req.method === "GET") {
        let content = "";
        try { content = await fs.readFile(fp, "utf8"); } catch {}
        return j(res, 200, { ok: true, author, date, content });
      }
      if (req.method === "PUT") {
        const content = await readBody(req);
        await fs.mkdir(path.dirname(fp), { recursive: true });
        if (content.trim() === "") {
          try { await fs.unlink(fp); } catch {}
          return j(res, 200, { ok: true, deleted: true });
        }
        await fs.writeFile(fp, content, "utf8");
        const st = await fs.stat(fp);
        return j(res, 200, { ok: true, bytes: st.size, mtime: st.mtimeMs });
      }
      return j(res, 405, { ok: false });
    }

    if (p === "/api/search") {
      const q = (u.searchParams.get("q") || "").toLowerCase().trim();
      if (q.length < 2) return j(res, 200, { ok: true, hits: [] });
      const hits = [];
      for (const a of AUTHORS) {
        const dir = path.join(ROOT, "logs", a);
        let names = [];
        try { names = await fs.readdir(dir); } catch { continue; }
        for (const nm of names) {
          if (!nm.endsWith(".md")) continue;
          const txt = await fs.readFile(path.join(dir, nm), "utf8");
          const lines = txt.split(/\r?\n/);
          lines.forEach((line, i) => {
            if (line.toLowerCase().includes(q)) hits.push({ author: a, date: nm.slice(0, -3), line: line.trim().slice(0, 220), n: i + 1 });
          });
        }
      }
      hits.sort((a, b) => (a.date < b.date ? 1 : -1));
      return j(res, 200, { ok: true, hits: hits.slice(0, 120) });
    }

    if (p === "/api/card") {
      if (req.method === "POST") {
        const card = JSON.parse(await readBody(req));
        const cards = await readUserCards();
        card.id = "u-" + Date.now().toString(36);
        card.userAdded = true;
        card.date = card.date || localDate();
        cards.unshift(card);
        await writeUserCards(cards);
        return j(res, 200, { ok: true, card });
      }
      if (req.method === "DELETE") {
        const id = u.searchParams.get("id");
        const cards = (await readUserCards()).filter((c) => c.id !== id);
        await writeUserCards(cards);
        return j(res, 200, { ok: true });
      }
      return j(res, 405, { ok: false });
    }

    /* ---------------- static ---------------- */
    let rel = p === "/" ? "index.html" : p.replace(/^\/+/, "");
    const abs = path.resolve(ROOT, rel);
    if (!abs.startsWith(ROOT)) return j(res, 403, { ok: false });

    let st;
    try { st = await fs.stat(abs); } catch { res.writeHead(404, { "content-type": "text/plain" }); return res.end("404 " + rel); }
    if (st.isDirectory()) { res.writeHead(404); return res.end("404"); }

    const ext = path.extname(abs).toLowerCase();
    res.writeHead(200, {
      "content-type": MIME[ext] || "application/octet-stream",
      "content-length": st.size,
      "cache-control": "no-store"
    });
    fssync.createReadStream(abs).pipe(res);
  } catch (e) {
    j(res, 500, { ok: false, error: String(e && e.message || e) });
  }
});

/* ---------------- tutor: local Claude CLI ---------------- */
// The page sends {input: string | [{role, content}], tier}. We flatten turns into one transcript,
// pass it on stdin, and stream the answer back as plain text. Tools, MCP servers, settings files
// (and therefore hooks) and session saving are all switched off, so a tutor call can only write text.
const TIER_MODEL = { quick: "haiku", default: "sonnet", complex: "opus" };
let statusCache = null;
function runClaude(args, input, onChunk) {
  return new Promise((resolve) => {
    const cmd = "claude " + args.join(" ");
    const child = spawn(cmd, { shell: true, windowsHide: true, cwd: os.tmpdir() });
    let out = "", err = "";
    child.stdout.on("data", (d) => { out += d; onChunk && onChunk(d.toString("utf8")); });
    child.stderr.on("data", (d) => { err += d; });
    child.on("error", (e) => resolve({ code: -1, out, err: String(e) }));
    child.on("close", (code) => resolve({ code, out, err }));
    if (input !== undefined) child.stdin.end(input); else child.stdin.end();
    runClaude.last = child;
  });
}
async function claudeStatus() {
  if (statusCache && Date.now() - statusCache.at < 60000) return statusCache.v;
  const r = await runClaude(["auth", "status"]);
  let v;
  if (r.code === -1 || /not recognized|not found/i.test(r.err)) v = { ok: true, available: false, loggedIn: false, reason: "no-cli" };
  else { let s = {}; try { s = JSON.parse(r.out); } catch {} v = { ok: true, available: true, loggedIn: !!s.loggedIn }; }
  statusCache = { at: Date.now(), v };
  return v;
}
function flatten(input) {
  if (typeof input === "string") return input;
  if (!Array.isArray(input)) return "";
  const [first, ...rest] = input;
  const head = first && first.role === "user" ? first.content : "";
  const convo = (head ? rest : input).map((t) => (t.role === "assistant" ? "TUTOR: " : "LEARNER: ") + t.content).join("\n\n");
  return head + "\n\nCONVERSATION SO FAR (reply as TUTOR to the last LEARNER message; do not prefix your reply):\n\n" + convo;
}
async function askClaude(body, req, res) {
  const prompt = flatten(body.input).slice(0, 500 * 1024);
  if (!prompt.trim()) return j(res, 400, { ok: false, error: "empty" });
  const model = TIER_MODEL[body.tier] || "sonnet";
  const args = ["-p", "--restricted", '--tools ""', "--strict-mcp-config", "--no-session-persistence",
    "--model", model, "--output-format", "stream-json", "--include-partial-messages", "--verbose",
    "--system-prompt", '"You are a patient, precise tutor embedded in a reading page. Answer only from your knowledge and the material provided. You have no tools."'];
  res.writeHead(200, { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff" });
  let buf = "", sent = 0, finalText = "", failed = "";
  const p = runClaude(args, prompt, (chunk) => {
    buf += chunk;
    let i;
    while ((i = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, i); buf = buf.slice(i + 1);
      let ev; try { ev = JSON.parse(line); } catch { continue; }
      if (ev.type === "stream_event" && ev.event && ev.event.type === "content_block_delta" && ev.event.delta && ev.event.delta.type === "text_delta") {
        res.write(ev.event.delta.text); sent += ev.event.delta.text.length;
      } else if (ev.type === "result") {
        if (ev.is_error) failed = String(ev.result || "error"); else finalText = String(ev.result || "");
      }
    }
  });
  const child = runClaude.last;
  req.on("close", () => { if (!res.writableEnded && child && !child.killed) { try { child.kill(); } catch {} } });
  const r = await p;
  if (!sent && finalText) res.write(finalText);
  const errText = failed || (!sent && !finalText ? (r.err || r.out).slice(-400) : "");
  if (errText) {
    statusCache = null;
    const code = /authenticat|log ?in|OAuth/i.test(errText) ? "login" : "error";
    res.write("\n\u0000TUTOR_ERROR:" + code + ":" + errText.replace(/\s+/g, " ").slice(0, 300));
  }
  res.end();
}

function localDate(d = new Date()) {
  const p = (n) => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
}

server.on("error", (e) => {
  if (e.code === "EADDRINUSE") {
    console.log("\n  Portal is already running at http://localhost:" + PORT + "\n");
    if (!process.argv.includes("--no-open")) exec('start "" "http://localhost:' + PORT + '"');
    setTimeout(() => process.exit(0), 400);
  } else { console.error(e); process.exit(1); }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("\n  CTO-Portal  →  http://localhost:" + PORT);
  console.log("  Daily logs  →  " + path.join(ROOT, "logs"));
  console.log("  Reports     →  " + path.join(ROOT, "reports"));
  console.log("\n  Leave this window open while you use the portal. Close it to stop.\n");
  if (!process.env.NO_OPEN && !process.argv.includes("--no-open")) exec('start "" "http://localhost:' + PORT + '"');
});
