import 'dotenv/config';
import app from './src/app.js';
import { initMongoConnection } from './src/db/initMongoConnection.js';

const port = Number(process.env.PORT) || 3030;

try {
  await initMongoConnection();
  app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error('Failed to start server:', error.message);
  process.exitCode = 1;
}