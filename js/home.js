/* Home: sabores em destaque, galeria em movimento, seis planetas e faixa de informações */
(function () {
  "use strict";
  var P = window.Piporia, M = window.PIPORIA_MENU, E = window.PiporiaEstoque;
  var pipocas = M.itens.filter(function (i) { return i.categoria === "pipoca"; });

  function minPrice(it) {
    var ps = it.tamanhos.map(function (t) { return t.preco; }).filter(function (p) { return p != null; });
    return ps.length ? Math.min.apply(null, ps) : null;
  }

  /* Preço da etiqueta do balde: o menor preço do cardápio de pipocas */
  var tag = document.getElementById("hero-price");
  if (tag) {
    var menor = Math.min.apply(null, pipocas.map(minPrice).filter(function (p) { return p != null; }));
    tag.textContent = "a partir de " + P.brl(menor);
  }

  /* Atalhos da primeira faixa */
  var pick = document.getElementById("pick");
  if (pick) {
    pick.innerHTML = pipocas.slice(0, 3).map(function (it) {
      return '<a class="pick-card" href="cardapio.html?item=' + it.id + '">' +
        '<span class="pl">' + P.flavorIcon(it.id) + "</span>" +
        "<div><strong>" + P.esc(it.nome) + "</strong><span>" + P.esc(it.subtitulo) + "</span></div>" +
        P.icon("chev") + "</a>";
    }).join("") +
      '<a class="pick-card more" href="cardapio.html">Ver todos os sabores ' + P.icon("arrow") + "</a>";
  }

  /* Galeria: fotos reais da Pipória, da direita para a esquerda */
  var cards = [
    { img: "img/galeria-1.jpg", alt: "Pipoca gourmet com cobertura de Nutella", t: "Nutella", s: "Saturno", d: "Pipoca crocante com Nutella cremosa por cima.", href: "cardapio.html?item=saturno", ic: "planet" },
    { img: "img/galeria-2.jpg", alt: "Balde de pipoca coberto de chocolate ao leite", t: "Chocolate ao leite", s: "Pipocas Gourmet", d: "Balde cheio, com cobertura de chocolate ao leite.", href: "cardapio.html?cat=pipoca", ic: "bucket" },
    { img: "img/galeria-3.jpg", alt: "Pote de pipoca com creme e chocolate", t: "Creme e chocolate", s: "Pipocas Gourmet", d: "Camadas de creme e chocolate em cada pedaço.", href: "cardapio.html?cat=pipoca", ic: "star" },
    { img: "img/galeria-4.jpg", alt: "Açaí na garrafa Pipória", t: "Açaí na Garrafa", s: "Para levar", d: "Açaí cremoso na garrafa, em quatro sabores.", href: "cardapio.html?cat=acai", ic: "bottle" },
    { img: "img/galeria-5.jpg", alt: "Panqueca da Pipória", t: "Panqueca", s: "Frango ou carne", d: "Panqueca recheada, nos sabores frango e carne.", href: "cardapio.html?cat=panqueca", ic: "pancake" },
    { img: "img/galeria-6.jpg", alt: "Balde de pipoca Pipória com ninho e creme de avelã", t: "Ninho e avelã", s: "Pipocas Gourmet", d: "Creme de ninho e creme de avelã sobre a pipoca.", href: "cardapio.html?cat=pipoca", ic: "bucket" }
  ];
  var track = document.getElementById("marquee-track");
  if (track) {
    function set(hidden) {
      return cards.map(function (c) {
        return '<a class="g-card" href="' + c.href + '"' + (hidden ? ' aria-hidden="true" tabindex="-1"' : "") + ">" +
          '<img src="' + c.img + '" alt="' + (hidden ? "" : P.esc(c.alt)) + '" loading="lazy" draggable="false">' +
          '<div class="g-info"><span class="pb">' + P.icon(c.ic) + "</span>" +
          "<div><h3>" + P.esc(c.t) + "</h3><small>" + P.esc(c.s) + "</small></div>" +
          "<p>" + P.esc(c.d) + "</p>" +
          '<span class="more">Ver detalhes ' + P.icon("chev") + "</span></div></a>";
      }).join("");
    }
    /* A animação desloca -50% da faixa: ela precisa ser duas metades iguais. */
    track.innerHTML = set(false) + set(true) + set(true) + set(true);
  }

  /* Seis planetas */
  var fl = document.getElementById("flavors");
  function renderFlavors() {
    var curtas = {
      lua: "Doce, suave e cremoso.",
      jupiter: "Intenso e cheio de camadas de sabor.",
      netuno: "Cookies crocantes com creme suave.",
      marte: "Creme de avelã e chocolate.",
      plutao: "A crocância do Ovomaltine.",
      saturno: "Nutella cremosa e irresistível."
    };
    fl.innerHTML = pipocas.map(function (it) {
      var out = E.info(it).out;
      return '<a class="flavor' + (out ? " soldout" : "") + '" href="cardapio.html?item=' + it.id + '">' +
        '<div class="ph">' + (out ? '<span class="sold-tag">Esgotado</span>' : "") + (it.ilustrativa ? '<span class="ilus-tag">Imagem ilustrativa</span>' : "") + '<img src="' + it.imagem + '" alt="Pipoca gourmet sabor ' + P.esc(it.subtitulo) + '" loading="lazy"></div>' +
        '<span class="pb">' + P.flavorIcon(it.id) + "</span>" +
        '<div class="tx"><strong>' + P.esc(it.nome) + '</strong><span class="sub">' + P.esc(it.subtitulo) + "</span>" +
        '<span class="ds">' + P.esc(curtas[it.id] || "") + "</span>" +
        '<em class="pr">' + (out ? "Esgotado no momento" : minPrice(it) == null ? "Consultar valor" : "a partir de " + P.brl(minPrice(it))) + "</em></div></a>";
    }).join("");
  }
  if (fl) { renderFlavors(); E.onChange(renderFlavors); }

  /* Faixa de informações */
  var info = document.getElementById("info-grid");
  if (info) {
    var itens = [
      ["clock", P.HORARIO[0], P.HORARIO[1]],
      ["pin", "Localização", "Av. Solidariedade, 1230<br>Uberlândia - MG"],
      ["shield", "Pedido rápido", "Seu balde do seu jeito,<br>sem complicação."],
      ["heart", "Qualidade", "Milho mushroom importado,<br>selecionado um a um."]
    ];
    info.innerHTML = itens.map(function (i) {
      return '<div class="info-item"><span class="ic">' + P.icon(i[0]) + "</span><div><strong>" + P.esc(i[1]) + "</strong><span>" + i[2] + "</span></div></div>";
    }).join("");
  }
})();
