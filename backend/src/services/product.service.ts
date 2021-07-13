import Categories from '../enum/category.enum';
import HTTPError from '../errors/http-error';
import productQuery from '../query/product.query';
import townQuery from '../query/town.query';
import { WriteProductRequest } from '../requests/product.request';

type FindOptions = {
  category?: Categories;
  town?: string;
}

class ProductService {
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
  }
}

export default new ProductService();
