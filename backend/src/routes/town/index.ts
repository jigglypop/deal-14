import { Router } from 'express';
import userTownController from '../../controllers/user-town.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import wrapAsync from '../../middlewares/wrap-async';

const townRouter = Router();

townRouter.get('/my', authMiddleware, wrapAsync(userTownController.findMyTowns));
townRouter.post('/my', authMiddleware, wrapAsync(userTownController.registerUserTown));
townRouter.delete('/my/:userTownId', authMiddleware, wrapAsync(userTownController.removeUserTown));

export default townRouter;
