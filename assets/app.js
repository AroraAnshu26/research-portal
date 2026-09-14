/* CTO-Portal front end. No framework, no build step.
   Talks to server.mjs when it is running; degrades to localStorage when it is not. */

(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var el = function (tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  };

  var STATE = {
    online: false,      // server.mjs is answering — reads and writes go to disk
    snapshot: null,     // data/manifest.json — static host, reads work, writes are local
    author: localStorage.getItem("portal.author") || "anshu",
    density: localStorage.getItem("portal.density") || "compact",
    closed: JSON.parse(localStorage.getItem("portal.closed") || "{}"),
    expanded: {},
    briefDate: null,
    date: null,
    meta: { logs: { anshu: [], veer: [] }, reports: [], briefs: [], userCards: [] },
    cards: []
  };

  /* ───────────────────────── helpers ───────────────────────── */

  function localDate(d) {
    d = d || new Date();
    var p = function (n) { return String(n).padStart(2, "0"); };
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  }
  function shiftDate(iso, days) {
    var parts = iso.split("-");
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    d.setDate(d.getDate() + days);
    return localDate(d);
  }
  function prettyDate(iso) {
    var parts = iso.split("-");
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    var mo = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"][d.getMonth()];
    return d.getDate() + " " + mo + " " + d.getFullYear();
  }
  function dow(iso) {
    var parts = iso.split("-");
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d.getDay()];
  }
  function bytes(n) {
    if (n < 1024) return n + " B";
    if (n < 1024 * 1024) return (n / 1024).toFixed(0) + " KB";
    return (n / 1024 / 1024).toFixed(1) + " MB";
  }
  function words(s) { s = (s || "").trim(); return s ? s.split(/\s+/).length : 0; }

  var toastTimer;
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("on"); }, 2100);
  }

  function api(path, opts) {
    return fetch(path, opts).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });
  }

  /* ───────────────────────── cards ───────────────────────── */

  var PROV_LABEL = {
    "own-prior-work": "your prior work",
    "web-2026-09-10": "new to you",
    "agent": "agent output"
  };

  function allCards() {
    var user = (STATE.meta.userCards || []).map(function (c) {
      return {
        id: c.id, axis: c.axis, kind: c.kind || "link", title: c.title, dek: c.dek || "",
        status: c.status || "current", date: c.date, owner: c.owner || STATE.author,
        open: c.open || "", openLabel: c.open ? "Open" : "",
        tags: c.tags || [], metrics: [], userAdded: true,
        body: c.body ? [["Notes", c.body]] : [],
        prov: { kind: "own-prior-work", note: "Added by you from the portal on " + (c.date || "") + "." }
      };
    });
    var curated = (window.LIBRARY || []).map(function (c) {
      var p = (window.PROVENANCE || {})[c.id];
      return p ? Object.assign({}, c, { prov: p }) : c;
    });
    return user.concat(curated);
  }

  function cardText(c) {
    var s = [c.title, c.dek, c.kind, c.status, (c.tags || []).join(" ")];
    (c.metrics || []).forEach(function (m) { s.push(m.v, m.l); });
    (c.body || []).forEach(function (b) { s.push(b[0], b[1]); });
    (c.files || []).forEach(function (f) { s.push(f.p, f.d); });
    return s.join(" ").toLowerCase();
  }

  function stClass(s) {
    var k = String(s || "").split(" ")[0].toLowerCase();
    var known = ["live", "running", "current", "done", "closed", "planned", "ready", "build", "blocked", "contested"];
    return "st st-" + (known.indexOf(k) >= 0 ? k : "current");
  }

  function renderBoard() {
    var q = $("#q").value.toLowerCase().trim();
    var fk = $("#fkind").value, fs = $("#fstatus").value;
    var board = $("#board");
    board.innerHTML = "";

    var visible = STATE.cards.filter(function (c) {
      if (fk && c.kind !== fk) return false;
      if (fs && c.status !== fs) return false;
      if (q && cardText(c).indexOf(q) < 0) return false;
      return true;
    });

    (window.AXES || []).forEach(function (ax) {
      var col = el("div", "col");
      col.setAttribute("data-axis", ax.id);
      var mine = visible.filter(function (c) { return c.axis === ax.id; });
      /* Newest first, so the CAP below folds the oldest rather than whatever
         happens to sit last in the library array. Undated cards sort last. */
      mine.sort(function (a, b) { return String(b.date || "").localeCompare(String(a.date || "")); });
      var shut = STATE.closed[ax.id];
      if (shut) col.classList.add("shut");

      var h = el("button", "col-h");
      h.title = shut ? "Show this column" : "Collapse this column";
      var t = el("div", "t");
      t.appendChild(el("span", null, ax.label));
      t.appendChild(el("span", "c", (shut ? "+" : "") + mine.length));
      h.appendChild(t);
      if (!shut) h.appendChild(el("div", "b", ax.blurb));
      h.onclick = function () {
        STATE.closed[ax.id] = !STATE.closed[ax.id];
        localStorage.setItem("portal.closed", JSON.stringify(STATE.closed));
        renderBoard();
      };
      col.appendChild(h);

      if (!shut) {
        /* A column shows five cards. Everything older folds, so a column that
           accumulates twenty cards over six months still reads as five. */
        var CAP = 5;
        var open = STATE.expanded[ax.id];
        var shown = open ? mine : mine.slice(0, CAP);
        shown.forEach(function (c) { col.appendChild(cardNode(c)); });

        if (mine.length > CAP) {
          var more = el("button", "fold thin",
            open ? "▾ fold " + (mine.length - CAP) + " older" : "▸ " + (mine.length - CAP) + " older");
          more.onclick = function () {
            STATE.expanded[ax.id] = !STATE.expanded[ax.id];
            renderBoard();
          };
          col.appendChild(more);
        }

        var add = el("button", "addcard", "+ add");
        add.onclick = function () { openAdd(ax.id); };
        col.appendChild(add);
      }

      board.appendChild(col);
    });

    $("#m-cards").textContent = STATE.cards.length + " cards";
  }

  /* Compact is the default. The card face carries only what you need to decide
     whether to open it: kind, status, title, one number, and where the claims
     came from. Everything else lives one click away in the drawer. */
  function cardNode(c) {
    var full = STATE.density === "full";
    var n = el("div", "card" + (full ? " full" : ""));
    n.onclick = function () { openDrawer(c); };

    var k = el("div", "kind");
    k.appendChild(el("span", null, c.kind));
    k.appendChild(el("span", stClass(c.status), c.status));
    n.appendChild(k);

    n.appendChild(el("div", "ct", c.title));

    if (full && c.dek) n.appendChild(el("div", "cd", c.dek));

    var m = (c.metrics || [])[0];
    if (m) {
      var cm = el("div", "cm");
      cm.appendChild(el("div", "v", m.v));
      cm.appendChild(el("div", "l" + (full ? "" : " clamp"), m.l));
      n.appendChild(cm);
    }

    if (full && (c.tags || []).length) {
      var tg = el("div", "tgs");
      c.tags.slice(0, 4).forEach(function (t) {
        tg.appendChild(el("span", "tg" + (/^(EDGE|DATE|CROWD)$/.test(t) ? " hot" : ""), t));
      });
      n.appendChild(tg);
    }

    if (c.prov) {
      var pv = el("div", "prov prov-" + c.prov.kind);
      pv.appendChild(el("span", "dot", ""));
      pv.appendChild(el("span", null, PROV_LABEL[c.prov.kind] || c.prov.kind));
      n.appendChild(pv);
    }
    return n;
  }

  /* ───────────────────────── drawer ───────────────────────── */

  function openDrawer(c) {
    var d = $("#drin");
    d.innerHTML = "";

    d.appendChild(el("div", "dr-k", c.kind + " · " + c.status + (c.date ? " · " + c.date : "") + " · " + (c.owner || "anshu")));
    d.appendChild(el("div", "dr-nm", c.title));
    if (c.dek) d.appendChild(el("div", "dr-sub", c.dek));

    if (c.prov) {
      var pb = el("div", "provbox prov-" + c.prov.kind);
      pb.appendChild(el("div", "pl", "Provenance · " + (PROV_LABEL[c.prov.kind] || c.prov.kind)));
      pb.appendChild(el("div", "pn", c.prov.note));
      d.appendChild(pb);
    }

    if ((c.tags || []).length) {
      var tg = el("div", "tgs");
      c.tags.forEach(function (t) {
        tg.appendChild(el("span", "tg" + (/^(EDGE|DATE|CROWD)$/.test(t) ? " hot" : ""), t));
      });
      d.appendChild(tg);
    }

    if ((c.metrics || []).length) {
      var band = el("div", "dr-band");
      c.metrics.forEach(function (m) {
        var tile = el("div", "tile");
        tile.appendChild(el("div", "v", m.v));
        tile.appendChild(el("div", "l", m.l));
        band.appendChild(tile);
      });
      d.appendChild(band);
    }

    var acts = el("div", "dr-actions");
    if (c.open) {
      var a = el("a", "btn solid", c.openLabel || "Open");
      a.href = c.open;
      a.target = "_blank";
      a.rel = "noopener";
      acts.appendChild(a);
    }
    var cp = el("button", "btn", c.copyText ? "Copy charter" : "Copy as markdown");
    cp.onclick = function () { copy(c.copyText || cardMarkdown(c)); };
    acts.appendChild(cp);

    if (!c.copyText) {
      var toPad = el("button", "btn", "Cite in today's log");
      toPad.onclick = function () { citeInPad(c); };
      acts.appendChild(toPad);
    }

    if (c.userAdded && STATE.online) {
      var del = el("button", "btn", "Remove card");
      del.onclick = function () {
        if (!confirm("Remove “" + c.title + "” from the board? The card is deleted; no files are touched.")) return;
        api("/api/card?id=" + encodeURIComponent(c.id), { method: "DELETE" }).then(function () {
          closeDrawer();
          return refreshMeta();
        }).then(function () { toast("Card removed"); });
      };
      acts.appendChild(del);
    }
    d.appendChild(acts);

    (c.body || []).forEach(function (b) {
      d.appendChild(el("div", "d-h", b[0]));
      d.appendChild(el("div", "d-body", b[1]));
    });

    if ((c.files || []).length) {
      d.appendChild(el("div", "d-h", "Files"));
      c.files.forEach(function (f) {
        var row = el("div", "d-file");
        var link = el("a", "fp", f.p);
        link.href = f.p; link.target = "_blank"; link.rel = "noopener";
        row.appendChild(link);
        row.appendChild(el("span", null, f.d));
        d.appendChild(row);
      });
    }

    $("#drawer").classList.add("on");
    $("#scrim").classList.add("on");
    $("#drawer").scrollTop = 0;
  }

  function closeDrawer() {
    $("#drawer").classList.remove("on");
    $("#scrim").classList.remove("on");
  }

  function cardMarkdown(c) {
    var out = ["# " + c.title, ""];
    if (c.dek) out.push(c.dek, "");
    out.push("`" + c.kind + " · " + c.status + " · " + (c.date || "") + "`", "");
    (c.metrics || []).forEach(function (m) { out.push("- **" + m.v + "** — " + m.l); });
    if ((c.metrics || []).length) out.push("");
    (c.body || []).forEach(function (b) { out.push("## " + b[0], "", b[1], ""); });
    (c.files || []).forEach(function (f) { out.push("- `" + f.p + "` — " + f.d); });
    return out.join("\n");
  }

  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast("Copied to clipboard"); },
        function () { fallbackCopy(text); });
    } else fallbackCopy(text);
  }
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed"; ta.style.left = "-9999px";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); toast("Copied to clipboard"); } catch (e) { toast("Copy failed"); }
    document.body.removeChild(ta);
  }

  function citeInPad(c) {
    var line = "> [" + c.title + "](" + (c.open || "#") + ") — " + (c.dek || "");
    STATE.date = localDate();
    showPage("pad");
    loadDay(STATE.date).then(function () {
      var pad = $("#pad");
      var sep = pad.value && !/\n\n$/.test(pad.value) ? "\n\n" : "";
      pad.value = pad.value + sep + line + "\n\n";
      pad.focus();
      pad.setSelectionRange(pad.value.length, pad.value.length);
      queueSave();
      closeDrawer();
      toast("Added to today's log");
    });
  }

  /* ───────────────────────── add card ───────────────────────── */

  function openAdd(axis) {
    var f = $("#addform");
    f.classList.add("on");
    if (axis) $("#a-axis").value = axis;
    $("#a-title").focus();
    f.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function saveCard() {
    var title = $("#a-title").value.trim();
    if (!title) { toast("A title, at least"); return; }
    var card = {
      title: title,
      axis: $("#a-axis").value,
      kind: $("#a-kind").value,
      dek: $("#a-dek").value.trim(),
      body: $("#a-body").value.trim(),
      open: $("#a-open").value.trim(),
      tags: $("#a-tags").value.split(",").map(function (s) { return s.trim(); }).filter(Boolean),
      owner: STATE.author,
      status: "current"
    };

    if (!STATE.online) {
      var local = JSON.parse(localStorage.getItem("portal.cards") || "[]");
      card.id = "u-" + Date.now().toString(36);
      local.unshift(card);
      localStorage.setItem("portal.cards", JSON.stringify(local));
      STATE.meta.userCards = local;
      STATE.cards = allCards();
      renderBoard();
      resetAdd();
      toast("Saved in this browser — start the server to write it to disk");
      return;
    }

    api("/api/card", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(card)
    }).then(function () { return refreshMeta(); })
      .then(function () { resetAdd(); toast("Card added to the board"); });
  }

  function resetAdd() {
    ["a-title", "a-dek", "a-body", "a-open", "a-tags"].forEach(function (id) { $("#" + id).value = ""; });
    $("#addform").classList.remove("on");
  }

  /* ───────────────────────── brief ─────────────────────────
     The one surface designed to grow. Briefs accumulate one file per weekday,
     so the archive is grouped by month and everything but the current month is
     folded. Only one brief is ever in the DOM at a time. */

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* Small markdown renderer. Deliberately partial: it covers exactly what the
     editor prompt is allowed to emit, so anything unexpected renders as plain
     text rather than silently disappearing. */
  function md(src) {
    var inline = function (t) {
      t = esc(t);
      t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
      t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener">$1</a>');
      t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      t = t.replace(/(^|[\s(])\*([^*\n]+)\*/g, "$1<em>$2</em>");
      return t;
    };
    var out = [], lines = String(src).replace(/\r/g, "").split("\n"), i = 0;
    while (i < lines.length) {
      var L = lines[i];
      if (/^\s*$/.test(L)) { i++; continue; }
      if (/^---+\s*$/.test(L)) { out.push("<hr>"); i++; continue; }
      var h = /^(#{1,4})\s+(.*)$/.exec(L);
      if (h) { var n = h[1].length; out.push("<h" + n + ">" + inline(h[2]) + "</h" + n + ">"); i++; continue; }
      if (/^>\s?/.test(L)) {
        var q = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) { q.push(lines[i].replace(/^>\s?/, "")); i++; }
        out.push("<blockquote>" + md(q.join("\n")) + "</blockquote>");
        continue;
      }
      if (/^\s*[-*]\s+/.test(L)) {
        var items = [];
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
          items.push("<li>" + inline(lines[i].replace(/^\s*[-*]\s+/, "")) + "</li>"); i++;
        }
        out.push("<ul>" + items.join("") + "</ul>");
        continue;
      }
      var para = [];
      while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,4}\s|>|---+\s*$|\s*[-*]\s)/.test(lines[i])) {
        para.push(lines[i]); i++;
      }
      out.push("<p>" + inline(para.join(" ")) + "</p>");
    }
    return out.join("\n");
  }

  function briefList() { return (STATE.meta.briefs || []); }

  function renderBriefDays() {
    var host = $("#briefdays");
    host.innerHTML = "";
    var days = briefList();
    $("#tn-brief").textContent = days.length || "";

    if (!days.length) {
      host.appendChild(el("div", "empty", "No brief yet."));
      return;
    }

    /* Recent five in full, everything older folded by month. */
    var recent = days.slice(0, 5), older = days.slice(5);
    var box = el("div", "daylist");
    recent.forEach(function (d) { box.appendChild(briefDayNode(d)); });
    host.appendChild(box);

    if (older.length) {
      var months = {};
      older.forEach(function (d) {
        var k = d.date.slice(0, 7);
        (months[k] = months[k] || []).push(d);
      });
      Object.keys(months).sort().reverse().forEach(function (k) {
        var open = false;
        var head = el("button", "fold");
        var label = function () {
          return (open ? "▾ " : "▸ ") + monthName(k) + "  ·  " + months[k].length;
        };
        head.textContent = label();
        var body = el("div", "daylist");
        body.style.display = "none";
        months[k].forEach(function (d) { body.appendChild(briefDayNode(d)); });
        head.onclick = function () {
          open = !open;
          body.style.display = open ? "" : "none";
          head.textContent = label();
        };
        host.appendChild(head);
        host.appendChild(body);
      });
    }
  }

  function monthName(k) {
    var p = k.split("-");
    var mo = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"][Number(p[1]) - 1];
    return mo + " " + p[0];
  }

  function briefDayNode(d) {
    var n = el("div", "day" + (d.date === STATE.briefDate ? " on" : ""));
    n.setAttribute("data-brief", d.date);
    var dd = el("div", "dd");
    dd.appendChild(el("span", null, d.date + "  " + dow(d.date).slice(0, 3)));
    dd.appendChild(el("span", null, d.words + "w"));
    n.appendChild(dd);
    if (d.lede) n.appendChild(el("div", "dp", d.lede));
    n.onclick = function () { loadBrief(d.date); };
    return n;
  }

  function loadBrief(date) {
    var host = $("#briefbody");
    var days = briefList();
    if (!days.length) {
      host.innerHTML = "";
      var e = el("div", "empty");
      e.appendChild(el("div", null, "No brief has been written yet."));
      var sub = el("div", "hint", "The first one lands at reports/newsletter/. Weekdays at 07:00, Monday covering the weekend.");
      e.appendChild(sub);
      host.appendChild(e);
      return;
    }
    STATE.briefDate = date || days[0].date;
    $$(".day[data-brief]").forEach(function (n) {
      n.classList.toggle("on", n.getAttribute("data-brief") === STATE.briefDate);
    });

    var render = function (text) {
      host.innerHTML = "";
      var art = el("article", "brief");
      art.innerHTML = md(text);
      host.appendChild(art);
      var foot = el("div", "brieffoot");
      var a = el("a", "btn", "Open the markdown");
      a.href = "reports/newsletter/" + STATE.briefDate + ".md";
      a.target = "_blank"; a.rel = "noopener";
      foot.appendChild(a);
      var cp = el("button", "btn", "Copy");
      cp.onclick = function () { copy(text); };
      foot.appendChild(cp);
      var q = el("button", "btn", "Answer the question in today's log");
      q.onclick = function () {
        var m = /##\s*ONE QUESTION\s*\n+([\s\S]*?)(\n##|\n---)/.exec(text);
        var question = m ? m[1].trim().replace(/\s+/g, " ") : "";
        STATE.date = localDate();
        showPage("pad");
        loadDay(STATE.date).then(function () {
          var pad = $("#pad");
          var sep = pad.value && !/\n\n$/.test(pad.value) ? "\n\n" : "";
          pad.value = pad.value + sep + "? " + question + "\n\n";
          pad.focus();
          pad.setSelectionRange(pad.value.length, pad.value.length);
          queueSave();
          toast("Question copied into today's log");
        });
      };
      foot.appendChild(q);
      host.appendChild(foot);
      host.scrollIntoView({ block: "start" });
    };

    var cached = (STATE.snapshot && STATE.snapshot.briefContents) || {};
    if (cached[STATE.briefDate]) { render(cached[STATE.briefDate]); return; }
    if (!STATE.online) { render("Brief text is not in this copy. Open the markdown file directly."); return; }
    api("/api/brief?date=" + STATE.briefDate)
      .then(function (r) { render(r.content); })
      .catch(function () { render("Could not load the brief for " + STATE.briefDate + "."); });
  }

  /* ───────────────────────── reports ───────────────────────── */

  var KIND_BY_EXT = {
    ".pdf": "PDF", ".html": "dashboard", ".md": "markdown", ".json": "data",
    ".py": "script", ".csv": "data", ".txt": "text"
  };

  function renderReports() {
    var q = $("#rq").value.toLowerCase().trim();
    var host = $("#reports");
    host.innerHTML = "";
    host.className = "";
    var rows = (STATE.meta.reports || []).filter(function (r) {
      return !q || r.p.toLowerCase().indexOf(q) >= 0;
    });

    $("#tn-reports").textContent = (STATE.meta.reports || []).length;
    $("#m-reports").textContent = (STATE.meta.reports || []).length + " files in reports/";

    if (!rows.length) {
      host.innerHTML = "";
      var e = el("div", "empty", STATE.online
        ? "Nothing matches. Drop a file into the reports/ folder and it shows up here."
        : "The file list needs the local server. Start it with “Start Portal.cmd”.");
      host.appendChild(e);
      return;
    }

    /* Grouped by month, current month open, everything older folded. This list
       only grows, so folding is the difference between a page and a wall. */
    var groups = {};
    rows.forEach(function (r) {
      var k = new Date(r.mtime).toISOString().slice(0, 7);
      (groups[k] = groups[k] || []).push(r);
    });
    var keys = Object.keys(groups).sort().reverse();
    keys.forEach(function (k, gi) {
      var openByDefault = gi === 0 || !!q;
      if (keys.length > 1) {
        var open = openByDefault;
        var head = el("button", "fold");
        var label = function () { return (open ? "▾ " : "▸ ") + monthName(k) + "  ·  " + groups[k].length + " files"; };
        head.textContent = label();
        var wrap = el("div");
        wrap.style.display = open ? "" : "none";
        wrap.appendChild(reportTable(groups[k]));
        head.onclick = function () {
          open = !open;
          wrap.style.display = open ? "" : "none";
          head.textContent = label();
        };
        host.appendChild(head);
        host.appendChild(wrap);
      } else {
        host.appendChild(reportTable(groups[k]));
      }
    });
  }

  function reportTable(rows) {
    var sheet = el("div", "sheet");
    var tbl = el("table");
    var thead = el("thead");
    var tr = el("tr");
    ["File", "Kind", "Size", "Modified", ""].forEach(function (h) { tr.appendChild(el("th", null, h)); });
    thead.appendChild(tr);
    tbl.appendChild(thead);

    var tb = el("tbody");
    rows.forEach(function (r) {
      var row = el("tr");
      var c1 = el("td", "fname");
      c1.appendChild(el("span", null, r.name));
      var dir = r.p.split("/").slice(1, -1).join("/");
      if (dir) c1.appendChild(el("span", "ex", dir));
      row.appendChild(c1);
      row.appendChild(el("td", null, KIND_BY_EXT[r.ext] || r.ext.replace(".", "")));
      row.appendChild(el("td", "mono", bytes(r.bytes)));
      row.appendChild(el("td", "mono", new Date(r.mtime).toLocaleString()));
      var c5 = el("td");
      var a = el("a", "btn", "Open");
      a.href = r.p; a.target = "_blank"; a.rel = "noopener";
      c5.appendChild(a);
      row.appendChild(c5);
      tb.appendChild(row);
    });
    tbl.appendChild(tb);
    sheet.appendChild(tbl);
    return sheet;
  }

  /* ───────────────────────── agents ───────────────────────── */

  function renderAgents() {
    var ol = $("#agrules");
    ol.innerHTML = "";
    (window.AGENT_RULES || []).forEach(function (r) { ol.appendChild(el("li", null, r)); });

    var host = $("#agents");
    host.innerHTML = "";
    var agents = window.AGENTS || [];
    $("#tn-agents").textContent = agents.length;

    var FAMILIES = [
      { id: "flow", label: "Flow · what moved", blurb: "Perishable. Value is in the delta. Succeeds by saying nothing happened on a quiet day." },
      { id: "stock", label: "Stock · what you understand", blurb: "Durable. Value compounds. Succeeds if you can explain the domain to a practitioner six weeks later without notes." },
      { id: "meta", label: "Meta · writing and memory", blurb: "The editor selects and never fetches. The ledger keeper makes repetition impossible." }
    ];

    FAMILIES.forEach(function (fam) {
      var mine = agents.filter(function (a) { return a.family === fam.id; });
      if (!mine.length) return;
      var head = el("div", "sec-h");
      head.appendChild(el("span", null, fam.label + "  ·  " + mine.length));
      head.appendChild(el("span", null, fam.blurb));
      host.appendChild(head);

      var grid = el("div", "agrid");
      mine.forEach(function (a) { grid.appendChild(agentNode(a)); });
      host.appendChild(grid);
    });
  }

  function agentNode(a) {
    var n = el("div", "ag");
    var h = el("div", "ah");
    h.appendChild(el("div", "an", a.name));
    h.appendChild(el("span", stClass(a.status), a.status));
    n.appendChild(h);

    var axis = (window.AXES || []).filter(function (x) { return x.id === a.axis; })[0];
    n.appendChild(el("div", "ac", a.cadence + (axis ? "  ·  feeds " + axis.label.toLowerCase() : "")));

    var spec = el("div", "aspec");
    if (a.model) spec.appendChild(kv("Model", a.model));
    if (a.ceiling) spec.appendChild(kv("Ceiling", a.ceiling));
    n.appendChild(spec);

    if (a.needs && a.needs.length) {
      n.appendChild(el("h4", null, a.status === "blocked" ? "Blocked on" : "Needs before it runs"));
      var ul = el("ul", "needs");
      a.needs.forEach(function (i) { ul.appendChild(el("li", null, i)); });
      n.appendChild(ul);
    }

    var foot = el("div", "afoot");
    var vc = el("button", "btn solid", "Open charter");
    vc.onclick = function () { openAgentDrawer(a); };
    foot.appendChild(vc);
    var cc = el("button", "btn", "Copy charter");
    cc.onclick = function () { copy(charterText(a)); };
    foot.appendChild(cc);
    n.appendChild(foot);
    return n;
  }

  function kv(k, v) {
    var row = el("div", "kvrow");
    row.appendChild(el("b", null, k));
    row.appendChild(el("span", null, v));
    return row;
  }

  function charterText(a) {
    return a.charter + "\n\n=== HOUSE RULES, inherited ===\n" +
      (window.AGENT_RULES || []).map(function (r, i) { return (i + 1) + ". " + r; }).join("\n\n");
  }

  function openAgentDrawer(a) {
    var body = [];
    if (a.sources && a.sources.length) body.push(["Sources", a.sources.map(function (s, i) { return (i + 1) + ". " + s; }).join("\n")]);
    if (a.output && a.output.length) body.push(["What the output must contain", a.output.map(function (s) { return "· " + s; }).join("\n\n")]);
    if (a.watchlist && a.watchlist.length) body.push(["Watchlist it carries forward", a.watchlist.map(function (s) { return "· " + s; }).join("\n")]);
    if (a.needs && a.needs.length) {
      body.push([a.status === "blocked" ? "Blocked on" : "Needs before it runs",
                 a.needs.map(function (s) { return "· " + s; }).join("\n")]);
    }
    body.push(["The charter, verbatim", a.charter]);
    body.push(["House rules it inherits", (window.AGENT_RULES || []).map(function (r, i) { return (i + 1) + ". " + r; }).join("\n\n")]);

    openDrawer({
      kind: "agent charter", status: a.status, date: a.cadence, owner: a.family,
      title: a.name,
      dek: a.model ? "Runs on: " + a.model + ". Ceiling: " + a.ceiling + "." : "",
      tags: [], metrics: [], body: body,
      copyText: charterText(a)
    });
  }

  /* ───────────────────────── scratchpad ───────────────────────── */

  var saveTimer = null, lastSaved = "";

  function padKey(date) { return "portal.log." + STATE.author + "." + date; }

  function loadDay(date) {
    STATE.date = date;
    $("#d-pick").value = date;
    $("#dtitle").innerHTML = "";
    $("#dtitle").appendChild(document.createTextNode(prettyDate(date)));
    var d = el("span", "dow", dow(date));
    $("#dtitle").appendChild(d);
    $("#pfile").textContent = "logs/" + STATE.author + "/" + date + ".md";
    highlightDay();

    if (!STATE.online) {
      var v = localStorage.getItem(padKey(date));
      if (v == null && STATE.snapshot) v = (STATE.snapshot.contents || {})[STATE.author + "/" + date];
      v = v || "";
      $("#pad").value = v;
      lastSaved = v;
      updateWords();
      return Promise.resolve();
    }
    return api("/api/log?author=" + STATE.author + "&date=" + date).then(function (r) {
      $("#pad").value = r.content || "";
      lastSaved = r.content || "";
      updateWords();
    }).catch(function () {
      $("#pad").value = localStorage.getItem(padKey(date)) || "";
      updateWords();
    });
  }

  function updateWords() {
    $("#pwords").textContent = words($("#pad").value) + " words";
  }

  function queueSave() {
    updateWords();
    $("#saved").textContent = "unsaved…";
    clearTimeout(saveTimer);
    saveTimer = setTimeout(doSave, 900);
  }

  function doSave() {
    var v = $("#pad").value;
    if (v === lastSaved) { $("#saved").textContent = ""; return; }
    localStorage.setItem(padKey(STATE.date), v);
    if (!STATE.online) {
      lastSaved = v;
      $("#saved").textContent = "saved in browser";
      return;
    }
    fetch("/api/log?author=" + STATE.author + "&date=" + STATE.date, {
      method: "PUT",
      headers: { "content-type": "text/plain; charset=utf-8" },
      body: v
    }).then(function (r) {
      if (!r.ok) throw new Error();
      lastSaved = v;
      $("#saved").textContent = "saved " + new Date().toLocaleTimeString();
      return refreshMeta(true);
    }).catch(function () {
      $("#saved").textContent = "server unreachable — kept in browser";
      setOnline(false);
    });
  }

  function renderDays() {
    var host = $("#daylist");
    host.innerHTML = "";
    var days = (STATE.meta.logs && STATE.meta.logs[STATE.author]) || [];
    $("#m-days").textContent = days.length + " day" + (days.length === 1 ? "" : "s") + " logged";

    if (!days.length) {
      host.appendChild(el("div", "empty", "No entries yet. Today is a good first one."));
      return;
    }
    days.forEach(function (d) {
      var n = el("div", "day" + (d.date === STATE.date ? " on" : ""));
      n.setAttribute("data-date", d.date);
      var dd = el("div", "dd");
      dd.appendChild(el("span", null, d.date));
      dd.appendChild(el("span", null, d.words + "w"));
      n.appendChild(dd);
      if (d.preview) n.appendChild(el("div", "dp", d.preview));
      n.onclick = function () { doSave(); loadDay(d.date); };
      host.appendChild(n);
    });
  }

  function highlightDay() {
    $$(".day").forEach(function (n) {
      n.classList.toggle("on", n.getAttribute("data-date") === STATE.date);
    });
  }

  function padSearch() {
    var q = $("#padq").value.trim();
    var host = $("#padhits");
    if (q.length < 2) { host.style.display = "none"; return; }
    if (!STATE.online) {
      renderHits({ hits: searchLocal(q) });
      return;
    }
    api("/api/search?q=" + encodeURIComponent(q)).then(renderHits);
  }

  function searchLocal(q) {
    var lc = q.toLowerCase(), seen = {}, hits = [];
    function scan(author, date, txt) {
      var key = author + "/" + date;
      if (seen[key]) return;
      seen[key] = 1;
      txt.split(/\r?\n/).forEach(function (line, i) {
        if (line.toLowerCase().indexOf(lc) >= 0) {
          hits.push({ author: author, date: date, line: line.trim().slice(0, 220), n: i + 1 });
        }
      });
    }
    Object.keys(localStorage).forEach(function (k) {
      var m = k.match(/^portal\.log\.(anshu|veer)\.(\d{4}-\d{2}-\d{2})$/);
      if (m) scan(m[1], m[2], localStorage.getItem(k) || "");
    });
    var c = (STATE.snapshot && STATE.snapshot.contents) || {};
    Object.keys(c).forEach(function (key) {
      var p = key.split("/");
      scan(p[0], p[1], c[key]);
    });
    hits.sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    return hits.slice(0, 120);
  }

  function renderHits(r) {
    var host = $("#padhits");
    host.style.display = "block";
    host.innerHTML = "";
    if (!r.hits.length) { host.appendChild(el("div", "empty", "No matches.")); return; }
    r.hits.forEach(function (h) {
      var n = el("div", "hit");
      n.appendChild(el("div", "hd", h.date + " · " + h.author + " · line " + h.n));
      n.appendChild(el("div", null, h.line));
      n.onclick = function () { doSave(); if (h.author !== STATE.author) setAuthor(h.author); loadDay(h.date); };
      host.appendChild(n);
    });
  }

  /* ───────────────────────── shell ───────────────────────── */

  function showPage(id) {
    $$(".page").forEach(function (p) { p.classList.toggle("on", p.id === "p-" + id); });
    $$(".tab").forEach(function (t) { t.classList.toggle("on", t.getAttribute("data-page") === id); });
    location.hash = id;
    if (id === "pad") setTimeout(function () { $("#pad").focus(); }, 60);
  }

  function setOnline(v) {
    STATE.online = v;
    var c = $("#conn");
    c.className = v ? "live" : "local";
    c.textContent = v ? "disk connected"
      : STATE.snapshot ? "read-only copy — notes save in this browser"
      : "browser-only — server not running";
  }

  /* Static host (GitHub Pages, or any plain file server): data/manifest.json is a
     snapshot of the reports listing and the logs, so everything still reads.
     Local edits go to this browser only, and never overwrite the snapshot. */
  function loadSnapshot() {
    return api("data/manifest.json").then(function (m) {
      STATE.snapshot = m;
      applySnapshot();
    }).catch(function () { STATE.snapshot = null; applySnapshot(); });
  }

  function applySnapshot() {
    var local = JSON.parse(localStorage.getItem("portal.cards") || "[]");
    if (STATE.snapshot) {
      STATE.meta.reports = STATE.snapshot.reports || [];
      STATE.meta.briefs = STATE.snapshot.briefs || [];
      STATE.meta.logs = JSON.parse(JSON.stringify(STATE.snapshot.logs || { anshu: [], veer: [] }));
      STATE.meta.userCards = (STATE.snapshot.userCards || []).concat(local);
    } else {
      STATE.meta.userCards = local;
    }
    /* days written in this browser that the snapshot does not know about */
    Object.keys(localStorage).forEach(function (k) {
      var m = k.match(/^portal\.log\.(anshu|veer)\.(\d{4}-\d{2}-\d{2})$/);
      if (!m) return;
      var txt = localStorage.getItem(k) || "";
      if (!txt.trim()) return;
      var list = STATE.meta.logs[m[1]] || (STATE.meta.logs[m[1]] = []);
      var row = list.filter(function (d) { return d.date === m[2]; })[0];
      var meta = {
        date: m[2], bytes: txt.length, words: txt.trim().split(/\s+/).length,
        preview: txt.replace(/^#.*$/gm, "").replace(/\s+/g, " ").trim().slice(0, 140),
        mtime: Date.now()
      };
      if (row) Object.assign(row, meta); else list.push(meta);
      list.sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    });
  }

  function setAuthor(a) {
    STATE.author = a;
    localStorage.setItem("portal.author", a);
    $("#author").value = a;
    renderDays();
    loadDay(STATE.date || localDate());
  }

  function refreshMeta(quiet) {
    if (!STATE.online) {
      applySnapshot();
      STATE.cards = allCards();
      if (!quiet) { renderBoard(); renderReports(); renderDays(); }
      return Promise.resolve();
    }
    return api("/api/meta").then(function (m) {
      STATE.meta = m;
      STATE.cards = allCards();
      renderDays();
      renderBriefDays();
      if (!quiet) { renderBoard(); renderReports(); }
      else { $("#m-days").textContent = (m.logs[STATE.author] || []).length + " days logged"; }
    });
  }

  function initFilters() {
    var kinds = {}, sts = {};
    STATE.cards.forEach(function (c) { kinds[c.kind] = 1; sts[c.status] = 1; });
    var fk = $("#fkind"), fs = $("#fstatus");
    fk.innerHTML = "<option value=''>All kinds</option>";
    fs.innerHTML = "<option value=''>All statuses</option>";
    Object.keys(kinds).sort().forEach(function (k) {
      var o = el("option", null, k); o.value = k; fk.appendChild(o);
    });
    Object.keys(sts).sort().forEach(function (k) {
      var o = el("option", null, k); o.value = k; fs.appendChild(o);
    });
    var ax = $("#a-axis");
    ax.innerHTML = "";
    (window.AXES || []).forEach(function (a) {
      var o = el("option", null, a.label); o.value = a.id; ax.appendChild(o);
    });
  }

  function boot() {
    $("#m-today").textContent = "today " + localDate();
    $("#author").value = STATE.author;
    STATE.date = localDate();

    /* ?static=1 skips the server and reads data/manifest.json instead — the same
       path a shared visitor takes. Useful for checking what they actually see. */
    var forceStatic = /[?&]static=1/.test(location.search);

    (forceStatic ? Promise.reject() : api("/api/meta")).then(function (m) {
      STATE.meta = m;
      setOnline(true);
    }, function () {
      return loadSnapshot().then(function () { setOnline(false); });
    }).then(function () {
      STATE.cards = allCards();
      initFilters();
      renderBoard();
      renderReports();
      renderAgents();
      renderDays();
      renderBriefDays();
      loadBrief(null);
      return loadDay(STATE.date);
    }).then(function () {
      var h = (location.hash || "").replace("#", "");
      if (["brief", "board", "reports", "agents", "pad", "about"].indexOf(h) >= 0) showPage(h);
    });

    /* wiring */
    $("#tabs").addEventListener("click", function (e) {
      var t = e.target.closest(".tab");
      if (t) showPage(t.getAttribute("data-page"));
    });
    $("#q").addEventListener("input", renderBoard);
    $("#fkind").addEventListener("change", renderBoard);
    $("#fstatus").addEventListener("change", renderBoard);
    $("#clear").onclick = function () {
      $("#q").value = ""; $("#fkind").value = ""; $("#fstatus").value = "";
      STATE.closed = {};
      localStorage.setItem("portal.closed", "{}");
      renderBoard();
    };
    $("#density").onclick = function () {
      STATE.density = STATE.density === "full" ? "compact" : "full";
      localStorage.setItem("portal.density", STATE.density);
      this.textContent = STATE.density === "full" ? "Compact view" : "Full view";
      renderBoard();
    };
    $("#density").textContent = STATE.density === "full" ? "Compact view" : "Full view";
    $("#toggleadd").onclick = function () { $("#addform").classList.toggle("on"); };
    $("#a-save").onclick = saveCard;
    $("#a-cancel").onclick = resetAdd;

    $("#rq").addEventListener("input", renderReports);

    $("#author").addEventListener("change", function () { doSave(); setAuthor(this.value); });

    $("#pad").addEventListener("input", queueSave);
    $("#pad").addEventListener("blur", doSave);
    $("#pad").addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") { e.preventDefault(); doSave(); }
    });
    $("#d-prev").onclick = function () { doSave(); loadDay(shiftDate(STATE.date, -1)); };
    $("#d-next").onclick = function () { doSave(); loadDay(shiftDate(STATE.date, 1)); };
    $("#d-today").onclick = function () { doSave(); loadDay(localDate()); };
    $("#d-pick").addEventListener("change", function () {
      if (this.value) { doSave(); loadDay(this.value); }
    });
    $("#d-copy").onclick = function () {
      copy("# " + prettyDate(STATE.date) + " — " + dow(STATE.date) + "\n\n" + $("#pad").value);
    };
    var padqTimer;
    $("#padq").addEventListener("input", function () {
      clearTimeout(padqTimer); padqTimer = setTimeout(padSearch, 260);
    });

    $("#drx").onclick = closeDrawer;
    $("#scrim").onclick = closeDrawer;
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });
    window.addEventListener("beforeunload", function () {
      if ($("#pad").value !== lastSaved) doSave();
    });
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
