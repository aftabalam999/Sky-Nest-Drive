import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

// Connect to MongoDB database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl)
      if (!origin) return callback(null, true);
      // Allow localhost / 127.0.0.1 on any port in development
      if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }
      if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle invalid JSON body syntax errors cleanly without leaking stacks
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON payload in request body.',
    });
  }
  next(err);
});

// Request Logger (Development)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root & Base Status
const rootHandler = (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Sky Nest Drive API',
  });
};
app.get('/', rootHandler);
app.get('/api', rootHandler);

// Health Check
const healthHandler = (req, res) => {
  res.status(200).json({
    status: 'healthy',
  });
};
app.get('/api/health', healthHandler);
app.get('/health', healthHandler);

// API Routes
app.use('/api/auth', authRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Resource not found.',
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: 'Internal server error.',
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Sky Nest Drive Server running on http://localhost:${PORT}`);
});
