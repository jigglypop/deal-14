import { Request, Response } from 'express';
import HTTPError from '../errors/http-error';
import likedProductService from '../services/liked-product.service';

class LikedProductController {
  async like(req: Request, res: Response) {
    const { userId, params } = req;
    if (Number.isNaN(Number(params.productId))) {
      throw new HTTPError(400, '상품 번호 검증 오류');
    }

    await likedProductService.like(userId, Number(params.productId))

    res.status(200).json({
      message: '상품 좋아요 성공'
    })
  }

  async unlike(req: Request, res: Response) {
    const { userId, params } = req;

    if (Number.isNaN(Number(params.productId))) {
      throw new HTTPError(400, '상품 번호 검증 오류');
    }

    await likedProductService.unlike(userId, Number(params.productId))

    res.status(200).json({
      message: '상품 좋아요 취소 성공'
    })
  }
}

export default new LikedProductController();