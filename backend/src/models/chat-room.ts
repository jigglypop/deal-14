type ChatRoomProductTypes = {
  title: string;
  price: number;
  isSoldOut: string;
}

type RecentMessageTypes = {
  content: string | null;
  createdAt: Date | null;
}

class ChatRoom {
  id!: number;
  productId!: number;
  clientId!: string;
  createdAt!: Date;
  updatedAt!: Date;
  hostId!: string;
  product!: ChatRoomProductTypes;
  recentMessage?: RecentMessageTypes
}

export default ChatRoom;