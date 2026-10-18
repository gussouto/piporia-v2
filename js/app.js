/* ==========================================================
   Pipória — ícones, cabeçalho, rodapé, tema, carrinho e WhatsApp
   ========================================================== */
(function () {
  "use strict";

  /* ----- Dados de contato. Para trocar, edite só aqui. ----- */
  var WA_NUMBER = "5534984475322";
  var INSTAGRAM = "https://www.instagram.com/piporia.gourmet";
  var ADDRESS = "Av. Solidariedade, 1230, Uberlândia - MG";
  /* Texto do item "Atendimento" na Home. Quando o horário for confirmado,
     troque por algo como "Todos os dias, das 17h às 23h". */
  var HORARIO = ["Atendimento", "Chame no WhatsApp para confirmar o horário."];

  var CART_KEY = "piporia_cart_v1";
  var THEME_KEY = "piporia_theme";

  function brl(n) {
    return Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function waLink(text) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
  }

  /* ---------- Ícones (traço de 24x24) ---------- */
  var S = {
    arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    chev: '<path d="M9 5l7 7-7 7"/>',
    chevd: '<path d="M5 9l7 7 7-7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    bag: '<path d="M5 8h14l-1.2 12.5H6.200z"/><path d="M9 8V6.500a3 3 0 0 1 6 0V8"/><path d="M9.500 13c.7.8 1.500 1.200 2.500 1.200s1.800-.4 2.500-1.200"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.500l3.500 2"/>',
    star: '<path d="M12 3l2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100-4.400-4.300 6.100-.9z"/>',
    corn: '<path d="M12 21.500c-3.800-2.800-5.800-6.600-5-11.300.7-3.200 2.700-5.700 5-7 2.300 1.300 4.300 3.800 5 7 .8 4.700-1.200 8.500-5 11.300z"/><path d="M12 6v14M8.500 11.500c2 0 3.500 1.100 3.500 3.200M15.500 11.500c-2 0-3.500 1.100-3.500 3.200M9.200 8c1.200.4 2.200 1.200 2.800 2.500M14.800 8c-1.200.4-2.200 1.200-2.800 2.500"/>',
    heart: '<path d="M12 20.500S3.500 15.300 3.500 9.200A4.700 4.700 0 0 1 12 6.700a4.700 4.700 0 0 1 8.500 2.500c0 6.100-8.500 11.300-8.500 11.300z"/>',
    flavors: '<rect x="3.500" y="8" width="12" height="12" rx="2.500"/><path d="M8.500 8V6a2.500 2.500 0 0 1 2.500-2.500h7A2.500 2.500 0 0 1 20.500 6v7a2.500 2.500 0 0 1-2.500 2.500h-2.500"/><path d="M9.500 12.500l.8 1.700 1.700.8-1.700.8-.8 1.700-.8-1.700-1.700-.8 1.700-.8z"/>',
    shield: '<path d="M12 3l8 3v6c0 4.800-3.400 8-8 9.200C7.400 20 4 16.800 4 12V6z"/><path d="M8.500 12l2.500 2.500 4.500-5"/>',
    user: '<circle cx="12" cy="8.500" r="4"/><path d="M4.500 21c0-4 3.400-6 7.500-6s7.500 2 7.500 6"/>',
    trash: '<path d="M4 7h16M9.500 7V4h5v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
    pin: '<path d="M12 21.500s7-6.200 7-12a7 7 0 0 0-14 0c0 5.800 7 12 7 12z"/><circle cx="12" cy="9.500" r="2.500"/>',
    scooter: '<circle cx="5.500" cy="17" r="3"/><circle cx="18.500" cy="17" r="3"/><path d="M8.500 17H14l-2.200-9H9M15.500 8.500H18l.5 5M5.500 14l-.8-4h3.800"/>',
    truck: '<path d="M2.500 6.500h11.500v10H2.500zM14 10h4.200l3.300 3.200v3.300H14"/><circle cx="7" cy="17.500" r="2"/><circle cx="17.500" cy="17.500" r="2"/>',
    map: '<path d="M3 6.500l6-2.300 6 2.300 6-2.300v13.300l-6 2.300-6-2.300-6 2.300z"/><path d="M9 4.200v13.300M15 6.500v13.300"/>',
    planet: '<circle cx="12" cy="12" r="5.200"/><ellipse cx="12" cy="12" rx="10.500" ry="3.700" transform="rotate(-22 12 12)"/>',
    jup: '<circle cx="12" cy="12" r="6.500"/><path d="M5.800 9.500h12.400M5.500 12h13M6 14.500h12M8 7.200h8M8.500 16.800h7"/>',
    compass: '<path d="M12 1.500l2.200 8.300 8.300 2.200-8.300 2.200L12 22.500l-2.200-8.300L1.500 12l8.300-2.200z" fill="currentColor"/>',
    instagram: '<rect x="3.500" y="3.500" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.200" cy="6.800" r=".9" fill="currentColor"/>',
    bucket: '<path d="M5.800 10.500h12.400l-1.500 11H7.300z"/><path d="M7.500 10.500c-2 0-3-1.700-2.400-3.200.6-1.500 2.400-1.800 3.400-.9.600-2 3.800-2.600 4.800-.4 1.400-1 3.500 0 3.400 1.800-.1 1.200-.9 2.700-2.700 2.700"/>',
    bottle: '<path d="M10 2.500h4V5l1.600 3.200V21a1 1 0 0 1-1 1H9.400a1 1 0 0 1-1-1V8.200L10 5z"/><path d="M8.400 12.500h7.200M8.400 17h7.200"/>',
    pancake: '<ellipse cx="12" cy="6.500" rx="8" ry="3"/><path d="M4 6.500v4c0 1.700 3.600 3 8 3s8-1.300 8-3v-4M4 10.500v4c0 1.700 3.600 3 8 3s8-1.300 8-3v-4M4 14.500v3c0 1.700 3.600 3 8 3s8-1.300 8-3v-3"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.500v2.200M12 19.300v2.200M4.900 4.900l1.500 1.500M17.600 17.600l1.500 1.500M2.500 12h2.200M19.300 12h2.200M4.900 19.100l1.500-1.500M17.600 6.400l1.500-1.500"/>',
    moon: '<path d="M20 14.500A8 8 0 0 1 9.500 4 8 8 0 1 0 20 14.500z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>'
  };
  var WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413";

  function icon(name, cls) {
    if (name === "wa") {
      return '<svg class="ico solid ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' + WA_PATH + '"/></svg>';
    }
    return '<svg class="ico stroke ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true">' + (S[name] || "") + "</svg>";
  }
  function flavorIcon(id) {
    return icon({ jupiter: "jup", urano: "star" }[id] || "planet");
  }
  /* Substitui <span data-i="nome"></span> pelo ícone */
  function paintIcons(root) {
    (root || document).querySelectorAll("[data-i]").forEach(function (el) {
      el.outerHTML = icon(el.getAttribute("data-i"), el.getAttribute("class") || "");
    });
  }

  /* ---------- Tema ---------- */
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
    var b = document.querySelector(".theme-toggle");
    if (b) b.setAttribute("aria-label", t === "dark" ? "Mudar para o tema claro" : "Mudar para o tema escuro");
  }

  /* ---------- Carrinho ---------- */
  var cart = {
    get: function () {
      try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
    },
    save: function (list) {
      try { localStorage.setItem(CART_KEY, JSON.stringify(list)); } catch (e) {}
      window.dispatchEvent(new Event("cart:change"));
    },
    add: function (item) {
      var list = cart.get();
      var found = list.filter(function (i) { return i.key === item.key; })[0];
      if (found) found.qtd += item.qtd; else list.push(item);
      cart.save(list);
    },
    setQty: function (key, qtd) {
      var list = cart.get();
      list.forEach(function (i) { if (i.key === key) i.qtd = Math.max(1, qtd); });
      cart.save(list);
    },
    remove: function (key) { cart.save(cart.get().filter(function (i) { return i.key !== key; })); },
    clear: function () { cart.save([]); },
    count: function () { return cart.get().reduce(function (s, i) { return s + i.qtd; }, 0); },
    total: function () { return cart.get().reduce(function (s, i) { return s + i.qtd * i.preco; }, 0); }
  };

  function updateBadge() {
    var n = cart.count();
    document.querySelectorAll(".cart-count").forEach(function (el) {
      el.textContent = n;
      el.setAttribute("data-n", n);
    });
  }

  /* ---------- Aviso rápido ---------- */
  var toastTimer;
  function toast(msg, linkHref, linkText) {
    var el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.innerHTML = "<span>" + esc(msg) + "</span>" + (linkHref ? '<a href="' + linkHref + '">' + esc(linkText) + "</a>" : "");
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 4200);
  }

  /* ---------- Cabeçalho ---------- */
  function renderHeader() {
    var host = document.getElementById("site-header");
    if (!host) return;
    var page = document.body.getAttribute("data-page");
    function cur(p) { return page === p ? ' aria-current="page"' : ""; }
    host.outerHTML =
      '<header class="site-header"><div class="wrap hdr-in">' +
      '<a class="brand" href="index.html" aria-label="Pipória, página inicial">' +
      '<img class="brand-logo" src="img/logo.png" alt="" width="62" height="62" onerror="this.remove()">' +
      '<span class="brand-name">PIPÓRIA</span></a>' +
      '<nav class="nav" id="nav" aria-label="Principal">' +
      '<a href="index.html"' + cur("home") + ">Home</a>" +
      '<a href="sobre.html"' + cur("sobre") + ">Sobre</a>" +
      '<div class="has-sub"><a href="cardapio.html"' + cur("cardapio") + ">Cardápio " + icon("chevd") + "</a>" +
      '<div class="sub"><div class="sub-in">' +
      '<a href="cardapio.html?cat=pipoca">Pipocas Gourmet</a>' +
      '<a href="cardapio.html?cat=acai">Açaí na Garrafa</a>' +
      '<a href="cardapio.html?cat=panqueca">Panqueca</a>' +
      "</div></div></div>" +
      '<a href="pedido.html"' + cur("pedido") + '>Carrinho <span class="cart-count" data-n="0">0</span></a>' +
      "</nav>" +
      '<button class="icon-btn theme-toggle" type="button" aria-label="Mudar o tema">' +
      icon("sun", "i-sun") + icon("moon", "i-moon") + "</button>" +
      '<button class="icon-btn nav-toggle" type="button" aria-expanded="false" aria-controls="nav" aria-label="Abrir o menu">' + icon("menu") + "</button>" +
      "</div></header>";
  }

  /* ---------- Rodapé ---------- */
  function renderFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    host.outerHTML =
      '<footer class="site-footer"><div class="wrap">' +
      '<div class="foot-grid">' +
      '<div><div class="foot-brand"><img src="img/logo.png" alt="" width="96" height="96" onerror="this.remove()"><span>PIPÓRIA</span></div>' +
      "<p>Pipocas gourmet no balde. A sua nova paixão intergaláctica. Explosão de sabor, outro mundo.</p></div>" +
      '<div class="foot-col"><h4>' + icon("planet") + "Contato</h4><ul>" +
      '<li><a href="' + waLink("Olá! Vim pelo site da Pipória.") + '" target="_blank" rel="noopener">' + icon("wa") + "WhatsApp: (34) 98447-5322</a></li>" +
      '<li><a href="' + INSTAGRAM + '" target="_blank" rel="noopener">' + icon("instagram") + "Instagram: @piporia.gourmet</a></li>" +
      "<li><address>" + icon("pin") + "<span>Av. Solidariedade, 1230<br>Uberlândia - MG</span></address></li></ul></div>" +
      '<div class="foot-col nav-col"><h4>' + icon("compass") + "Navegação</h4><ul>" +
      '<li><a href="index.html">Home</a></li>' +
      '<li><a href="sobre.html">Sobre</a></li>' +
      '<li><a href="cardapio.html">Cardápio</a></li>' +
      '<li><a href="pedido.html">Carrinho</a></li></ul></div>' +
      "</div>" +
      '<div class="copy">© 2026 Pipória — Todos os direitos reservados.</div>' +
      '<i class="spark" style="--s:18px;right:3%;bottom:20%"></i><i class="spark" style="--s:12px;left:50%;bottom:12%"></i>' +
      "</div></footer>" +
      '<a class="wa-float" href="' + waLink("Olá! Vim pelo site da Pipória e gostaria de fazer um pedido.") +
      '" target="_blank" rel="noopener" aria-label="Falar com a Pipória no WhatsApp">' + icon("wa") + "</a>";
  }

  /* ---------- Eventos globais ---------- */
  function bind() {
    var tg = document.querySelector(".theme-toggle");
    if (tg) {
      setTheme(document.documentElement.getAttribute("data-theme") || "light");
      tg.addEventListener("click", function () {
        setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    }
    var nt = document.querySelector(".nav-toggle");
    var nav = document.getElementById("nav");
    if (nt && nav) {
      nt.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        nt.setAttribute("aria-expanded", open);
        nt.setAttribute("aria-label", open ? "Fechar o menu" : "Abrir o menu");
      });
    }
    window.addEventListener("cart:change", updateBadge);
    window.addEventListener("storage", updateBadge);
    updateBadge();
  }

  renderHeader();
  renderFooter();
  paintIcons();
  bind();

  window.Piporia = {
    WA_NUMBER: WA_NUMBER, ADDRESS: ADDRESS, INSTAGRAM: INSTAGRAM, HORARIO: HORARIO,
    brl: brl, esc: esc, waLink: waLink, icon: icon, flavorIcon: flavorIcon, paintIcons: paintIcons,
    cart: cart, toast: toast
  };
})();
