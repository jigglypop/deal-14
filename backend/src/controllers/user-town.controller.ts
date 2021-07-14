import { Request, Response } from 'express';
import HTTPError from '../errors/http-error';
import { CreateUserTownRequest } from '../requests/town.request';
import userTownService from '../services/user-town.service';

class UserTownController {

  async findMyTowns(req: Request, res: Response) {
    const { userId } = req;

    const towns = await userTownService.findByUser(userId);

    res.status(200).json({
      message: '회원 동네 정보 조회 성공',
      data: {
        towns,
      },
    });
  }

  async registerUserTown(req: Request, res: Response) {
    const { userId, body } = req;
    const createUserTownRequest = new CreateUserTownRequest(body);
    await createUserTownRequest.validate();

    await userTownService.create(userId, createUserTownRequest);

    res.status(200).json({
      message: '동네 등록 성공',
    });
  }

  async removeUserTown(req: Request, res: Response) {
    const { userId, params } = req;
    if (Number.isNaN(params.userTownId)) {
      throw new HTTPError(400, '회원 동네 번호 검증 오류');
    }

    await userTownService.remove(userId, Number(params.userTownId));

    res.status(200).json({
      message: '동네 정보 삭제 성공',
    });
  }

}

export default new UserTownController();