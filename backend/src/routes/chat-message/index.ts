import { Router } from 'express';
import chatMessageController from '../../controllers/chat-message.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import wrapAsync from '../../middlewares/wrap-async';

const chatMessageRouter = Router();

chatMessageRouter.post('/', authMiddleware, wrapAsync(chatMessageController.create));
chatMessageRouter.get('/', authMiddleware, wrapAsync(chatMessageController.findByChatroomId));

export default chatMessageRouter;
