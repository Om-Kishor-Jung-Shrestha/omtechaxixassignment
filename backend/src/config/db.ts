import mongoose from 'mongoose';

let retryCount = 0;
const MAX_RETRIES = 5;

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI environment variable is not set');

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ MongoDB Atlas connected');
    retryCount = 0;
  } catch (error) {
    retryCount++;
    console.error(`❌ MongoDB connection failed (attempt ${retryCount}/${MAX_RETRIES}):`, error);
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying in 5 seconds...`);
      await new Promise(res => setTimeout(res, 5000));
      return connectDB();
    }
    throw error;
  }
}

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected. Attempting reconnect...');
  connectDB().catch(console.error);
});