import { Router } from 'express';
import chatroomController from '../../controllers/chatroom.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import wrapAsync from '../../middlewares/wrap-async';

const chatroomRouter = Router();

chatroomRouter.post('/', authMiddleware, wrapAsync(chatroomController.create));
chatroomRouter.get('/:productId', authMiddleware, wrapAsync(chatroomController.findByProduct));

export default chatroomRouter;
