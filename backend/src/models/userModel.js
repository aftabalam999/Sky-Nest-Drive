import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data folder and users.json exist
function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

// Read all users
export function readUsers() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Error reading users data:', err);
    return [];
  }
}

// Write users
export function writeUsers(users) {
  ensureDataFile();
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing users data:', err);
    return false;
  }
}

// Find user by email (case-insensitive)
export function findByEmail(email) {
  if (!email) return null;
  const users = readUsers();
  return users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase()) || null;
}

// Find user by ID
export function findById(id) {
  if (!id) return null;
  const users = readUsers();
  return users.find((u) => u.id === id) || null;
}

// Create new user with hashed password
export async function createUser({ name, email, password }) {
  const users = readUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    id: 'usr_' + crypto.randomBytes(8).toString('hex'),
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name.trim())}`,
    storageUsedGB: 0.0,
    storageTotalGB: 15.0,
    plan: 'Nest Cloud Standard (15 GB Free)',
    role: 'Member',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  return newUser;
}

// Verify password
export async function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

// Return user object without sensitive fields
export function sanitizeUser(user) {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
}

export default {
  readUsers,
  writeUsers,
  findByEmail,
  findById,
  createUser,
  verifyPassword,
  sanitizeUser,
};
