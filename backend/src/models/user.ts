import ChatRoom from './chat-room';
import LikedProduct from './liked-product';
import Product from './product';
import UserTown from './user-town';

class User {
  id!: string;
  userTowns?: UserTown[];
  products?: Product[];
  likedProducts?: LikedProduct[];
  chatRooms?: ChatRoom[];
  createdAt!: Date;
  updatedAt!: Date;
}

export default User;
