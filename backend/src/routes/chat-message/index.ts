import { Router } from 'express';
import chatMessageController from '../../controllers/chat-message.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import wrapAsync from '../../middlewares/wrap-async';

const chatMessageRouter = Router();

chatMessageRouter.post('/:chatRoomId', authMiddleware, wrapAsync(chatMessageController.send));
chatMessageRouter.get('/:chatRoomId', authMiddleware, wrapAsync(chatMessageController.findByChatRoom));

export default chatMessageRouter;
