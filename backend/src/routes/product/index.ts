import { Router } from 'express';
import productController from '../../controllers/product.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import wrapAsync from '../../middlewares/wrap-async';

const productRouter = Router();

productRouter.post('/', authMiddleware, wrapAsync(productController.write));
productRouter.get('/', authMiddleware, wrapAsync(productController.readDetails));

export default productRouter;
