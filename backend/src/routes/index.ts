import { Router } from 'express';
import authRouter from './auth';
import productRouter from './product'
import townRouter from "./town"
import uploadRouter from './upload';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/product', productRouter);
apiRouter.use('/town', townRouter);
apiRouter.use('/upload', uploadRouter);

export default apiRouter;
