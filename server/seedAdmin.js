import mongoose from 'mongoose';
import Admin from './models/admin.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  const dbURI = process.env.MONGODB_URI;
  
  if (!dbURI) {
    console.error('MONGODB_URI is not defined. Please check your .env file.');
    process.exit(1);
  }

  try {
    await mongoose.connect(dbURI);
    console.log('MongoDB connected');

    const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      mongoose.disconnect();
      return;
    }

    const admin = new Admin({
      email: 'admin@example.com',
      password: 'adminpassword',  // Plain text password
    });

    await admin.save();
    console.log('Admin user created');
  } catch (error) {
    console.error('Error connecting to MongoDB or creating admin user:', error);
  } finally {
    mongoose.disconnect();
  }
};

createAdmin();