#!/usr/bin/env node
/*
  eurlex.mjs — primary-source retrieval of EU law, for F3 Policy Diff.

  WHY THIS EXISTS
  F3's charter says "quote or drop it": every movement carries a verbatim
  operative sentence from the primary document, and trade press may be used to
  FIND a primary document but never cited in place of one. On 2026-09-14 that
  rule could not be honoured, because eur-lex.europa.eu answers a non-browser
  client with HTTP 202 and a zero-length body. Four URL forms were tried
  (HTML, PDF, ELI, CELEX) and all returned nothing, so Regulation (EU)
  2026/1744 went into the brief as secondary-press.

  The fix is to stop asking the EUR-Lex web UI. The Publications Office CELLAR
  service holds the same documents, has no bot gate, and is the supported
  machine route:

    discovery  SPARQL   http://publications.europa.eu/webapi/rdf/sparql
    retrieval  REST     http://publications.europa.eu/resource/celex/<CELEX>
                        with Accept: application/xhtml+xml

  COMMANDS
    since <from> [--to <date>] [--sector 3] [--match <regex>] [--limit N]
                 [--by publication|document]
        List acts by OJ publication date, which is what F3's dateline rule
        requires. --by document switches to the act's own document date; the
        two differ by weeks and the gap is a live trap, see DATE_P below.
        Default window end is today, default sector is 3 (legislation), which
        suppresses the daily flood of preparatory documents and proposals.
        Use --sector all to see everything. Output carries entry-into-force,
        which is F3's `effective` field.

    get <CELEX> [--out <path>] [--raw]
        Fetch the full text. Cached under .cache/eurlex/.

    grep <CELEX> <regex> [--context N] [--all]
        Print matching passages with surrounding context. This is the command
        that produces the verbatim quote F3 must carry. Default is the first
        3 matches; --all prints every one.

  CELEX shape: sector(1) year(4) type(1) number. Type R=regulation,
  L=directive, D=decision. Regulation (EU) 2026/1744 is 32026R1744.
*/

import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = join(ROOT, '.cache', 'eurlex');
const SPARQL = 'http://publications.europa.eu/webapi/rdf/sparql';
const CELLAR = 'http://publications.europa.eu/resource/celex/';
const TIMEOUT = 120000;

function die(msg) { console.error(`eurlex: ${msg}`); process.exit(1); }

async function req(url, opts = {}) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), TIMEOUT);
  try {
    return await fetch(url, { ...opts, signal: ctl.signal });
  } finally {
    clearTimeout(t);
  }
}

/* ---------------------------------------------------------------- discovery */

async function sparql(query) {
  const url = `${SPARQL}?query=${encodeURIComponent(query)}&format=${encodeURIComponent('application/sparql-results+json')}`;
  const r = await req(url);
  if (!r.ok) die(`SPARQL returned HTTP ${r.status}`);
  const body = await r.text();
  let j;
  try { j = JSON.parse(body); }
  catch { die(`SPARQL did not return JSON. First 200 chars:\n${body.slice(0, 200)}`); }
  return j.results.bindings;
}

async function since(from, { to, sector, match, limit, by }) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from)) die(`bad from-date "${from}", expected YYYY-MM-DD`);
  to ||= new Date().toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(to)) die(`bad to-date "${to}", expected YYYY-MM-DD`);

  // Date and sector filter server-side, title regex client-side, and the
  // display limit applied LAST. The ordering matters: a SPARQL LIMIT applied
  // before the title filter picks an arbitrary N rows and the filter then
  // searches only those, which silently reports "no documents" for a window
  // that does contain them. Server-side REGEX over the title set is correct
  // but too slow to use daily (it did not return inside 120s for a 30-day
  // window), whereas date+sector over the same window returns ~150 rows in
  // under a second, so the whole window is cheap to pull and filter here.
  const sectorFilter = sector === 'all'
    ? ''
    : `  FILTER(STRSTARTS(STR(?celex), "${String(sector).replace(/[^0-9A-Za-z]/g, '')}"))\n`;

  // Dateline discipline: F3 filters on the source's own publication date. Those
  // are different fields in CELLAR and the gap is routinely weeks. Regulation
  // (EU) 2026/1744 carries work_date_document 2026-07-08 (the signature date)
  // and official-journal-act_date_publication 2026-07-24. Filtering on the
  // document date hides an act from the window it was actually published in.
  const DATE_P = by === 'document'
    ? 'http://publications.europa.eu/ontology/cdm#work_date_document'
    : 'http://publications.europa.eu/ontology/cdm#official-journal-act_date_publication';

  const q = `
PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>
SELECT DISTINCT ?celex ?date ?eif ?title WHERE {
  ?w <${DATE_P}> ?date .
  ?w cdm:resource_legal_id_celex ?celex .
  FILTER(?date >= "${from}"^^<http://www.w3.org/2001/XMLSchema#date>
      && ?date <= "${to}"^^<http://www.w3.org/2001/XMLSchema#date>)
${sectorFilter}  OPTIONAL {
    ?w <http://publications.europa.eu/ontology/cdm#resource_legal_date_entry-into-force> ?eif .
  }
  OPTIONAL {
    ?e cdm:expression_belongs_to_work ?w ;
       cdm:expression_uses_language <http://publications.europa.eu/resource/authority/language/ENG> ;
       cdm:expression_title ?title .
  }
} LIMIT 5000`;

  let rows = (await sparql(q)).map(r => ({
    celex: r.celex.value,
    date: r.date.value,
    eif: r.eif ? r.eif.value : '',
    title: r.title ? r.title.value : '',
  }));

  const scanned = rows.length;
  if (match) {
    let re;
    try { re = new RegExp(match, 'i'); }
    catch (e) { die(`bad --match regex: ${e.message}`); }
    rows = rows.filter(r => re.test(r.title) || re.test(r.celex));
  }
  rows.sort((a, b) => a.date.localeCompare(b.date) || a.celex.localeCompare(b.celex));
  const matched = rows.length;
  rows = rows.slice(0, limit || 60);

  // F3's provenance block has to state what was read and what was skipped, so
  // report the scanned count even when nothing matches.
  const label = by === 'document' ? 'document date' : 'OJ publication date';
  const scope = `${from}..${to} by ${label}, sector ${sector}, ${scanned} document(s) in window`;
  if (!rows.length) {
    console.log(match ? `no match for /${match}/i. ${scope}.` : `no documents. ${scope}.`);
    return;
  }
  console.log(`published  ${'CELEX'.padEnd(18)}  in force    title`);
  for (const r of rows) {
    console.log(`${r.date}  ${r.celex.padEnd(18)}  ${(r.eif || '-').padEnd(10)}  ${r.title.replace(/\s+/g, ' ').slice(0, 96)}`);
  }
  console.log(`\n${scope}${match ? `, ${matched} matching /${match}/i` : ''}${matched > rows.length ? `, showing ${rows.length}` : ''}`);
  console.log(`retrieve with:  node tools/eurlex.mjs get <CELEX>`);
}

/* ---------------------------------------------------------------- retrieval */

function toText(xhtml) {
  let t = xhtml
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<\/(p|div|tr|h[1-6]|li)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ');
  t = t
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
  return t.replace(/[ \t ]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
}

async function fetchCelex(celex) {
  mkdirSync(CACHE, { recursive: true });
  const hit = join(CACHE, `${celex}.txt`);
  if (existsSync(hit)) return readFileSync(hit, 'utf8');

  const r = await req(CELLAR + celex, {
    headers: { Accept: 'application/xhtml+xml', 'Accept-Language': 'eng' },
  });
  if (r.status === 404) die(`CELEX ${celex} not found. Check the identifier.`);
  if (!r.ok) die(`CELLAR returned HTTP ${r.status} for ${celex}`);

  const raw = await r.text();
  if (!raw.trim()) die(`CELLAR returned an empty body for ${celex}`);
  const text = toText(raw);
  writeFileSync(join(CACHE, `${celex}.xhtml`), raw);
  writeFileSync(hit, text);
  return text;
}

async function get(celex, { out, raw }) {
  const text = await fetchCelex(celex);
  if (raw) {
    const p = join(CACHE, `${celex}.xhtml`);
    console.log(readFileSync(p, 'utf8'));
    return;
  }
  if (out) {
    writeFileSync(out, text);
    console.log(`${celex}: ${text.length} chars -> ${out}`);
    return;
  }
  console.log(text);
}

async function grepCmd(celex, pattern, { context, all }) {
  const text = await fetchCelex(celex);
  let re;
  try { re = new RegExp(pattern, 'gi'); }
  catch (e) { die(`bad regex: ${e.message}`); }

  const pad = context ?? 400;
  const hits = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    hits.push(m.index);
    if (m.index === re.lastIndex) re.lastIndex++;
    if (!all && hits.length >= 3) break;
  }
  if (!hits.length) {
    console.log(`${celex}: no match for /${pattern}/i in ${text.length} chars`);
    process.exitCode = 1;
    return;
  }
  hits.forEach((i, n) => {
    console.log(`--- match ${n + 1} of ${hits.length} @ offset ${i} ---`);
    console.log(text.slice(Math.max(0, i - pad), i + pad).replace(/\n/g, ' ').trim());
    console.log();
  });
  console.log(`${celex}: ${hits.length}${all ? '' : '+'} match(es) for /${pattern}/i`);
}

/* ------------------------------------------------------------------- parse */

const argv = process.argv.slice(2);
const cmd = argv.shift();
const pos = [];
const flag = {};
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) {
    const k = argv[i].slice(2);
    const v = (argv[i + 1] && !argv[i + 1].startsWith('--')) ? argv[++i] : true;
    flag[k] = v;
  } else pos.push(argv[i]);
}

const USAGE = `eurlex — primary EU law for F3 Policy Diff

  node tools/eurlex.mjs since 2026-09-11 [--to 2026-09-14] [--sector 3|all]
                              [--match "machinery|artificial intelligence"] [--limit 60]
                              [--by publication|document]
  node tools/eurlex.mjs get 32026R1744 [--out file.txt] [--raw]
  node tools/eurlex.mjs grep 32026R1744 "Section B" [--context 400] [--all]

Why not eur-lex.europa.eu: it answers non-browser clients with HTTP 202 and an
empty body. These commands use the Publications Office CELLAR service instead.`;

try {
  if (cmd === 'since') {
    if (!pos[0]) die(`since needs a from-date.\n\n${USAGE}`);
    await since(pos[0], {
      to: typeof flag.to === 'string' ? flag.to : undefined,
      sector: flag.sector === undefined ? 3 : flag.sector,
      match: typeof flag.match === 'string' ? flag.match : undefined,
      limit: flag.limit ? +flag.limit : undefined,
      by: flag.by === 'document' ? 'document' : 'publication',
    });
  } else if (cmd === 'get') {
    if (!pos[0]) die(`get needs a CELEX id.\n\n${USAGE}`);
    await get(pos[0].toUpperCase(), {
      out: typeof flag.out === 'string' ? flag.out : undefined,
      raw: !!flag.raw,
    });
  } else if (cmd === 'grep') {
    if (!pos[0] || !pos[1]) die(`grep needs a CELEX id and a pattern.\n\n${USAGE}`);
    await grepCmd(pos[0].toUpperCase(), pos[1], {
      context: flag.context ? +flag.context : undefined,
      all: !!flag.all,
    });
  } else {
    console.log(USAGE);
    process.exit(cmd ? 1 : 0);
  }
} catch (e) {
  if (e.name === 'AbortError') die(`request timed out after ${TIMEOUT / 1000}s`);
  die(e.message);
}
