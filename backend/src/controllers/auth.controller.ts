import { Request, Response } from 'express';
import dotenv from '../config/dotenv';
import HTTPError from '../errors/http-error';
import { LoginRequest, RegisterRequest } from '../requests/auth.request';
import jwtService from '../services/jwt.service';
import userService from '../services/user.service';

class AuthController {
  async login(req: Request, res: Response) {

    const loginRequest = new LoginRequest(req.body);
    await loginRequest.validate();

    const user = await userService.find(loginRequest.id);
    if (user === null) {
      throw new HTTPError(401, '회원 정보가 없음');
    }

    const token = jwtService.generate(user.id);

    res.header({
      token
    })
    res.setHeader("Access-Control-Expose-Headers", "*")
    res.setHeader('Access-Control-Allow-Origin', dotenv.CLIENT_URL);

    res.status(200).json({
      message: '로그인 성공',
      data: {
        user,
      },
    });
  }

  async register(req: Request, res: Response) {

    const registerRegister = new RegisterRequest(req.body);
    await registerRegister.validate();

    const user = await userService.register(registerRegister);
    const token = jwtService.generate(user.id);

    // 서버 헤더 뚫기
    const FRONT = process.env.FRONT
    if (!FRONT) {
      throw new HTTPError(401, "서버 주소가 없음")
    }
    res.header({
      token
    })
    res.setHeader("Access-Control-Expose-Headers", "*")
    res.setHeader('Access-Control-Allow-Origin', FRONT)

    res.status(200).json({
      message: '회원가입 성공',
      data: {
        user,
      }
    });
  }

  async check(req: Request, res: Response) {

    const header = req.headers
    const { token } = header
    if (typeof token !== 'string') {
      throw new HTTPError(401, "토큰이 없음")
    }
    const _token = token.replace("Bearer ", "")
    const result = jwtService.decode(_token)
    if (!result) {
      throw new HTTPError(401, "유저가 없음")
    }

    res.status(200).json({
      message: '체크 완료',
      data: {
        user: result
      }
    });
  }
}

export default new AuthController();