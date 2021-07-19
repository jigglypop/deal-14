import { Router } from 'express';
import likedProductController from '../../controllers/liked-product.controller';
import productController from '../../controllers/product.controller';
import accessAuthMiddleware from '../../middlewares/access-auth.middleware';
import authMiddleware from '../../middlewares/auth.middleware';
import wrapAsync from '../../middlewares/wrap-async';

const productRouter = Router();

productRouter.get('/', accessAuthMiddleware, wrapAsync(productController.readDetails));
productRouter.get('/liked', authMiddleware, wrapAsync(productController.readLikedDetails));
productRouter.get('/my', authMiddleware, wrapAsync(productController.readMine));
productRouter.post('/', authMiddleware, wrapAsync(productController.write));

productRouter.get('/:productId', accessAuthMiddleware, wrapAsync(productController.readDetail));

productRouter.post('/like/:productId', authMiddleware, wrapAsync(likedProductController.like));
productRouter.post('/unlike/:productId', authMiddleware, wrapAsync(likedProductController.unlike));

productRouter.put('/:productId', authMiddleware, wrapAsync(productController.modify));
productRouter.delete('/:productId', authMiddleware, wrapAsync(productController.remove));


export default productRouter;