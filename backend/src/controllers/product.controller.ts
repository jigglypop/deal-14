import { Request, Response } from 'express';
import HTTPError from '../errors/http-error';
import { ModifyProductRequest, ReadDetailProductsRequest, WriteProductRequest } from '../requests/product.request';
import productService from '../services/product.service';

class ProductController {
  async write(req: Request, res: Response) {
    const { userId, body } = req;

    const writeProductRequest = new WriteProductRequest(body);
    await writeProductRequest.validate();

    const product = await productService.write(userId, writeProductRequest);

    res.status(200).json({
      message: '상품 등록 성공',
      data: {
        product,
      }
    })
  }

  async readDetail(req: Request, res: Response) {
    const { userId, params } = req;
    if (Number.isNaN(Number(params.productId))) {
      throw new HTTPError(400, '상품 번호 검증 오류');
    }

    const product = await productService.findDetail(userId, Number(params.productId));
    res.status(200).json({
      message: '상품 조회 성공',
      data: {
        product,
      },
    });
  }

  async readDetails(req: Request, res: Response) {
    const { query, userId } = req;

    const readDetailProductsRequest = new ReadDetailProductsRequest(query as any);
    await readDetailProductsRequest.validate();

    const products = await productService.findDetails(userId, readDetailProductsRequest);

    res.status(200).json({
      message: '상품정보 조회 성공',
      data: {
        products,
      }
    });
  }

  async readLikedDetails(req: Request, res: Response) {
    const { userId } = req;

    const products = await productService.findLiked(userId);

    res.status(200).json({
      message: '좋아요한 상품정보 조회 성공',
      data: {
        products,
      }
    });
  }

  async readMine(req: Request, res: Response) {
    const { userId } = req;

    const products = await productService.findUserProducts(userId);

    res.status(200).json({
      message: '본인 상품정보 조회 성공',
      data: {
        products,
      }
    });
  }

  async modify(req: Request, res: Response) {
    const { userId, params, body } = req;

    const modifyProductRequest = new ModifyProductRequest(body);
    await modifyProductRequest.validate();

    if (Number.isNaN(Number(params.productId))) {
      throw new HTTPError(400, '상품 번호 검증 오류');
    }

    await productService.modify(userId, Number(params.productId), modifyProductRequest);

    res.status(200).json({
      message: '상품 수정 성공',
    });
  }

  async remove(req: Request, res: Response) {
    const { userId, params } = req;

    if (Number.isNaN(Number(params.productId))) {
      throw new HTTPError(400, '상품 번호 검증 오류');
    }

    await productService.remove(userId, Number(params.productId));

    res.status(200).json({
      message: '상품 삭제 성공',
    });
  }
}

export default new ProductController();