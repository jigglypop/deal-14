import Product from './product';
import User from './user';

class LikedProduct {
  productId!: string;
  userId!: string;
  product!: Product;
  user!: User;
}

export default LikedProduct;
