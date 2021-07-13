import { Request, Response } from 'express';
import { ReadDetailProductsRequest, WriteProductRequest } from '../requests/product.request';
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

  async readDetails(req: Request, res: Response) {
    const { query } = req;

    const readDetailProductsRequest = new ReadDetailProductsRequest(query as any);
    await readDetailProductsRequest.validate();

    const products = await productService.findDetails(readDetailProductsRequest);

    res.status(200).json({
      message: '상품정보 조회 성공',
      data: {
        products,
      }
    })
  }
}

export default new ProductController();