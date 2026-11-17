import express from 'express';
import cors from 'cors';
import { errors as celebrateErrors } from 'celebrate';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import notesRouter from './routes/notesRoutes.js';

const app = express();

app.use(logger);
app.use(cors());
app.use(express.json());
app.use('/notes', notesRouter);
app.use(notFoundHandler);
app.use(celebrateErrors());
app.use(errorHandler);

export default app;