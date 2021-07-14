import HTTPError from '../errors/http-error';
import { IDetailProduct } from '../interfaces/product';
import chatroomQuery from '../query/chatroom.query';
import likedProductQuery from '../query/liked-product.query';
import productImageQuery from '../query/product-image.query';
import productQuery from '../query/product.query';
import townQuery from '../query/town.query';
import { ReadDetailProductsRequest, WriteProductRequest } from '../requests/product.request';
import SelectSQLGenerator from '../utils/select-sql-generator';

class ProductService {
  async findDetail(userId: string | undefined, productId: number): Promise<IDetailProduct> {
    const selectSQLGenerator = new SelectSQLGenerator('product', `product.*, user.id as 'user.id', town.id as 'town.id', town.townName as 'town.townName'`);
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
    selectSQLGenerator.addWhere({
      column: 'product.id',
    });

    const products = await productQuery.select(selectSQLGenerator.generate(), [productId]);
    if (products.length === 0) {
      throw new HTTPError(404, '존재하지 않는 상품');
    }

    const product = products[0];
    const productImages = await productImageQuery.findByProduct(product.id)
    product.productImages = productImages;

    const likeCount = await likedProductQuery.count('SELECT COUNT(*) FROM liked_product WHERE productId = ?', [productId]);
    const chatroomCount = await chatroomQuery.count('SELECT COUNT(*) FROM chat_room WHERE productId = ?', [productId]);

    let isUserLiked = false;
    if (userId !== undefined) {
      const userLikedProduct = await likedProductQuery.findByUserAndProduct(userId, productId);
      isUserLiked = userLikedProduct !== null;
    }

    return {
      ...product,
      isUserLiked,
      likeCount: likeCount,
      chatroomCount: chatroomCount,
    };
  }

  async findDetails(userId: string, options: ReadDetailProductsRequest) {
    const { category, townId, } = options;

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

    const products = await productQuery.select(selectSQLGenerator.generate(), params) as IDetailProduct[];

    await Promise.all(products.map(product => {
      return productImageQuery.findByProduct(product.id)
        .then(productImages => {
          product.productImages = productImages;
          return likedProductQuery.count('SELECT COUNT(*) FROM liked_product WHERE productId = ?', [product.id])
        })
        .then(likeCount => {
          product.likeCount = likeCount;
          return chatroomQuery.count('SELECT COUNT(*) FROM chat_room WHERE productId = ?', [product.id]);
        })
        .then(chatroomCount => {
          product.chatroomCount = chatroomCount;
          if (userId !== undefined) {
            return likedProductQuery.findByUserAndProduct(userId, product.id);
          }
          return null;
        })
        .then((userLiked) => {
          product.isUserLiked = userLiked !== null;
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
