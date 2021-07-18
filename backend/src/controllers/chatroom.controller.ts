import { Request, Response } from 'express';
import HTTPError from '../errors/http-error';
import chatroomService from '../services/chatroom.service';

class ChatRoomController {

  async join(req: Request, res: Response) {
    const { userId, params } = req;
    if (isNaN(Number(params.productId))) {
      throw new HTTPError(400, '상품 번호 검증 오류');
    }

    const chatRoom = await chatroomService.join(userId, Number(params.productId));

    res.status(200).json({
      message: '채팅 가입 성공',
      data: {
        chatRoom,
      }
    });
  }

  async findMyChatRooms(req: Request, res: Response) {
    const { userId } = req;
    const chatRooms = await chatroomService.findMyChatRooms(userId);

    res.status(200).json({
      data: {
        chatRooms,
      }
    })
  }
}

export default new ChatRoomController();