import { Router } from 'express';
import chatroomController from '../../controllers/chatroom.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import wrapAsync from '../../middlewares/wrap-async';

const chatroomRouter = Router();

chatroomRouter.post('/join/:productId', authMiddleware, wrapAsync(chatroomController.join));
chatroomRouter.get('/my', authMiddleware, wrapAsync(chatroomController.findMyChatRooms));

export default chatroomRouter;
