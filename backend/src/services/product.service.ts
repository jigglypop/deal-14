import { textChangeRangeIsUnchanged } from 'typescript';
import HTTPError from '../errors/http-error';
import Product from '../models/product';
import productImageQuery from '../query/product-image.query';
import productQuery from '../query/product.query';
import townQuery from '../query/town.query';
import { ReadDetailProductsRequest, WriteProductRequest } from '../requests/product.request';
import SelectSQLGenerator from '../utils/select-sql-generator';

class ProductService {
  async findDetails(options: ReadDetailProductsRequest) {
    const { category, townId } = options;

    const selectSQLGenerator = new SelectSQLGenerator('product', `product.*, user.id as 'user.id', town.id as 'town.id'`);
    selectSQLGenerator.addJoin({
      type: 'LEFT JOIN',
      joinTable: 'user',
      joinPK: 'id',
      equalColum: 'product.userId',
    });
    selectSQLGenerator.addJoin({
      type: 'LEFT JOIN',
      joinTable: 'town',
      joinPK: 'id',
      equalColum: 'product.townId',
    });

    const params = [];
    if (category) {
      selectSQLGenerator.addWhere({ column: 'category' });
      params.push(category);
    }

    if (townId) {
      selectSQLGenerator.addWhere({ column: 'townId' });
      params.push(townId);
    }

    const products = await productQuery.select(selectSQLGenerator.generate(), params);

    // todo: then 체인 + Group By를 통해 chat-room, liked-product 개수 프로퍼티를 한번에 추가
    await Promise.all(products.map(product => {
      return productImageQuery.findByProduct(product.id)
        .then((productImages) => {
          product.productImages = productImages;
        });
    }));

    products.sort(function (a, b) {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

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

    await Promise.all(images.map(image => productImageQuery.create({
      productId: createdProduct.id,
      filePath: image,
    })));

    return createdProduct;
  }
}

export default new ProductService();
