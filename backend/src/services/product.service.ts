import { Op } from 'sequelize';
import Categories from '../enum/category.enum';
import ChatRoom from '../models/chat-room';
import LikedProduct from '../models/liked-product';
import Product from '../models/product';
import User from '../models/user';
import UserTown from '../models/user-town';

type FindOptions = {
  category?: Categories;
  town?: string;
}

class ProductService {
  async findDetailList(options: FindOptions): Promise<Product[]> {
    const { category, town } = options;

    const categoryCondition = category !== undefined ? { category } : {};
    const townCondition = town !== undefined ? {
      [`$user.userTowns.townName$`]: {
        [Op.substring]: town,
      }
    } : {};

    const products = await Product.findAll({
      where: {
        ...categoryCondition,
        ...townCondition
      },
      include: [
        {
          model: User,
          include: [{
            model: UserTown,
          }],
        },
        {
          model: LikedProduct,
        },
        {
          model: ChatRoom,
        }
      ],
      nest: true,
    });

    return products;
  }
}

export default new ProductService();
