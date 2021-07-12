import { Router } from 'express';
import sampleController from '../controllers/sample.controller';

const apiRouter = Router();

apiRouter.get('/', sampleController.hello);

export default apiRouter;