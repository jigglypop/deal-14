import Product from './product';

type ChatRoomProduct = {
  title: string;
  price: number;
  isSoldOut: string;
}

class ChatRoom {
  id!: number;
  productId!: number;
  clientId!: string;
  createdAt!: Date;
  updatedAt!: Date;
  hostId!: string;
  product!: ChatRoomProduct;
}

export default ChatRoom;
