import HTTPError from '../errors/http-error';

import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'class-validator';

const createErrorResponse = (status: number, message: string) => {
  return {
    status,
    message,
  };
}

const errorMiddleware = (error: Error | Error[], req: Request, res: Response, next: NextFunction) => {
  console.log(error);

  let status = 500;
  let message = '서버오류';

  if (error instanceof HTTPError) {
    status = error.status;
    message = error.message;
  }

  if (Array.isArray(error) && error[0] instanceof ValidationError) {
    status = 400;
    message = '검증 오류';
  }

  const responseBody = createErrorResponse(status, message);
  res.status(status).json(responseBody);
}

export default errorMiddleware;