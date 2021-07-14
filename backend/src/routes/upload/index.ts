import { Router } from 'express';
import uploadController from '../../controllers/upload.controller';
import multerMiddleware from '../../middlewares/multer.middleware';

const uploadRouter = Router();

uploadRouter.post('/', multerMiddleware, uploadController.upload);

export default uploadRouter;
