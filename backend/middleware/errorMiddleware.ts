import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { Messages } from '../constant/message';

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = 500;
  let message = Messages.SERVER_ERROR;
  let stack = undefined;

  if (err instanceof AppError) {
    status = err.status;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
    stack = err.stack;
    // Check if it's a known error object with a status (e.g. from a library)
    if ('status' in err && typeof (err as any).status === 'number') {
      status = (err as any).status;
    }
  } else if (typeof err === 'object' && err !== null) {
      // Handle cases where an object literal was thrown
      status = (err as any).status || 500;
      message = (err as any).message || Messages.SERVER_ERROR;
  }

  // Log error for developers
  console.error(`[ERROR] ${req.method} ${req.path} - ${message}`);
  if (status === 500 && stack) {
    console.error(stack);
  }

  res.status(status).json({
    status,
    message,
    // stack: process.env.NODE_ENV === 'development' ? stack : undefined,
  });
};
