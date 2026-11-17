import 'dotenv/config';
import app from './app.js';
import { connectMongoDB } from './db/connectMongoDB.js';

const port = Number(process.env.PORT) || 3030;

try {
  await connectMongoDB();
  app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error('Failed to start server:', error.message);
  process.exitCode = 1;
}