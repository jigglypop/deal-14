import { Request, Response } from 'express';
import { CreateChatroomRequest } from '../requests/chatroom.request';
import chatroomService from '../services/chatroom.service';

class ChatroomController {

  async create(req: Request, res: Response) {
    const createChatroomRequest = new CreateChatroomRequest(req.body);
    await createChatroomRequest.validate();
    await chatroomService.create(createChatroomRequest);

    res.status(200).json({
      message: '채팅방 등록 성공',
    })
  }

}

export default new ChatroomController();