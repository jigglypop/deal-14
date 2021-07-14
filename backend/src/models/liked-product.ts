import Product from './product';
import User from './user';

class LikedProduct {
  id!: number;
  productId!: string;
  userId!: string;
  product!: Product;
  user!: User;
}

export default LikedProduct;
