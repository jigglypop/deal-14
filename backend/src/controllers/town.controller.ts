import { Request, Response } from 'express';
import townService from '../services/town.service';

class TownController {
  async findAll(req: Request, res: Response) {
    const towns = await townService.findAll();

    res.status(200).json({
      message: '전체 동네 조회',
      data: {
        towns,
      }
    })
  }
}

export default new TownController();