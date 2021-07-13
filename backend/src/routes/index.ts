import { Router } from 'express';
import authRouter from './auth';
import productRouter from './product'
import townRouter from "./town"

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/product', productRouter);
apiRouter.use('/town', townRouter);

export default apiRouter;
