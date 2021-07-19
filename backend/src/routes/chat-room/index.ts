import { Router } from 'express';
import chatroomController from '../../controllers/chat-room.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import wrapAsync from '../../middlewares/wrap-async';

const chatRoomRouter = Router();

chatRoomRouter.post('/join/:productId', authMiddleware, wrapAsync(chatroomController.join));
chatRoomRouter.get('/my', authMiddleware, wrapAsync(chatroomController.findMyChatRooms));
chatRoomRouter.get('/:chatRoomId', authMiddleware, wrapAsync(chatroomController.findById));
chatRoomRouter.delete('/leave/:chatRoomId', authMiddleware, wrapAsync(chatroomController.leave));

export default chatRoomRouter;