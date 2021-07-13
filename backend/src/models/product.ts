import Categories from '../enum/category.enum';
import ChatRoom from './chat-room';
import LikedProduct from './liked-product';
import Town from './town';
import User from './user';

class Product {
  id!: number;
  title!: string;
  price!: number;
  isSoldOut!: boolean;
  content!: string;
  category!: Categories;
  userId!: string;
  townId!: number;
  user!: User;
  likedProducts!: LikedProduct[];
  chatRooms!: ChatRoom[];
  town!: Town;
}

export default Product;
