import { Router } from 'express';
import likedProductController from '../../controllers/liked-product.controller';
import productController from '../../controllers/product.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import wrapAsync from '../../middlewares/wrap-async';

const productRouter = Router();

productRouter.post('/', authMiddleware, wrapAsync(productController.write));
productRouter.get('/', authMiddleware, wrapAsync(productController.readDetails));
productRouter.post('/like/:productId', authMiddleware, wrapAsync(likedProductController.like));
productRouter.post('/unlike/:productId', authMiddleware, wrapAsync(likedProductController.unlike));

export default productRouter;