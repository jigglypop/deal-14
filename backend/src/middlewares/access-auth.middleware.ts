import { Request, NextFunction, Response } from 'express';
import HTTPError from '../errors/http-error';
import jwtService from '../services/jwt.service';

const accessAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization;
    if (typeof bearerToken !== 'string') {
      throw new HTTPError(400, '토큰 타입 검증 오류');
    }

    const parsedBearerToken = bearerToken.split('Bearer ')
    if (parsedBearerToken.length < 2) {
      throw new HTTPError(400, '토큰 양식 검증 오류');
    }

    const token = parsedBearerToken[1];
    const decoded = jwtService.decode(token);

    req.userId = decoded.id;
  } catch (error) { }

  next();
}

export default accessAuthMiddleware;