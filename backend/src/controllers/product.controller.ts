import { Request, Response } from 'express';
import { WriteProductRequest } from '../requests/product.request';
import productService from '../services/product.service';

class ProductController {
  async write(req: Request, res: Response) {
    const { userId, body } = req;

    const writeProductRequest = new WriteProductRequest(body);
    await writeProductRequest.validate();

    await productService.write(userId, writeProductRequest);

    res.status(200).json({
      message: '상품 등록 성공',
    })
  }
}

export default new ProductController();