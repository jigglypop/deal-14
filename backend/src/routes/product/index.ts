import { Router } from 'express';
import likedProductController from '../../controllers/liked-product.controller';
import productController from '../../controllers/product.controller';
import accessAuthMiddleware from '../../middlewares/access-auth.middleware';
import authMiddleware from '../../middlewares/auth.middleware';
import wrapAsync from '../../middlewares/wrap-async';

const productRouter = Router();

productRouter.get('/', accessAuthMiddleware, wrapAsync(productController.readDetails));
productRouter.get('/liked', authMiddleware, wrapAsync(productController.readLikedDetails));
productRouter.post('/', authMiddleware, wrapAsync(productController.write));

productRouter.get('/:productId', accessAuthMiddleware, wrapAsync(productController.readDetail));

productRouter.post('/like/:productId', authMiddleware, wrapAsync(likedProductController.like));
productRouter.post('/unlike/:productId', authMiddleware, wrapAsync(likedProductController.unlike));


export default productRouter;