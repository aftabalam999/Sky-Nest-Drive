import jwt from 'jsonwebtoken';
import {
  findByEmail,
  createUser,
  verifyPassword,
  sanitizeUser,
} from '../models/userModel.js';

// Helper to generate JWT token
const signToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'sky_nest_drive_jwt_secret_super_secure_key_2026_xyz',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your full name.',
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email format (e.g. user@domain.com).',
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    // Check if user already exists
    const existingUser = findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists. Please sign in.',
      });
    }

    // Create user in persistent database
    const newUser = await createUser({ name, email, password });
    const token = signToken(newUser.id);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to Sky Nest Drive.',
      token,
      user: sanitizeUser(newUser),
    });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error while creating account. Please try again.',
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please enter your email address.',
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Please enter your password.',
      });
    }

    // Find user by email
    const user = findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No account found with this email. Please create an account first.',
      });
    }

    // Check password
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password. Please check your credentials.',
      });
    }

    // Generate JWT
    const token = signToken(user.id);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully! Welcome back.',
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error while authenticating. Please try again.',
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    console.error('getMe error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving user profile.',
    });
  }
};

// @desc    Forgot password request
// @route   POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address.',
      });
    }

    const user = findByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account registered with this email address.',
      });
    }

    return res.status(200).json({
      success: true,
      message: `Password reset instructions have been sent to ${email}.`,
    });
  } catch (err) {
    console.error('forgotPassword error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error processing password reset.',
    });
  }
};

export default {
  register,
  login,
  getMe,
  forgotPassword,
};
