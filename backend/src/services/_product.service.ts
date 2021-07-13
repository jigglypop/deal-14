import HTTPError from '../errors/http-error';
import Product from "../models/product";
import { WriteProductRequest, ReadProductRequest } from '../requests/product.request';


// 참고용
class ProductService {
  async writeProduct(writeProductRequest: WriteProductRequest) {
    const { title, price, content } = writeProductRequest;
    const product = await Product.create({
        title,
        price,
        content
    })
    if (!product) {
      throw new HTTPError(500, '상품 등록에 실패하였습니다.');
    }
    return product
  }

  async readProduct(readProductRequest: ReadProductRequest) {
    const { productId } = readProductRequest;
    const product = await Product.findByPk(productId)
    if (!product) {
      throw new HTTPError(500, '상품이 없습니다.');
    }
    return product
  }
}

export default new ProductService();