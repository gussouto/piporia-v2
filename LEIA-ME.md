# Pipória v2 — site (HTML, CSS e JavaScript)

Redesenho do site seguindo os modelos enviados. Abra `index.html` no navegador
ou publique a pasta inteira (Cloudflare Pages, Vercel etc.). Não precisa de build.

## Páginas
- `index.html` Home · `cardapio.html` · `pedido.html` · `sobre.html`

## Onde mudar as coisas
- **Cardápio** (itens, preços, fotos): `js/menu-data.js`. Onde está `preco: null` (açaí e
  por enquanto) o site mostra "Consultar valor"; troque pelo valor e o item vai
  para o carrinho. No Saturno, `somente` guarda o preço de "só Saturno".
- **Esgotado**: planilha do Google, veja `docs/ESGOTADO.md`.
- **Telefone, Instagram, endereço e texto de horário**: topo de `js/app.js`
  (`WA_NUMBER`, `INSTAGRAM`, `ADDRESS`, `HORARIO`).
- **Cores e fontes**: variáveis no início de `css/style.css`
  (tema claro em `:root`, escuro em `:root[data-theme="dark"]`).

## Pontos para revisar antes de publicar
1. As fotos dos 6 sabores, do balde da Home, do "Por que Pipória" e dos banners
   foram recortadas dos modelos (imagens de baixa resolução). Troque por fotos
   reais em `img/` e `img/sabores/` mantendo os mesmos nomes.
2. O horário de funcionamento **não** foi publicado (o modelo diz 17h às 23h, mas
   não foi confirmado). Edite `HORARIO` em `js/app.js` quando tiver a informação.
3. As etiquetas "Mais pedido" do modelo não foram incluídas, por não haver dado real.
4. Preços e descrições seguem o cardápio enviado pelo cliente em 23/10 (clássicos R$ 29/43,
   Saturno R$ 33/48 e só Saturno R$ 37/50, panqueca R$ 14). Açaí sem valor informado.
   O Urano saiu do cardápio (confirmado pelo cliente).
5. As fontes (Google Fonts) precisam de internet no navegador de quem visita.
