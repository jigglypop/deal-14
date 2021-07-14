import HTTPError from '../errors/http-error';
import likedProductQuery from '../query/liked-product.query';
import productQuery from '../query/product.query';
import userQuery from '../query/user.query';

class LikedProductService {
  async like(userId: string, productId: number) {
    const user = await userQuery.findByPk(userId)
    if (user === null) {
      throw new HTTPError(404, '존재하지 않는 회원의 좋아요');
    }

    const product = await productQuery.findByPk(productId);
    if (product === null) {
      throw new HTTPError(404, '존재하지 않는 상품의 좋아요');
    }

    const duplicateLike = await likedProductQuery.findByUserAndProduct(userId, productId);
    if (duplicateLike !== null) {
      throw new HTTPError(409, '이미 좋아요를 누른 상품');
    }

    await likedProductQuery.create({
      userId,
      productId
    });
  }

  async unlike(userId: string, productId: number) {
    const user = await userQuery.findByPk(userId)
    if (user === null) {
      throw new HTTPError(404, '존재하지 않는 회원의 좋아요');
    }

    const product = await productQuery.findByPk(productId);
    if (product === null) {
      throw new HTTPError(404, '존재하지 않는 상품의 좋아요');
    }

    const existLike = await likedProductQuery.findByUserAndProduct(userId, productId);
    if (existLike === null) {
      throw new HTTPError(409, '좋아요를 누르지 않은 상품');
    }

    await likedProductQuery.delete(existLike.id);
  }
}

export default new LikedProductService();