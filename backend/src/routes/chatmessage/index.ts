import { Router } from 'express';
import chatmessageController from '../../controllers/charmessage.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import wrapAsync from '../../middlewares/wrap-async';

const chatmessageRouter = Router();

chatmessageRouter.post('/', authMiddleware, wrapAsync(chatmessageController.create));
chatmessageRouter.get('/', authMiddleware, wrapAsync(chatmessageController.findByChatroomId));

export default chatmessageRouter;
