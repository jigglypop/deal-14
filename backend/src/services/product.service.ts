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
}

export default new ProductService();
