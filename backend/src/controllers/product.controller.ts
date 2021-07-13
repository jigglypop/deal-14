import { Request, Response } from 'express';
import HTTPError from '../errors/http-error';
// import { LoginRequest, RegisterRequest } from '../requests/auth.request';
import { WriteProductRequest, ReadProductRequest } from "../requests/product.request"
import productService from '../services/product.service';
import userService from '../services/user.service';

class ProductController {
  async writeProduct(req: Request, res: Response) {
    // 유저 릴레이션 로직 추가(연결 이전)
    // .....
    // 유저 릴레이션 로직 추가(아직 연결 이전)
    const writeProductRequest = new WriteProductRequest(req.body)
    await writeProductRequest.validate()
    const product = await productService.writeProduct(writeProductRequest)

    res.status(200).json({
      data: product,
    });
  }

  async readProduct(req: Request, res: Response) {

    const readProductRequest = new ReadProductRequest({
      productId: req.params.productId
    });
    const product = await productService.readProduct(readProductRequest)

    res.status(200).json({
      data: product,
    });
  }
}

export default new ProductController();