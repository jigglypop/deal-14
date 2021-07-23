import { NextFunction, Request, Response } from 'express-serve-static-core';
import multer from 'multer';
import path from 'path';
import HTTPError from '../errors/http-error';
import generateUUID from '../utils/generateUUID';

const INVALID_FILE_TYPE_ERR = 'Invalid file type';
const UNEXPECTED_FIELD_ERR = 'Unexpected field';
const FILE_TOO_LARGE_ERR = 'File too large';

const allowedFileTypes = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif',
];

const FILE_MAX_SIZE = 1000000;

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(INVALID_FILE_TYPE_ERR));
    }
  },
  limits: {
    fileSize: FILE_MAX_SIZE,
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../public/files'));
    },
    filename: (req, file, cb) => {
      const extname = path.extname(file.originalname);
      cb(null, `${Date.now()}_${generateUUID()}${extname}`);
    },
  })
}).array('recfiles');

const multerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (error) => {
    if (error) {
      console.log(error)
      switch (error.message) {
        case INVALID_FILE_TYPE_ERR:
          next(new HTTPError(400, '옳지 않은 파일 타입'));
          break;

        case UNEXPECTED_FIELD_ERR:
          next(new HTTPError(400, '옳지 않은 필드'));
          break;

        case FILE_TOO_LARGE_ERR:
          next(new HTTPError(413, '파일 크기 초과'));
          break;

        default:
          next(error);
      }
    } else {
      next();
    }
  })
}

export default multerMiddleware;
