/* Cardápio: filtros, detalhes do item e adicionar ao carrinho */
(function () {
  "use strict";
  var M = window.PIPORIA_MENU, P = window.Piporia, E = window.PiporiaEstoque;
  var root = document.getElementById("menu-root");
  var chips = document.getElementById("filters");
  var dlg = document.getElementById("item-modal");
  var params = new URLSearchParams(location.search);
  var current = params.get("cat") || "todos";

  function byId(id) { return M.itens.filter(function (i) { return i.id === id; })[0]; }
  function minPrice(it) {
    var ps = it.tamanhos.map(function (t) { return t.preco; }).filter(function (p) { return p != null; });
    return ps.length ? Math.min.apply(null, ps) : null;
  }

  /* ---------- Filtros ---------- */
  function renderChips() {
    var list = [{ id: "todos", nome: "Tudo" }].concat(M.categorias);
    var ic = { pipoca: "bucket", acai: "bottle", panqueca: "pancake" };
    chips.innerHTML = list.map(function (c) {
      return '<button type="button" class="chip" data-cat="' + c.id + '" aria-pressed="' + (c.id === current) + '">' +
        (ic[c.id] ? P.icon(ic[c.id]) : "") + P.esc(c.nome) + "</button>";
    }).join("");
  }
  chips.addEventListener("click", function (e) {
    var b = e.target.closest(".chip");
    if (!b) return;
    current = b.getAttribute("data-cat");
    var url = current === "todos" ? location.pathname : location.pathname + "?cat=" + current;
    history.replaceState(null, "", url);
    renderChips();
    renderMenu();
  });

  /* ---------- Cards ---------- */
  function cardHTML(it) {
    var out = E.info(it).out;
    var media = it.imagem
      ? '<img src="' + it.imagem + '" alt="' + P.esc(it.nome) + (it.subtitulo ? ", " + P.esc(it.subtitulo) : "") + '" loading="lazy">'
      : '<div class="m-ph">' + P.icon("planet") + "</div>";
    var min = minPrice(it);
    var price = min == null
      ? '<div class="m-price"><small>Valor</small><strong>Consultar</strong></div>'
      : '<div class="m-price">' + (it.tamanhos.length > 1 ? "<small>a partir de</small>" : "") + "<strong>" + P.brl(min) + "</strong></div>";
    var sizes = it.tamanhos.length > 1
      ? '<div class="m-sizes">' + it.tamanhos.map(function (t) { return "<span><b>" + P.esc(t.nome) + "</b> " + (t.preco == null ? "" : P.brl(t.preco)) + "</span>"; }).join("") + "</div>"
      : "";
    return '<div class="m-card' + (out ? ' soldout' : '') + '" role="button" tabindex="0" data-id="' + it.id + '" aria-label="' + P.esc(it.nome) + ': ver detalhes e adicionar">' +
      '<div class="m-media">' + (out ? '<span class="sold-tag">Esgotado</span>' : "") + media + "</div>" +
      '<div class="m-body"><h3>' + P.esc(it.nome) + "</h3>" +
      (it.subtitulo ? '<div class="m-sub">' + P.esc(it.subtitulo) + "</div>" : "") +
      '<p class="m-desc">' + P.esc(it.descricao) + "</p>" + sizes +
      '<div class="m-foot">' + price + '<span class="m-add' + (out ? ' is-off' : '') + '">' + (out ? "Esgotado" : P.icon("plus") + (min == null ? "Perguntar" : "Adicionar")) + "</span></div></div></div>";
  }
  var BANNER = {
    todos: ["Nosso cardápio", "Pipocas, açaí e panqueca. Escolha o seu favorito.", "Nosso <em>cardápio</em>"],
    pipoca: ["Nosso cardápio", "Milho mushroom importado, caramelizado e servido no balde. Escolha o seu favorito.", "Pipocas <em>Gourmet</em>"],
    acai: ["Nosso cardápio", "Para levar e tomar onde quiser. Chame a gente para saber os sabores.", "Açaí na <em>Garrafa</em>"],
    panqueca: ["Nosso cardápio", "Panqueca com calda, feita para adoçar o seu dia.", "<em>Panqueca</em>"]
  };
  function renderBanner() {
    var b = BANNER[current] || BANNER.todos;
    var h = document.getElementById("banner-title"), p = document.getElementById("banner-text");
    if (h) h.innerHTML = b[2];
    if (p) p.textContent = b[1];
  }
  function renderMenu() {
    renderBanner();
    var cats = M.categorias.filter(function (c) { return current === "todos" || c.id === current; });
    root.innerHTML = cats.map(function (c) {
      var itens = M.itens.filter(function (i) { return i.categoria === c.id; });
      if (!itens.length) return "";
      return '<section class="cat-block" aria-labelledby="cat-' + c.id + '">' +
        '<div class="cat-head"><h2 class="cat-title" id="cat-' + c.id + '">' + P.esc(c.nome) + "</h2>" +
        (c.nota ? '<p class="cat-note">' + P.esc(c.nota) + "</p>" : "") + "</div>" +
        '<div class="menu-grid">' + itens.map(cardHTML).join("") + "</div></section>";
    }).join("");
  }
  root.addEventListener("click", function (e) {
    var c = e.target.closest(".m-card");
    if (c) openItem(byId(c.getAttribute("data-id")));
  });

  root.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var c = e.target.closest(".m-card");
    if (!c) return;
    e.preventDefault();
    openItem(byId(c.getAttribute("data-id")));
  });

  /* ---------- Detalhe do item ---------- */
  function openItem(it) {
    if (!it) return;
    var inf = E.info(it);
    var first = 0;
    for (var k = 0; k < inf.sizes.length; k++) { if (!inf.sizes[k].out) { first = k; break; } }
    var st = { size: first, second: "", qty: 1 };
    var priced = it.tamanhos.some(function (t) { return t.preco != null; });
    var others = it.combinavel ? M.itens.filter(function (o) { return o.combinavel && o.id !== it.id; }) : [];
    var media = it.imagem
      ? '<img src="' + it.imagem + '" alt="' + P.esc(it.nome) + '">'
      : '<div class="m-ph">' + P.icon("planet") + "</div>";

    var sizes = it.tamanhos.map(function (t, i) {
      var so = inf.sizes[i].out;
      return '<label class="opt' + (so ? " is-off" : "") + '"><input type="radio" name="size" value="' + i + '"' + (i === first && !inf.out ? " checked" : "") + (so ? " disabled" : "") + ">" +
        "<span>" + P.esc(t.nome) + "<small>" + (so ? "Esgotado" : t.preco == null ? "Consultar valor" : P.brl(t.preco)) + "</small></span></label>";
    }).join("");

    var secondField = others.length && !inf.out
      ? '<div class="field"><label for="second">Segundo recheio (opcional)</label>' +
        '<select id="second"></select></div>'
      : "";

    /* Aviso do que está esgotado (e a mensagem que a Pipória escreveu) */
    var avisos = [];
    if (inf.out) avisos.push(inf.aviso || "Esgotado no momento.");
    else inf.sizes.forEach(function (s, i) { if (s.out) avisos.push(it.tamanhos[i].nome + " esgotado" + (s.aviso ? ": " + s.aviso : ".")); });
    var soldNote = avisos.length ? '<div class="sold-note" role="status">' + avisos.map(P.esc).join("<br>") + "</div>" : "";

    var foot = inf.out
      ? soldNote + '<button type="button" class="btn btn-primary btn-block" disabled>Esgotado no momento</button>' +
        '<a class="link-btn sold-ask" target="_blank" rel="noopener" href="' +
        P.waLink("Olá! Vim pelo site da Pipória e queria saber quando " + it.nome + " volta a ficar disponível.") +
        '">Perguntar quando volta, no WhatsApp</a>'
      : soldNote + (priced
      ? '<div class="modal-foot"><div class="total" id="m-total"></div>' +
        '<div class="qty" role="group" aria-label="Quantidade"><button type="button" id="q-minus" aria-label="Diminuir">−</button><output id="q-out">1</output><button type="button" id="q-plus" aria-label="Aumentar">+</button></div></div>' +
        '<button type="button" class="btn btn-primary btn-block" id="m-add">Adicionar ao carrinho</button>'
      : '<a class="btn btn-primary btn-block" target="_blank" rel="noopener" href="' +
        P.waLink("Olá! Vim pelo site da Pipória e queria saber valores e opções de: " + it.nome + ".") +
        '">Perguntar o valor no WhatsApp</a>');

    dlg.innerHTML =
      '<div class="modal-grid"><div class="modal-media">' + media + "</div>" +
      '<div class="modal-body"><button type="button" class="modal-close" aria-label="Fechar">×</button>' +
      "<h3>" + P.esc(it.nome) + "</h3>" +
      (it.subtitulo ? '<div class="m-sub">' + P.esc(it.subtitulo) + "</div>" : "") +
      '<p class="m-desc">' + P.esc(it.descricao) + "</p>" +
      '<div class="field"><span class="legend">Tamanho</span><div class="opts">' + sizes + "</div></div>" +
      secondField + foot + "</div></div>";

    function unit() {
      var base = it.tamanhos[st.size].preco;
      if (base == null) return null;
      var other = st.second ? byId(st.second) : null;
      if (other) {
        var match = other.tamanhos.filter(function (t) { return t.nome === it.tamanhos[st.size].nome; })[0];
        if (match && match.preco != null) base = Math.max(base, match.preco);
      }
      return base;
    }
    function refresh() {
      var u = unit();
      var t = dlg.querySelector("#m-total");
      if (t && u != null) t.textContent = P.brl(u * st.qty);
      var q = dlg.querySelector("#q-out");
      if (q) q.textContent = st.qty;
    }

    dlg.querySelectorAll('input[name="size"]').forEach(function (r) {
      r.addEventListener("change", function () { st.size = +r.value; fillSecond(); refresh(); });
    });
    var sec = dlg.querySelector("#second");
    /* Recheios esgotados (no tamanho escolhido) ficam desativados na lista */
    function fillSecond() {
      if (!sec) return;
      var sn = it.tamanhos[st.size].nome;
      if (st.second && E.sizeOut(byId(st.second), sn)) st.second = "";
      sec.innerHTML = '<option value="">Só o ' + P.esc(it.nome) + "</option>" +
        others.map(function (o) {
          var off = E.sizeOut(o, sn);
          return '<option value="' + o.id + '"' + (off ? " disabled" : "") + (o.id === st.second ? " selected" : "") + ">" +
            P.esc(o.nome) + " — " + P.esc(o.subtitulo || "") + (off ? " (esgotado)" : "") + "</option>";
        }).join("");
    }
    fillSecond();
    if (sec) sec.addEventListener("change", function () { st.second = sec.value; refresh(); });
    var minus = dlg.querySelector("#q-minus"), plus = dlg.querySelector("#q-plus");
    if (minus) minus.addEventListener("click", function () { st.qty = Math.max(1, st.qty - 1); refresh(); });
    if (plus) plus.addEventListener("click", function () { st.qty = Math.min(50, st.qty + 1); refresh(); });
    dlg.querySelector(".modal-close").addEventListener("click", function () { dlg.close(); });

    var add = dlg.querySelector("#m-add");
    if (add) add.addEventListener("click", function () {
      if (E.sizeOut(it, it.tamanhos[st.size].nome)) return;
      var other = st.second ? byId(st.second) : null;
      var size = it.tamanhos[st.size].nome;
      var nome = it.nome + (other ? " + " + other.nome : "");
      var recheio = it.subtitulo ? it.subtitulo + (other && other.subtitulo ? " + " + other.subtitulo : "") : "";
      P.cart.add({
        key: it.id + "|" + size + "|" + (st.second || ""),
        nome: nome,
        detalhe: size + (recheio ? " · " + recheio : ""),
        preco: unit(),
        img: it.imagem || "",
        qtd: st.qty
      });
      dlg.close();
      P.toast(st.qty + "x " + nome + " no carrinho.", "pedido.html", "Ver carrinho");
    });

    refresh();
    if (!dlg.open) dlg.showModal();
  }

  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });

  renderChips();
  renderMenu();
  E.onChange(renderMenu);
  var deep = params.get("item");
  if (deep && byId(deep)) openItem(byId(deep));
})();
