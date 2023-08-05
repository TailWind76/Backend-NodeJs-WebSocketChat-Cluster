// server.js
const express = require('express');
const http = require('http');
const socketClusterServer = require('socketcluster-server');

const app = express();
const httpServer = http.createServer(app);

const scServer = socketClusterServer.attach(httpServer);

scServer.on('connection', (socket) => {
  console.log('User connected');

  socket.on('chat message', (msg) => {
    console.log('Received message:', msg);
    scServer.exchange.publish('chat', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const port = 3000;
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
