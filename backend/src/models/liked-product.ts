import Product from './product';
import User from './user';

class LikedProduct {
  productId!: string;
  product!: Product;
  userId!: string;
  user!: User;
}

export default LikedProduct;
