import { Request, Response } from 'express';
import HTTPError from '../errors/http-error';
import dotenv from '../config/dotenv';

class UploadController {
  upload(req: Request, res: Response) {
    const files: string[] = [];

    if (req.files instanceof Array) {
      req.files.forEach((file: any) => {
        files.push(`${dotenv.SERVER_URL}/files/${file.filename}`);
      });

      res.status(200).json({
        message: '파일 업로드 성공',
        data: {
          files,
        },
      });
    } else {
      throw new HTTPError(400, '파일 업로드 검증 오류');
    }
  }
}

export default new UploadController();