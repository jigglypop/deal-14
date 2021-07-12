import * as jwt from 'jsonwebtoken';
import dotenv from '../config/dotenv';
import { JWTDecode } from '../interfaces/jwt';

const {
  JWT_EXPIRES_IN,
  JWT_ISSUER,
  JWT_SUBJECT,
  JWT_SECRET,
} = dotenv;

class JWTService {
  generate(id: string) {
    const payload = {
      id,
    };

    const options: jwt.SignOptions = {
      expiresIn: JWT_EXPIRES_IN,
      subject: JWT_SUBJECT,
      issuer: JWT_ISSUER,
    };

    return jwt.sign(payload, JWT_SECRET, options);
  }

  verify(token: string) {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTDecode;

    return decoded;
  }
}

export default new JWTService();