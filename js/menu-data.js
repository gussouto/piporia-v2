/* ==========================================================
   CARDÁPIO DA PIPÓRIA
   Para adicionar um item, copie um bloco de "itens" e edite.
   Para adicionar uma categoria, inclua em "categorias".

   Campos de cada item:
   - id          identificador único, sem espaços ou acentos
   - categoria   "pipoca", "seca-saborizada", "acai" ou "panqueca" (ou uma nova)
   - nome        nome exibido
   - subtitulo   linha pequena acima da descrição (opcional)
   - descricao   texto do detalhe
   - tamanhos    lista de { nome, preco }. Use preco: null para
                 "consultar valor" (o cliente é levado ao WhatsApp)
   - imagem      caminho da foto (opcional). Sem foto, o site
                 mostra o ícone de planeta
   - cor / cor2  (reservado, não usado no visual v2)
   - combinavel  true = permite escolher um segundo recheio
   - ilustrativa true = mostra "Imagem ilustrativa" sobre a foto (tire quando
                 a foto for a real do produto)
   - opcao       rótulo da escolha em "tamanhos" (padrão "Tamanho"; use
                 "Sabor" quando as opções forem sabores)
   - planilha    (opcional, dentro de cada opção de "tamanhos") como a opção
                 aparece na planilha de estoque: { id, tamanho }. Sem isso,
                 vale o id do item e o nome da opção (ex.: lua + 500 ml)
   - somente     preço quando o balde leva só este sabor, por tamanho.
                 Ex.: { "500 ml": 37, "1 L": 50 } (usado no Saturno)

   ESGOTADO: a Pipória marca numa planilha (veja docs/ESGOTADO.md).
   Cole o endereço da planilha publicada em "estoqueUrl" logo abaixo.
   Vazio = o recurso fica desligado e tudo aparece disponível.
   ========================================================== */

window.PIPORIA_MENU = {
  estoqueUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTeidNwewtPUaFqropCS7dTjZK7k4zv4aFckEaHrL2XfSyg2AI4fVg_ane9LO7FaNYHmNxCjZbf7fRI/pub?gid=0&single=true&output=csv",

  categorias: [
    {
      id: "pipoca",
      nome: "Pipocas Gourmet",
      nota: "Clássicos. Você pode escolher até dois recheios por pipoca."
    },
    {
      id: "seca-saborizada",
      nome: "Seca Saborizada",
      nota: "Crocante e fresquinha para provar."
    },
    {
      id: "acai",
      nome: "Açaí na Garrafa",
      nota: "Para levar e tomar onde quiser."
    },
    {
      id: "panqueca",
      nome: "Panqueca",
      nota: ""
    }
  ],

  itens: [
    /* ---------------- PIPOCAS ---------------- */
    {
      id: "lua", ilustrativa: true, categoria: "pipoca", nome: "Lua", subtitulo: "Leitinho",
      imagem: "img/sabores/lua-v3.jpg",
      descricao: "Doce, suave e cremoso como a luz da lua.",
      tamanhos: [{ nome: "500 ml", preco: 29 }, { nome: "1 L", preco: 43 }],
      cor: "#e7c98b", cor2: "#fff3d1", combinavel: true
    },
    {
      id: "jupiter", ilustrativa: true, categoria: "pipoca", nome: "Júpiter", subtitulo: "Creme de avelã",
      imagem: "img/sabores/jupiter-v3.jpg",
      descricao: "Intenso, envolvente e cheio de camadas de sabor.",
      tamanhos: [{ nome: "500 ml", preco: 29 }, { nome: "1 L", preco: 43 }],
      cor: "#7a4a2a", cor2: "#c58a55", combinavel: true
    },
    {
      id: "netuno", ilustrativa: true, categoria: "pipoca", nome: "Netuno", subtitulo: "Cookies & Cream",
      imagem: "img/sabores/netuno-v3.jpg",
      descricao: "A crocância dos cookies encontrando a suavidade do creme. Uma combinação que conquista qualquer galáxia.",
      tamanhos: [{ nome: "500 ml", preco: 29 }, { nome: "1 L", preco: 43 }],
      cor: "#d9d2c6", cor2: "#3a3430", combinavel: true
    },
    {
      id: "marte", ilustrativa: true, categoria: "pipoca", nome: "Marte", subtitulo: "Bueno",
      imagem: "img/sabores/marte-v3.jpg",
      descricao: "Anéis de sabor envolvendo uma explosão de creme de avelã e chocolate. Um clássico que conquista toda a galáxia.",
      tamanhos: [{ nome: "500 ml", preco: 29 }, { nome: "1 L", preco: 43 }],
      cor: "#b5832f", cor2: "#e6b560", combinavel: true
    },
    {
      id: "plutao", ilustrativa: true, categoria: "pipoca", nome: "Plutão", subtitulo: "Ovomaltine",
      imagem: "img/sabores/plutao-v3.jpg",
      descricao: "A crocância inconfundível do Ovomaltine que transforma cada mordida em pura nostalgia e prazer.",
      tamanhos: [{ nome: "500 ml", preco: 29 }, { nome: "1 L", preco: 43 }],
      cor: "#6b4226", cor2: "#b07a45", combinavel: true
    },
    {
      id: "saturno", ilustrativa: true, categoria: "pipoca", nome: "Saturno", subtitulo: "Nutella",
      imagem: "img/sabores/saturno-v3.jpg",
      descricao: "O inconfundível sabor da Nutella, cremoso e irresistível, para os verdadeiros amantes de chocolate.",
      tamanhos: [{ nome: "500 ml", preco: 33 }, { nome: "1 L", preco: 48 }],
      somente: { "500 ml": 37, "1 L": 50 },
      cor: "#5a3520", cor2: "#9a6a42", combinavel: true
    },

    /* ---------------- SECA SABORIZADA ---------------- */
    {
      id: "seca-chocolate", categoria: "seca-saborizada", nome: "Chocolate",
      subtitulo: "Pipoca seca",
      descricao: "Pipoca seca coberta de chocolate, crocante e fresquinha, em pacote.",
      tamanhos: [{ nome: "Pacote", preco: 15 }],
      imagem: "img/seca-chocolate.jpg"
    },

    {
      id: "seca-ninho", categoria: "seca-saborizada", nome: "Ninho",
      subtitulo: "Pipoca seca",
      descricao: "Pipoca seca coberta de leite ninho, crocante e fresquinha, em pacote.",
      tamanhos: [{ nome: "Pacote", preco: 15 }],
      imagem: "img/seca-ninho.jpg"
    },

    {
      id: "seca-maracuja", categoria: "seca-saborizada", nome: "Maracujá",
      subtitulo: "Pipoca seca",
      descricao: "Pipoca seca coberta de maracujá, crocante e fresquinha, em pacote.",
      tamanhos: [{ nome: "Pacote", preco: 15 }],
      imagem: "img/seca-maracuja.jpg"
    },

    {
      id: "seca-limao", categoria: "seca-saborizada", nome: "Limão",
      subtitulo: "Pipoca seca",
      descricao: "Pipoca seca coberta de limão, crocante e fresquinha, em pacote.",
      tamanhos: [{ nome: "Pacote", preco: 15 }],
      imagem: "img/seca-limao.jpg"
    },

    /* ---------------- AÇAÍ NA GARRAFA ----------------
       R$ 25,00 em todos os sabores. */
    {
      id: "acai-garrafa", categoria: "acai", nome: "Açaí na Garrafa",
      subtitulo: "Para levar", opcao: "Sabor",
      descricao: "Açaí cremoso servido na garrafa, pronto para levar e tomar onde quiser. Quatro sabores: morango com avelã, ninho com avelã, maracujá e avelã.",
      tamanhos: [
        { nome: "Morango com avelã", preco: 25, planilha: { id: "acai-morango", tamanho: "Garrafa" } },
        { nome: "Ninho com avelã", preco: 25, planilha: { id: "acai-ninho", tamanho: "Garrafa" } },
        { nome: "Maracujá", preco: 25, planilha: { id: "acai-maracuja", tamanho: "Garrafa" } },
        { nome: "Avelã", preco: 25, planilha: { id: "acai-avela", tamanho: "Garrafa" } }
      ],
      imagem: "img/acai-garrafa-v3.jpg"
    },

    /* ---------------- PANQUECA ---------------- */
    {
      id: "panqueca", categoria: "panqueca", nome: "Panqueca",
      subtitulo: "Frango ou carne", opcao: "Sabor",
      descricao: "Panqueca recheada, nos sabores frango e carne. Escolha o seu.",
      tamanhos: [
        { nome: "Frango", preco: 14, planilha: { id: "panqueca-frango", tamanho: "Unidade" } },
        { nome: "Carne", preco: 14, planilha: { id: "panqueca-carne", tamanho: "Unidade" } }
      ],
      imagem: "img/galeria-5.jpg"
    }
  ]
};
