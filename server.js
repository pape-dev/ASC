require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require('socket.io');
const authRoutes = require('./routes/auth');
const fraudeRoutes = require('./routes/fraude');
const contactRoutes = require('./routes/contact');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/fraudes', fraudeRoutes);
app.use('/api/contact', contactRoutes);

io.on('connection', (socket) => {
  console.log('Utilisateur connecté');
  socket.on('disconnect', () => console.log('Déconnecté'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));