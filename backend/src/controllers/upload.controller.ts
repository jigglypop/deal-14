import { Request, Response } from 'express';
import HTTPError from '../errors/http-error';

class UploadController {
  upload(req: Request, res: Response) {
    const files: string[] = [];

    if (req.body.files instanceof Array) {
      req.body.files.forEach((file: any) => {
        files.push(`http://localhost:3000/static/files/${file.filename}`);
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