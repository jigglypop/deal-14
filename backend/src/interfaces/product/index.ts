import Categories from '../../enum/category.enum';
import ChatRoom from '../../models/chat-room';
import LikedProduct from '../../models/liked-product';
import ProductImage from '../../models/product-image';
import Town from '../../models/town';
import User from '../../models/user';

export interface IDetailProduct {
  id: number;
  title: string;
  price: number;
  isSoldOut: boolean;
  content: string;
  category: Categories;
  userId: string;
  townId: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  productImages?: ProductImage[];
  likedProducts?: LikedProduct[];
  chatRooms?: ChatRoom[];
  town?: Town;
  isUserLiked: boolean;
  likeCount: number;
  chatroomCount: number;
}
