// Builds reports/next-word-to-next-action.html from the parts in this folder.
// Run: node tools/llm-curriculum/build.mjs
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
const here = path.dirname(url.fileURLToPath(import.meta.url));
const read = (f) => fs.readFileSync(path.join(here, f), "utf8");
const js = ["data1.js", "data2.js", "data3.js", "data4.js", "data5.js", "app.js"].map(read).join("\n");
const html = "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\">\n<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n</head>\n<body>\n" + read("top.html") + "\n<script>\n" + js + "\n</script>\n</body>\n</html>\n";
const out = path.join(here, "..", "..", "reports", "next-word-to-next-action.html");
fs.writeFileSync(out, html, "utf8");
console.log("wrote", out, html.length, "bytes");
