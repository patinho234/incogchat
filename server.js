const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Servir arquivos da pasta "public"
app.use(express.static('public'));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Conexão com o WebSocket
io.on('connection', (socket) => {
  console.log('Novo usuário conectado');

  socket.on('chat message', (data) => {
    // Limpar dados para evitar injeções ou códigos maliciosos
    const cleanUsername = String(data.username).substring(0, 20);
    const cleanMessage = String(data.message).substring(0, 200);

    // Enviar mensagem para todos os usuários conectados
    io.emit('chat message', {
      username: cleanUsername,
      message: cleanMessage
    });
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

// Iniciar servidor
http.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
