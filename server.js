const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const JWT_SECRET = 'supersecretkey123';

// Serve test-socket.html with error handling
app.get('/test-socket.html', (req, res) => {
  const filePath = path.join(__dirname, 'test-socket.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error serving test-socket.html:', err);
      res.status(500).send('Server error while serving file');
    }
  });
});

// Handle CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.status(204).send();
  next();
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'], credentials: true },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Authentication error: No token provided'));
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.username || !decoded.userId) {
      return next(new Error('Authentication error: Invalid token payload'));
    }
    socket.user = decoded;
    socket.join(decoded.userId.toString());
    next();
  } catch (error) {
    next(new Error('Authentication error: Invalid token'));
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.user.username, socket.id);

  socket.on('message', async (data) => {
    console.log('Message received:', data, 'from', socket.user.username);
    try {
      const { content, receiverId } = typeof data === 'string' ? { content: data, receiverId: socket.user.userId } : data;
      const message = await prisma.message.create({
        data: {
          content,
          senderId: socket.user.userId,
          receiverId: receiverId || socket.user.userId,
          timestamp: new Date(),
        },
        include: { sender: true },
      });
      const messageData = {
        id: message.id,
        content: message.content,
        sender: message.sender.username,
        senderId: message.senderId,
        receiverId: message.receiverId,
        timestamp: message.timestamp.toISOString(),
      };
      if (receiverId && receiverId !== socket.user.userId) {
        io.to(receiverId.toString()).emit('message', messageData);
      }
      socket.emit('message', messageData);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.user.username, socket.id);
  });
});

server.listen(3003, () => {
  console.log('Socket.io server running on http://localhost:3003');
});
