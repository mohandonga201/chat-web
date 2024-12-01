const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const socketClient = require('socket.io-client');

// Connect to Server B (use Server B's IP or hostname here)
const socketB = socketClient('http://65.1.111.14:3000');  // Docker container or server name

// Serve the chat HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Relay messages from Server B to connected clients on Server A
socketB.on('chat message', (msg) => {
  io.emit('chat message', msg);  // Broadcast to clients connected to Server A
});

// Handle incoming client messages and forward to Server B
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message from client on Server A: ' + msg);
    socketB.emit('chat message', msg);  // Send message to Server B
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server A listening on *:3000');
});
