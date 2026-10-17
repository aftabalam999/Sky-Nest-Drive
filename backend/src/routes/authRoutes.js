import express from 'express';
import {
  register,
  login,
  getMe,
  forgotPassword,
  logout,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Registration
router.post('/register', register);
router.post('/signup', register);

// Authentication
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/logout', logout);

// Profile (Protected)
router.get('/me', protect, getMe);

// Prevent GET requests on POST endpoints from leaking any internal information
router.all('/login', (req, res) => {
  res.status(405).json({ success: false, message: 'Method not allowed. Use POST.' });
});
router.all('/register', (req, res) => {
  res.status(405).json({ success: false, message: 'Method not allowed. Use POST.' });
});
router.all('/signup', (req, res) => {
  res.status(405).json({ success: false, message: 'Method not allowed. Use POST.' });
});
router.all('/forgot-password', (req, res) => {
  res.status(405).json({ success: false, message: 'Method not allowed. Use POST.' });
});
router.all('/logout', (req, res) => {
  res.status(405).json({ success: false, message: 'Method not allowed. Use POST.' });
});

export default router;
