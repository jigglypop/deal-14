import { Request, NextFunction, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import HTTPError from '../errors/http-error';
import jwtService from '../services/jwt.service';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;
  if (typeof bearerToken !== 'string') {
    throw new HTTPError(400, '토큰 타입 검증 오류');
  }

  const parsedBearerToken = bearerToken.split('Bearer ')
  if (parsedBearerToken.length < 2) {
    throw new HTTPError(400, '토큰 양식 검증 오류');
  }

  const token = parsedBearerToken[1];
  try {
    const decoded = jwtService.decode(token);
    req.userId = decoded.id;
    next();
  } catch (error) {
    switch (error.constructor) {
      case TokenExpiredError:
        throw new HTTPError(409, '만료된 토큰');

      case JsonWebTokenError:
        throw new HTTPError(401, '토큰 인증 실패');

      default:
        throw error;
    }
  }
}

export default authMiddleware;