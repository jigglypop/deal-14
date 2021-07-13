import { Router } from 'express';
import initialize from '../controllers/init.controller';
import authRouter from './auth';
import productRouter from './product'
import townRouter from "./town"

const apiRouter = Router();

apiRouter.use('/', initialize)
apiRouter.use('/auth', authRouter);
apiRouter.use('/product', productRouter);
apiRouter.use('/town', townRouter);

export default apiRouter;
