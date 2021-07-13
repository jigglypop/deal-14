import { Router } from 'express';
import initialize from '../controllers/init.controller';
import authRouter from './auth';
import productRouter from './product'
import townRouter from "./town"
import chatroomRouter from "./chatroom"

const apiRouter = Router();

apiRouter.use('/', initialize)
apiRouter.use('/auth', authRouter);
apiRouter.use('/product', productRouter);
apiRouter.use('/town', townRouter);
apiRouter.use('/chatroom', chatroomRouter);

export default apiRouter;
