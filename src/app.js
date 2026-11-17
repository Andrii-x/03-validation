import express from 'express';
import cors from 'cors';
import createError from 'http-errors';
import { errors as celebrateErrors } from 'celebrate';
import notesRouter from './routes/notesRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/notes', notesRouter);
app.use((req, res, next) => next(createError(404, 'Route not found')));
app.use(celebrateErrors());
app.use((error, req, res, next) => {
  const status = error.status ?? error.statusCode ?? 500;
  res.status(status).json({
    status,
    message: status === 500 ? 'Internal Server Error' : error.message,
  });
});

export default app;