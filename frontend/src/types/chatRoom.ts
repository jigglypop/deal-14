import { ProductImageTypes } from './productImage';

export type SpecificChatRoomTypes = {
  id: number;
  productId: number;
  product: {
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