import Product from './product';
import User from './user';

class LikedProduct {
  id!: number;
  productId!: number;
  userId!: string;
  product!: Product;
  user!: User;
  createdAt!: Date;
  updatedAt!: Date;
}

export default LikedProduct;
