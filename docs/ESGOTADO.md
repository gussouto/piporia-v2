# Marcar produto como esgotado (planilha)

A Pipória marca o que acabou numa planilha do Google. O site lê a planilha
e mostra "Esgotado" sozinho, em poucos minutos. Não precisa mexer no código.

## Configurar uma vez (quem desenvolve)

1. Entre em [Google Planilhas](https://sheets.google.com) e crie uma planilha nova.
2. Menu **Arquivo > Importar > Fazer upload** e envie `docs/estoque-modelo.csv`.
   Escolha "Substituir planilha".
3. Selecione a coluna **esgotado**, de D2 até D19 (sem o título), e use **Inserir > Caixa de seleção**.
   Assim a Pipória só marca ou desmarca a caixinha.
4. **Arquivo > Compartilhar > Publicar na Web**. Em "Link", escolha a aba e o formato
   **Valores separados por vírgula (.csv)** e clique em **Publicar**.
5. Copie o endereço gerado (termina em `output=csv`).
6. Em `js/menu-data.js`, cole o endereço em `estoqueUrl: ""` e envie para o GitHub.
7. Compartilhe a planilha com a Pipória (**Compartilhar > Editor**), para ela poder editar.

## Uso diário (a Pipória)

- Marcou a caixa **esgotado** da linha do produto: ele aparece como **Esgotado** no site.
- Desmarcou: volta ao normal.
- Coluna **aviso** (opcional): texto que aparece para o cliente, por exemplo "Volta amanhã".
- As pipocas têm **uma linha por tamanho** (500 ml e 1 L). O açaí e a panqueca têm **uma linha
  por sabor** (por exemplo, "Açaí na Garrafa - Maracujá"). A seca saborizada tem **uma linha por sabor** ("Seca Saborizada - Chocolate"). Marque só a linha do que acabou. Se todos os tamanhos do produto estiverem marcados, o produto
  inteiro aparece como Esgotado.

A atualização leva alguns minutos (o Google guarda uma cópia da planilha por um tempo).

## Colunas

| coluna | o que é |
|---|---|
| id | identificador do produto, igual ao de `menu-data.js` (lua, jupiter, netuno, marte, plutao, saturno, acai-morango, acai-ninho, acai-maracuja, acai-avela, panqueca-frango, panqueca-carne, seca-chocolate). Não altere. |
| produto | só para a Pipória se achar. O site ignora. |
| tamanho | 500 ml e 1 L nas pipocas; Garrafa no açaí; Unidade na panqueca; Pacote na seca saborizada. Não altere. |
| esgotado | marcado (VERDADEIRO) ou desmarcado (FALSO). Também vale SIM/NAO. |
| aviso | opcional, mensagem para o cliente |

## O que o site faz

- Cardápio e início: etiqueta **Esgotado**, foto em cinza, botão desativado.
- Detalhe do item: aviso, botão "Esgotado no momento" e link para perguntar no WhatsApp.
  Tamanho esgotado fica desativado. Recheio esgotado não aparece como segundo recheio.
- Carrinho: item que esgotou depois de adicionado é sinalizado e o envio é bloqueado
  até o cliente remover.

## Se a planilha sair do ar

O site continua funcionando e mostra tudo como disponível (ou a última lista que o
navegador guardou, por até 6 horas). Como todo pedido é confirmado no WhatsApp, a loja
ainda tem a palavra final.

## Segurança

A planilha publicada é pública (qualquer pessoa com o link vê as colunas acima). Não
coloque nela nada além de estoque. Quem pode **editar** é só quem receber acesso de
editor no Google.

## Novo produto da Seca Saborizada
Ao incluir um sabor novo no site, adicione na planilha uma linha com o id do produto (por exemplo `seca-morango`), o nome em **produto** e **Pacote** em **tamanho**. Sem a linha, o produto aparece normalmente e só não dá para marcá-lo como esgotado.
