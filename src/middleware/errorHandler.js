import { isCelebrateError } from 'celebrate';

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const status = error.status ?? error.statusCode ?? 500;
  const response = {
    status,
    message: status === 500 ? 'Internal Server Error' : error.message,
  };

  if (isCelebrateError(error)) {
    response.validation = Object.fromEntries(
      [...error.details.entries()].map(([segment, validationError]) => [
        segment,
        validationError.details.map(({ message, path }) => ({ message, path })),
      ]),
    );
  }

  req.log?.error(error);
  res.status(status).json(response);
};