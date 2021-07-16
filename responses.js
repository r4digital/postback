const _ = require('lodash');

const rules = [
  // Exemplo de negação de transferência com "id" específico.
  // Neste caso está negando a transferência usando o response status = 406
  {
    request: {
      method: 'POST',
      path: '/postback/transfer-confirmation',
      body: {
        metadata: {
          id: 'b046f9d5-9c94-49aa-a8d5-04c70a209595'
        }
      }
    },
    response: {
      status: 406
    }
  },

  // Exemplo de confirmação de transferência com sucesso.
  // Neste caso confirmando qualquer transferência que não seja atendida pelas
  // regras acima.
  {
    request: {
      method: 'POST',
      path: '/postback/transfer-confirmation'
    },
    response: {
      status: 202
    }
  },
  
  // Exemplo de corpo de resposta diferente quando fizer uma request
  // POST /postback/transfer-notification
  {
    request: {
      method: 'POST',
      path: '/postback/transfer-notification'
    },
    response: {
      status: 200,
      body: { success: true, message: 'Notification received!' }
    }
  }
];

// Resposta padrão quando a request não atender nenhuma das regras
const defaultResponse = {
  status: 200,
  body: { success: true }
};

function getResponse(req) {
  const matchRule = rules.find(rule => !!_.find([req], _.matches(rule.request)));
  return (matchRule && matchRule.response) || defaultResponse;
}

module.exports = {
  getResponse
};
