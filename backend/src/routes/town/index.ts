import { Router } from 'express';
import townController from '../../controllers/town.controller';
import wrapAsync from '../../middlewares/wrap-async';

const townRouter = Router();

townRouter.post('/create', wrapAsync(townController.createTown));

export default townRouter;
