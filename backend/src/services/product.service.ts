import HTTPError from '../errors/http-error';
import productQuery from '../query/product.query';
import townQuery from '../query/town.query';
import { ReadDetailProductsRequest, WriteProductRequest } from '../requests/product.request';

class ProductService {
  async findDetails(options: ReadDetailProductsRequest) {
    const { category, townId } = options;
    let sql = `
      SELECT product.*, user.* FROM product
      LEFT JOIN user as u user ON user.id = product.userId
    `;
    const params: (string | number)[] = [];

    if (category && townId) {
      sql = sql.concat(' WHERE category = ? AND townId = ? ');
      params.concat([category, townId]);
    } else if (category) {
      sql = sql.concat(' WHERE category = ? ');
      params.push(category);
    } else if (townId) {
      sql = sql.concat(' WHERE townId = ? ');
      params.push(townId);
    }

    const products = await productQuery.select(sql, params);
    console.log(products);
  }

  async write(userId: string, writeProductRequest: WriteProductRequest) {
    const { title, price, content, category, townId, images } = writeProductRequest;
    const town = await townQuery.findByPk(townId);
    if (town === null) {
      throw new HTTPError(404, '해당 동네가 없음');
    }

    const createdProduct = await productQuery.create({
      title,
      price,
      content,
      category,
      townId,
      userId,
      isSoldOut: false,
    });
    // todo: image 저장

    return createdProduct;
  }
}

export default new ProductService();
