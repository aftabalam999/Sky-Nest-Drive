import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email format.'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password.'],
      minlength: [6, 'Password must be at least 6 characters long.'],
    },
    avatar: {
      type: String,
      default: function () {
        return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(this.name || 'User')}`;
      },
    },
    storageUsedGB: {
      type: Number,
      default: 0.0,
    },
    storageTotalGB: {
      type: Number,
      default: 15.0,
    },
    plan: {
      type: String,
      default: 'Nest Cloud Standard (15 GB Free)',
    },
    role: {
      type: String,
      default: 'Member',
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  if (!enteredPassword || !this.password) return false;
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch {
    return false;
  }
};

export const User = mongoose.models.User || mongoose.model('User', userSchema);

// --- Pure MongoDB Database Operations ---

// Find user by email in MongoDB
export async function findByEmail(email) {
  if (!email || typeof email !== 'string') return null;
  return await User.findOne({ email: email.trim().toLowerCase() });
}

// Find user by ID in MongoDB
export async function findById(id) {
  if (!id) return null;
  try {
    return await User.findById(id);
  } catch {
    return null;
  }
}

// Create new user in MongoDB
export async function createUser({ name, email, password }) {
  const user = new User({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
  });

  await user.save();
  return user;
}

// Verify password
export async function verifyPassword(plainPassword, hashedPassword) {
  if (!plainPassword || !hashedPassword) return false;
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch {
    return false;
  }
}

// Return user object without sensitive fields
export function sanitizeUser(user) {
  if (!user) return null;
  const userObj = user.toObject ? user.toObject() : { ...user };
  const { password, __v, ...safeUser } = userObj;
  safeUser.id = userObj._id ? userObj._id.toString() : userObj.id || user.id;
  delete safeUser._id;
  return safeUser;
}

export default User;
