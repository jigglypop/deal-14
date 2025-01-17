import * as jwt from 'jsonwebtoken';
import dotenv from '../config/dotenv';
import { JWTDecode } from '../interfaces/jwt';

const {
  JWT_EXPIRES_IN,
  JWT_ISSUER,
  JWT_SUBJECT,
  JWT_SECRET,
} = dotenv;

type JWTSignTypes = {
  id: string;
  profileImage: string;
}

class JWTService {
  generate({ id, profileImage }: JWTSignTypes) {
    const payload = {
      id,
      profileImage,
    };

    const options: jwt.SignOptions = {
      expiresIn: JWT_EXPIRES_IN,
      subject: JWT_SUBJECT,
      issuer: JWT_ISSUER,
    };

    return jwt.sign(payload, JWT_SECRET, options);
  }

  decode(token: string) {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTDecode;

    return decoded;
  }
}

export default new JWTService();