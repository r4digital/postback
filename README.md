# Postback API


## Introdução

Use a URL http://localhost:3000/postback/* com qualquer terminação para testar o postback.
As consultas aparecerão nesta tela. Por exemplo:

`http://localhost:3000/postback/transfer-confirmation`

`http://localhost:3000/postback/transfer-notification`

Você pode mudar o comportamento das respostas das requests editando o arquivo [responses.js](./responses.js).
Basta acrescentar requisitos aplicáveis dentro da tag `request` e usar a tag `response` para definir o **status** e o **body** desejado.
Em caso de conflito de regras, a primeira que cumprir os requisitos será aplicada.


## Executando

Execute o comando `npm start` para iniciar o serviço.
