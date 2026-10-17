import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not defined in .env');
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(`🍃 MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn(
      '⚠️ Please verify that MongoDB is running and MONGODB_URI is correctly set in backend/.env'
    );
    throw error;
  }
};

export default connectDB;
