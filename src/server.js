import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { errors as celebrateErrors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import notesRouter from './routes/notesRoutes.js';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(notesRouter);
app.use(notFoundHandler);
app.use(celebrateErrors());
app.use(errorHandler);

try {
  await connectMongoDB();
  app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error('Failed to start server:', error.message);
  process.exitCode = 1;
}