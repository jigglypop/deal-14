import { Request, Response } from 'express';
import HTTPError from '../errors/http-error';
// import { LoginRequest, RegisterRequest } from '../requests/auth.request';
import { TownRequest } from "../requests/town.request"
import townService from '../services/town.service';
// import userService from '../services/user.service';

class TownController {
  async createTown(req: Request, res: Response) {
    // 유저 릴레이션 로직 추가(연결 이전)
    // .....
    // 유저 릴레이션 로직 추가(아직 연결 이전)
    const townRequest = new TownRequest(req.body)
    await townRequest.validate()
    const town = await townService.createTown(townRequest)

    res.status(200).json({
      data: town,
    });
  }
}

export default new TownController();