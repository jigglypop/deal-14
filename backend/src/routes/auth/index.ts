import { Router } from 'express';
import authController from '../../controllers/auth.controller';
import wrapAsync from '../../middlewares/wrap-async';

const authRouter = Router();

authRouter.post('/login', wrapAsync(authController.login));
authRouter.post('/register', wrapAsync(authController.register));
authRouter.get('/check', wrapAsync(authController.check));

export default authRouter;
