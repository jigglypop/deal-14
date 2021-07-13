import HTTPError from '../errors/http-error';
import productQuery from '../query/product.query';
import townQuery from '../query/town.query';
import { ReadDetailProductsRequest, WriteProductRequest } from '../requests/product.request';

class TownService {
  async findDetails(options: ReadDetailProductsRequest) {
    const { category, townId } = options;
    let sql = `
      SELECT product.*, user.id as 'user.id', town.id as 'town.id', town.townName as 'town.townName' FROM product
      LEFT JOIN user ON user.id = product.userId
      LEFT JOIN town ON town.id = product.townId
    `;

    const params: (string | number)[] = [];

    if (category && townId) {
      sql = sql.concat(' WHERE category = ? AND townId = ? ');
      params.push(category);
      params.push(townId);
    } else if (category) {
      sql = sql.concat(' WHERE category = ? ');
      params.push(category);
    } else if (townId) {
      sql = sql.concat(' WHERE townId = ? ');
      params.push(townId);
    }

    sql = sql.concat(' ORDER BY createdAt DESC ');

    const products = await productQuery.select(sql, params);

    return products;
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

    return createdProduct;
  }
}

export default new TownService();
