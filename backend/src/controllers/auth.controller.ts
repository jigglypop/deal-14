import { Request, Response } from 'express';
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
      throw new HTTPError(401, '회원 없음');
    }

    const token = jwtService.generate(user.id);

    res.status(200).header({
      token,
    }).json({
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

    res.status(200).header({
      token,
    }).json({
      message: '회원가입 성공',
      data: {
        user,
      }
    });
  }
}

export default new AuthController();