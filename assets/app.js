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
    date: null,
    meta: { logs: { anshu: [], veer: [] }, reports: [], userCards: [] },
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

  function allCards() {
    var user = (STATE.meta.userCards || []).map(function (c) {
      return {
        id: c.id, axis: c.axis, kind: c.kind || "link", title: c.title, dek: c.dek || "",
        status: c.status || "current", date: c.date, owner: c.owner || STATE.author,
        open: c.open || "", openLabel: c.open ? "Open" : "",
        tags: c.tags || [], metrics: [], userAdded: true,
        body: c.body ? [["Notes", c.body]] : []
      };
    });
    return user.concat(window.LIBRARY || []);
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
    return "st st-" + (["live", "running", "current", "done", "closed", "planned", "ready"].indexOf(k) >= 0 ? k : "current");
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

      var h = el("div", "col-h");
      var t = el("div", "t");
      t.appendChild(el("span", null, ax.label));
      t.appendChild(el("span", "c", String(mine.length)));
      h.appendChild(t);
      h.appendChild(el("div", "b", ax.blurb));
      col.appendChild(h);

      mine.forEach(function (c) { col.appendChild(cardNode(c)); });

      var add = el("button", "addcard", "+ add to " + ax.label.toLowerCase());
      add.onclick = function () { openAdd(ax.id); };
      col.appendChild(add);

      board.appendChild(col);
    });

    $("#m-cards").textContent = STATE.cards.length + " cards";
  }

  function cardNode(c) {
    var n = el("div", "card");
    n.onclick = function () { openDrawer(c); };

    var k = el("div", "kind");
    k.appendChild(el("span", null, c.kind + (c.userAdded ? " · added" : "")));
    var right = el("span", null, "");
    var st = el("span", stClass(c.status), c.status);
    right.appendChild(st);
    k.appendChild(right);
    n.appendChild(k);

    n.appendChild(el("div", "ct", c.title));
    if (c.dek) n.appendChild(el("div", "cd", c.dek));

    var m = (c.metrics || [])[0];
    if (m) {
      var cm = el("div", "cm");
      cm.appendChild(el("div", "v", m.v));
      cm.appendChild(el("div", "l", m.l));
      n.appendChild(cm);
    }

    if ((c.tags || []).length) {
      var tg = el("div", "tgs");
      c.tags.slice(0, 4).forEach(function (t) {
        var isHot = /^(EDGE|DATE|CROWD)$/.test(t);
        tg.appendChild(el("span", "tg" + (isHot ? " hot" : ""), t));
      });
      n.appendChild(tg);
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
    var cp = el("button", "btn", "Copy as markdown");
    cp.onclick = function () { copy(cardMarkdown(c)); };
    acts.appendChild(cp);

    var toPad = el("button", "btn", "Cite in today's log");
    toPad.onclick = function () { citeInPad(c); };
    acts.appendChild(toPad);

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

  /* ───────────────────────── reports ───────────────────────── */

  var KIND_BY_EXT = {
    ".pdf": "PDF", ".html": "dashboard", ".md": "markdown", ".json": "data",
    ".py": "script", ".csv": "data", ".txt": "text"
  };

  function renderReports() {
    var q = $("#rq").value.toLowerCase().trim();
    var host = $("#reports");
    host.innerHTML = "";
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
    host.appendChild(tbl);
  }

  /* ───────────────────────── agents ───────────────────────── */

  function renderAgents() {
    var ol = $("#agrules");
    ol.innerHTML = "";
    (window.AGENT_RULES || []).forEach(function (r) { ol.appendChild(el("li", null, r)); });

    var host = $("#agents");
    host.innerHTML = "";
    $("#tn-agents").textContent = (window.AGENTS || []).length;

    (window.AGENTS || []).forEach(function (a) {
      var n = el("div", "ag");
      var h = el("div", "ah");
      h.appendChild(el("div", "an", a.name));
      h.appendChild(el("span", stClass(a.status), a.status));
      n.appendChild(h);

      var axis = (window.AXES || []).filter(function (x) { return x.id === a.axis; })[0];
      n.appendChild(el("div", "ac", a.cadence + (axis ? "  ·  feeds " + axis.label.toLowerCase() : "")));

      function list(title, items, cls) {
        if (!items || !items.length) return;
        n.appendChild(el("h4", null, title));
        var ul = el("ul", cls || null);
        items.forEach(function (i) { ul.appendChild(el("li", null, i)); });
        n.appendChild(ul);
      }
      list("Sources", a.sources);
      list("What the report must contain", a.output);
      list("Watchlist it carries forward", a.watchlist);
      list("Blocked on", a.needs, "needs");

      var foot = el("div", "afoot");
      var cc = el("button", "btn solid", "Copy charter");
      cc.onclick = function () {
        copy(a.charter + "\n\nHouse rules:\n" + (window.AGENT_RULES || []).map(function (r, i) {
          return (i + 1) + ". " + r;
        }).join("\n"));
      };
      foot.appendChild(cc);
      var vc = el("button", "btn", "Read charter");
      vc.onclick = function () {
        openDrawer({
          kind: "agent charter", status: a.status, date: a.cadence, owner: "portal",
          title: a.name, dek: "Standing brief. " + a.cadence + ".",
          tags: (a.needs && a.needs.length ? ["blocked"] : []).concat([a.axis]),
          metrics: [],
          body: [["Charter, verbatim", a.charter]]
            .concat(a.watchlist ? [["Watchlist", a.watchlist.join("\n\n")]] : [])
            .concat([["House rules it inherits", (window.AGENT_RULES || []).map(function (r, i) {
              return (i + 1) + ". " + r;
            }).join("\n\n")]])
        });
      };
      foot.appendChild(vc);
      n.appendChild(foot);

      host.appendChild(n);
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
      return loadDay(STATE.date);
    }).then(function () {
      var h = (location.hash || "").replace("#", "");
      if (["board", "reports", "agents", "pad", "about"].indexOf(h) >= 0) showPage(h);
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
      $("#q").value = ""; $("#fkind").value = ""; $("#fstatus").value = ""; renderBoard();
    };
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
