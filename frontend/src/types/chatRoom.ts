import { ProductImageTypes } from './productImage'

export type SpecificChatRoomTypes = {
  id: number;
  productId: number;
  product: {
    id: number;
    title: string;
    price: number | null;
    isSoldOut: number;
  }
  hostId: string;
  clientId: string;
  createdAt: string;
  updatedAt: string;
  productImages: ProductImageTypes[];
  partnerId: string;
}


export type ChatRoomTypes = SpecificChatRoomTypes & {
  recentMessage: {
    content: string;
    createdAt: string;
  },
  newMessageCount: number;
}