const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500", // Allow requests from this origin
    methods: ["GET", "POST"] // Add allowed methods
  }
});
const gameBoard = [
  [0,0,0,0,0,0], // Row 1
  [0,0,0,0,0,0], // Row 2
  [0,0,0,0,0,0], // Row 3
  [0,0,0,0,0,0], // Row 4
  [0,0,0,0,0,0], // Row 5
  [0,0,0,0,0,0], // Row 6
  [0,0,0,0,0,0], // Row 7
  
];

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log(`A user connected with ID: ${socket.id}`);
  let color = (io.engine.clientsCount % 2 === 0) ? 'blue' : 'red';

  // Emit color information to the connected client
  io.to(socket.id).emit('playerColor', color);
  // Handle events and messages from the client
  socket.on('default', (data,data1,data2) => {
    // ...
    io.emit('recser',"hello")
    console.log(data);

  });

  // Disconnect handling
  socket.on('disconnect', () => {
    console.log(`User disconnected with ID: ${socket.id}`);
    // Perform any necessary cleanup or handling
  });
  socket.on('colorAndId', (id, color) => {
    console.log('Received color:', color);
    console.log('Received ID:', id);
    for(let i=6;i>=0;i--){
      if(gameBoard[i][id]==0){
        gameBoard[i][id]=color
        io.emit('update',(6*i+id+1),color)
        break; 
      }
    }
    console.log(gameBoard)
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
