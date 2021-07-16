const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { getResponse } = require('./responses');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let requests = [];

app.use(bodyParser.json());
app.use('/', express.static('public'));

app.all('/postback*', (req, res) => {
  const response = getResponse(req);
  const { method, path, headers, body, originalUrl } = req;
  const ts = new Date().getTime();
  const request = { ts, method, path, headers, body, originalUrl, response };

  requests = [...requests.slice(0, 99), request];
  console.log({ request });
  io.emit('request', request);

  res
    .status(response.status)
    .send(response.body);
});

io.on('connection', (socket) => {
  requests.forEach(request => {
    socket.emit('request', request);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
