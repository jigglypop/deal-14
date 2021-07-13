import Product from './product';
import User from './user';

export interface IChatRoom {
  productId: string;
  userId: string;
}

class ChatRoom {
  productId!: string;
  product!: Product;
  userId!: string;
  user!: User;
}

export default ChatRoom;
