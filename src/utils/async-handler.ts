// src/utils/async-handler.ts DS
import { type Request, type Response, type NextFunction } from 'express';
import { ApiResponse } from './api-response.js';

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;


export const asyncHandler = (fn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.error('🔥 Async Handler Error:', error);

      const response = ApiResponse.error(
        error.message || 'Internal Server Error',
        error.statusCode || 500,
        process.env.NODE_ENV === 'development' ? error.stack : undefined
      );

      res.status(response.statusCode).json(response.toJSON());
    });
  };
};
