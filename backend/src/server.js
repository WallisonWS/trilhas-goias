import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import routes
import authRoutes from './routes/authRoutes.js';
import trailRoutes from './routes/trailRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import emergencyRoutes from './routes/emergencyRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Create HTTP server
const httpServer = createServer(app);

// Initialize Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); // Enable CORS
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Muitas requisições deste IP, tente novamente mais tarde.'
});

app.use('/api/', limiter);

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trails', trailRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/chat', chatRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API Trilhas de Goiás está funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Bem-vindo à API Trilhas de Goiás! 🏔️',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      trails: '/api/trails',
      reviews: '/api/reviews',
      forum: '/api/forum',
      emergency: '/api/emergency'
    }
  });
});

// Socket.io for real-time features
io.on('connection', (socket) => {
  console.log('🔌 Novo cliente conectado:', socket.id);

  // Join room for trail tracking
  socket.on('join-trail', (trailId) => {
    socket.join(`trail-${trailId}`);
    console.log(`👤 Cliente ${socket.id} entrou na trilha ${trailId}`);
  });

  // Leave trail room
  socket.on('leave-trail', (trailId) => {
    socket.leave(`trail-${trailId}`);
    console.log(`👤 Cliente ${socket.id} saiu da trilha ${trailId}`);
  });

  // Join chat room
  socket.on('join-chat', (roomId) => {
    socket.join(`chat-${roomId}`);
    console.log(`💬 Cliente ${socket.id} entrou no chat ${roomId}`);
  });

  // Leave chat room
  socket.on('leave-chat', (roomId) => {
    socket.leave(`chat-${roomId}`);
    console.log(`💬 Cliente ${socket.id} saiu do chat ${roomId}`);
  });

  // User typing indicator
  socket.on('typing', (data) => {
    socket.to(`chat-${data.roomId}`).emit('user-typing', {
      userId: data.userId,
      userName: data.userName
    });
  });

  // User stopped typing
  socket.on('stop-typing', (data) => {
    socket.to(`chat-${data.roomId}`).emit('user-stopped-typing', {
      userId: data.userId
    });
  });

  // GPS position update
  socket.on('gps-update', (data) => {
    // Broadcast to others in the same trail
    socket.to(`trail-${data.trailId}`).emit('user-position', {
      userId: data.userId,
      position: data.position,
      timestamp: new Date()
    });
  });

  // SOS alert
  socket.on('sos-alert', (data) => {
    // Broadcast SOS to all connected clients (for monitoring)
    io.emit('sos-broadcast', {
      userId: data.userId,
      trailId: data.trailId,
      position: data.position,
      message: data.message,
      timestamp: new Date()
    });
    
    console.log('🚨 SOS ALERT:', data);
  });

  socket.on('disconnect', () => {
    console.log('❌ Cliente desconectado:', socket.id);
  });
});

// Make io available to routes
app.set('io', io);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║                                                       ║
  ║   🏔️  API TRILHAS DE GOIÁS                           ║
  ║                                                       ║
  ║   🚀 Servidor rodando na porta ${PORT}                  ║
  ║   🌍 Ambiente: ${process.env.NODE_ENV || 'development'}                    ║
  ║   📡 Socket.io ativo para comunicação em tempo real  ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
  `);
});

export { io };