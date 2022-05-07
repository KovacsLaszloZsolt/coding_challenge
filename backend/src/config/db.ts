import mongoose from 'mongoose';
import { connection } from './db_connection';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(connection);
    console.log(`MongoDb Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};
