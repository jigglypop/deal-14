import { Request, Response } from 'express';
import HTTPError from '../errors/http-error';
import chatRoomService from '../services/chat-room.service';

class ChatRoomController {

  async join(req: Request, res: Response) {
    const { userId, params } = req;
    if (isNaN(Number(params.productId))) {
      throw new HTTPError(400, '상품 번호 검증 오류');
    }

    const chatRoom = await chatRoomService.join(userId, Number(params.productId));

    res.status(200).json({
      message: '채팅 가입 성공',
      data: {
        chatRoom,
      }
    });
  }

  async leave(req: Request, res: Response) {
    const { userId, params } = req;
    if (isNaN(Number(params.chatRoomId))) {
      throw new HTTPError(400, '상품 번호 검증 오류');
    }

    await chatRoomService.leave(userId, Number(params.chatRoomId));

    res.status(200).json({
      message: '채팅 나가기 성공',
    });
  }

  async findMyChatRooms(req: Request, res: Response) {
    const { userId } = req;
    const chatRooms = await chatRoomService.findMyChatRooms(userId);

    res.status(200).json({
      data: {
        chatRooms,
      }
    });
  }

  async findById(req: Request, res: Response) {
    const { userId, params } = req;
    if (isNaN(Number(params.chatRoomId))) {
      throw new HTTPError(400, '채팅방 번호 검증 오류');
    }

    const chatRoom = await chatRoomService.findChatRoom(Number(params.chatRoomId), userId);

    res.status(200).json({
      message: '채팅방 조회 생성',
      data: {
        chatRoom,
      },
    });
  }
}

export default new ChatRoomController();