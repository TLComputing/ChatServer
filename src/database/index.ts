import mongoose from 'mongoose';
import config from '../config';

export async function connectDB() {
  try {
    await mongoose.connect(config.database.url, { maxPoolSize: 100 });

    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed ', error);
  };
}


