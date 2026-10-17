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
    { id: id ? id.toString() : '' },
    process.env.JWT_SECRET || 'sky_nest_drive_jwt_secret_super_secure_key_2026_xyz',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register or /api/auth/signup
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your full name.',
      });
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email format.',
      });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    // Check if user already exists in MongoDB
    const existingUser = await findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    // Create user in MongoDB
    const newUser = await createUser({ name, email, password });
    const token = signToken(newUser._id || newUser.id);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      token,
      user: sanitizeUser(newUser),
    });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error while creating account.',
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please enter your email address.',
      });
    }

    if (!password || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Please enter your password.',
      });
    }

    // Find user in MongoDB by email
    const user = await findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Check password
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Generate JWT
    const token = signToken(user._id || user.id);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error while authenticating.',
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
    const { email } = req.body || {};
    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address.',
      });
    }

    // Safe response: does not reveal whether the email exists in system
    return res.status(200).json({
      success: true,
      message: 'If an account exists with this email, password reset instructions have been sent.',
    });
  } catch (err) {
    console.error('forgotPassword error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error processing password reset.',
    });
  }
};

// @desc    User logout
// @route   POST /api/auth/logout
export const logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
};

export default {
  register,
  login,
  getMe,
  forgotPassword,
  logout,
};
