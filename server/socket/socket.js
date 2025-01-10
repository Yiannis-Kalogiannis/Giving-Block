const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});


const userSocketMap = {}; // {userId: socketId}

// Export the function to get the receiver's socket id
const getReceiverSocketId = (receiverId) => {
    console.log('Receiver ID:', receiverId);
  console.log('User Socket Map:', userSocketMap);
  return userSocketMap[receiverId];
};







// io.on() is used to listen to the events. can be used both on client and server side
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  console.log('Handshake User ID:', socket.handshake.query.userId);
  
  // Get the user ID from the query params and store the socket ID in the userSocketMap
  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
    console.log('User connected with ID:', userId); // Debugging
    console.log("UserSocket map:", userSocketMap); // Debugging
  }
  
  
  // Emit the online users list to all clients
  io.emit('getOnlineUsers', Object.keys(userSocketMap));
  
  
  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on('disconnect', () => {
    console.log('User disconnected');
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

module.exports = { app, io, server, getReceiverSocketId, userSocketMap };