import { Router } from 'express';
import authRouter from './auth';
import productRouter from './product'
import townRouter from "./town"
import chatroomRouter from "./chatroom"
import chatmessageRouter from "./chatmessage"
import uploadRouter from './upload';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/product', productRouter);
apiRouter.use('/town', townRouter);
apiRouter.use('/chatroom', chatroomRouter);
apiRouter.use('/chatmessage', chatmessageRouter);
apiRouter.use('/upload', uploadRouter);

export default apiRouter;
