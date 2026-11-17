import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  const { MONGO_URL } = process.env;

  if (!MONGO_URL) {
    throw new Error('MONGO_URL is not set');
  }

  await mongoose.connect(MONGO_URL);
  console.info('MongoDB connection established successfully');
};