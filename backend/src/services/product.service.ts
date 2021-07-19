import HTTPError from '../errors/http-error';
import { IDetailProduct } from '../interfaces/product';
import chatroomQuery from '../query/chat-room.query';
import likedProductQuery from '../query/liked-product.query';
import productImageQuery from '../query/product-image.query';
import productQuery from '../query/product.query';
import townQuery from '../query/town.query';
import { ReadDetailProductsRequest, WriteProductRequest } from '../requests/product.request';
import SelectSQLGenerator from '../utils/select-sql-generator';

class ProductService {
  private async fetchDetail(userId: string | undefined, productId: number) {
    const productImages = await productImageQuery.findByProduct(productId)

    const likeCount = await likedProductQuery.count('SELECT COUNT(*) FROM liked_product WHERE productId = ?', [productId]);
    const chatroomCount = await chatroomQuery.count('SELECT COUNT(*) FROM chat_room WHERE productId = ?', [productId]);

    let isUserLiked = false;
    if (userId !== undefined) {
      const userLikedProduct = await likedProductQuery.findByUserAndProduct(userId, productId);
      isUserLiked = userLikedProduct !== null;
    }

    return {
      productImages,
      likeCount,
      chatroomCount,
      isUserLiked,
    };
  }

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
    const details = await this.fetchDetail(userId, productId);

    return {
      ...product,
      ...details,
    };
  }

  async findDetails(userId: string, options: ReadDetailProductsRequest) {
    const { category, townId, } = options;

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

    const productsWithDetails = await Promise.all(products.map(product => {
      return this.fetchDetail(userId, product.id)
        .then(details => {

          return {
            ...details,
            ...product,
          }
        });
    }));

    productsWithDetails.sort(function (a, b) {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    return productsWithDetails;
  }

  async findLiked(userId: string) {
    const likedProducts = await likedProductQuery.findAllByUser(userId);
    const products = await Promise.all(likedProducts.map(likedProduct => {
      return this.findDetail(userId, likedProduct.productId);
    }));

    return products;
  }

  async findUserProducts(userId: string) {
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
      column: 'product.userId'
    })

    const products = await productQuery.select(selectSQLGenerator.generate(), [userId]) as IDetailProduct[];

    const productsWithDetails = await Promise.all(products.map(product => {
      return this.fetchDetail(userId, product.id)
        .then(details => {

          return {
            ...details,
            ...product,
          }
        });
    }));

    return productsWithDetails;
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
