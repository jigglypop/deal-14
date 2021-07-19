import { Router } from 'express';
import authRouter from './auth';
import productRouter from './product'
import townRouter from "./town"
import chatRoomRouter from "./chat-room"
import uploadRouter from './upload';
import chatMessageRouter from './chat-message';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/product', productRouter);
apiRouter.use('/town', townRouter);
apiRouter.use('/chat-room', chatRoomRouter);
apiRouter.use('/chat-message', chatMessageRouter);
apiRouter.use('/upload', uploadRouter);

export default apiRouter;
