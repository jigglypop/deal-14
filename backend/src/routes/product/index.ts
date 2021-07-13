import { Router } from 'express';
import productController from '../../controllers/product.controller';
import wrapAsync from '../../middlewares/wrap-async';

const productRouter = Router();

productRouter.get('/read/:productId', wrapAsync(productController.readProduct));
productRouter.post('/write', wrapAsync(productController.writeProduct));

export default productRouter;
