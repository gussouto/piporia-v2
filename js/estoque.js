/* ==========================================================
   ESTOQUE: marca produtos como "Esgotado" lendo uma planilha.
   A Pipória edita a planilha (Google Planilhas publicada como CSV)
   e o site se atualiza sozinho em poucos minutos.
   Veja docs/ESGOTADO.md. O endereço fica em menu-data.js (estoqueUrl).
   Sem endereço configurado, nada muda: tudo aparece disponível.
   ========================================================== */
(function () {
  "use strict";
  var M = window.PIPORIA_MENU || {};
  var URL_ = String(M.estoqueUrl || "").replace(/^\s+|\s+$/g, "");
  var KEY = "piporia_estoque_v1";
  var MAX_AGE = 6 * 3600 * 1000;   /* a última lista guardada vale por 6 h */
  var TIMEOUT = 6000;              /* tempo máximo de espera pela planilha */
  var rows = [], listeners = [], lastSig = "[]", lastFetch = 0;

  function norm(s) {
    s = String(s == null ? "" : s);
    if (s.normalize) s = s.normalize("NFD").replace(/[̀-ͯ]/g, "");
    return s.toLowerCase().replace(/\s+/g, "");
  }
  function yes(v) { return ["sim", "s", "true", "verdadeiro", "1", "x", "yes", "esgotado"].indexOf(norm(v)) > -1; }
  function trim(s) { return String(s == null ? "" : s).replace(/^\s+|\s+$/g, ""); }

  /* CSV com aspas, vírgulas e quebras de linha dentro das células */
  function parseCSV(t) {
    t = String(t).replace(/^﻿/, "");
    var out = [], row = [], f = "", q = false, c;
    for (var i = 0; i < t.length; i++) {
      c = t.charAt(i);
      if (q) {
        if (c === '"') { if (t.charAt(i + 1) === '"') { f += '"'; i++; } else q = false; }
        else f += c;
      } else if (c === '"') q = true;
      else if (c === ",") { row.push(f); f = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && t.charAt(i + 1) === "\n") i++;
        row.push(f); f = ""; out.push(row); row = [];
      } else f += c;
    }
    if (f !== "" || row.length) { row.push(f); out.push(row); }
    return out;
  }

  /* Converte a tabela em regras. Devolve null se não parecer a planilha certa. */
  function toRows(table) {
    if (!table.length) return null;
    var head = table[0].map(norm);
    function col(name) {
      for (var i = 0; i < head.length; i++) if (head[i].indexOf(name) === 0) return i;
      return -1;
    }
    var ci = { id: col("id"), tam: col("tamanho"), out: col("esgotado"), aviso: col("aviso") };
    if (ci.id < 0 || ci.out < 0) return null;
    var res = [];
    table.slice(1).forEach(function (r) {
      if (!trim(r[ci.id])) return;
      res.push({
        id: norm(r[ci.id]),
        tam: ci.tam > -1 ? norm(r[ci.tam]) : "",
        out: yes(r[ci.out]),
        aviso: ci.aviso > -1 ? trim(r[ci.aviso]) : ""
      });
    });
    return res;
  }

  function find(id, tam) {
    for (var i = rows.length - 1; i >= 0; i--) if (rows[i].id === id && rows[i].tam === tam) return rows[i];
    return null;
  }

  /* Situação de um item do cardápio: { out, aviso, sizes: [{ out, aviso }] } */
  function info(it) {
    var id = norm(it.id);
    var whole = find(id, "");
    var sizes = it.tamanhos.map(function (t) {
      var pl = t.planilha, r;
      if (pl) {
        /* a opção tem linha própria na planilha (ex.: um sabor de açaí) */
        var sid = norm(pl.id || it.id);
        r = find(sid, norm(pl.tamanho != null ? pl.tamanho : t.nome)) || find(sid, "");
      } else {
        r = find(id, norm(t.nome));
      }
      var out = !!(whole && whole.out) || !!(r && r.out);
      var aviso = (r && r.out && r.aviso) || (whole && whole.out && whole.aviso) || "";
      return { out: out, aviso: aviso };
    });
    var all = sizes.length > 0 && sizes.every(function (s) { return s.out; });
    var aviso = (whole && whole.out && whole.aviso) || "";
    if (!aviso) sizes.forEach(function (z) { if (!aviso && z.out && z.aviso) aviso = z.aviso; });
    return { out: all, aviso: aviso, sizes: sizes };
  }

  /* Este tamanho (pelo nome) está esgotado? */
  function sizeOut(it, sizeName) {
    var inf = info(it);
    for (var i = 0; i < it.tamanhos.length; i++) {
      if (norm(it.tamanhos[i].nome) === norm(sizeName)) return inf.sizes[i].out;
    }
    return inf.out;
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), rows: rows })); } catch (e) {}
  }
  function loadCache() {
    try {
      var d = JSON.parse(localStorage.getItem(KEY) || "null");
      if (d && d.rows && Date.now() - d.t < MAX_AGE) { rows = d.rows; lastSig = JSON.stringify(rows); }
    } catch (e) {}
  }
  function apply(next) {
    var sig = JSON.stringify(next);
    var changed = sig !== lastSig;
    rows = next; lastSig = sig; save();
    if (changed) listeners.forEach(function (fn) { try { fn(); } catch (e) {} });
  }

  function refresh() {
    if (!URL_) return Promise.resolve(false);
    lastFetch = Date.now();
    var ctl = window.AbortController ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, TIMEOUT) : null;
    return fetch(URL_, { cache: "no-store", signal: ctl ? ctl.signal : undefined })
      .then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.text(); })
      .then(function (txt) {
        var rs = toRows(parseCSV(txt));
        if (!rs) throw new Error("formato");
        apply(rs);
        return true;
      })
      .catch(function () { return false; })   /* falhou: mantém o que já tinha, tudo segue disponível */
      .then(function (ok) { if (timer) clearTimeout(timer); return ok; });
  }

  loadCache();
  var E = window.PiporiaEstoque = {
    enabled: !!URL_,
    info: info,
    sizeOut: sizeOut,
    refresh: refresh,
    onChange: function (fn) { listeners.push(fn); },
    ready: refresh()
  };

  /* Ao voltar para a aba depois de um tempo, confere de novo */
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && E.enabled && Date.now() - lastFetch > 120000) refresh();
  });
})();
