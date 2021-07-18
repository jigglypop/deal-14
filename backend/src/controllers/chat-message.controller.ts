import { Request, Response } from 'express';
import chatMessageService from '../services/chat-message.service';
import { CreateChatmessageRequest } from '../requests/chatmessage.request';
import { Socket } from 'socket.io';
import HTTPError from '../errors/http-error';

class ChatmesssageController {

  async create(req: Request, res: Response) {
    const createChatmesssageRequest = new CreateChatmessageRequest(req.body);
    await chatMessageService.create(createChatmesssageRequest);

    res.status(200).json({
      message: '채팅 등록 성공',
    })
  }

  async chatSocket(socket: Socket, io: any) {

    socket.on('chat message', async (chatroomId: number, userId: string, content: string) => {
      await socket.join(chatroomId.toString())
      const createChatmesssageRequest = new CreateChatmessageRequest({ chatroomId, userId, content });
      await chatMessageService.create(createChatmesssageRequest);
      const messages = await chatMessageService.findByChatrommId(chatroomId.toString())
      if (!messages) {
        throw new HTTPError(500, "채팅 메세지 생성 실패")
      }
      await io.to(chatroomId).emit('chat message', content, chatroomId, messages)
    })
    // 채팅 가져오기
    socket.on('get chat', async (chatroomId) => {
      await socket.join(chatroomId.toString())
      const messages = await chatMessageService.findByChatrommId(chatroomId)
      await io.to(chatroomId).emit('get chat', messages)
    })

    // 채팅 나가기
    socket.on('leave chat', async (chatroomId) => {
      await socket.leave(chatroomId.toString())
    })
  }


  async findByChatroomId(req: Request, res: Response) {
    const { chatroomId } = req.body
    const chatmessages = await chatMessageService.findByChatrommId(chatroomId);

    res.status(200).json({
      data: {
        chatroomId: chatroomId,
        chatmessages: chatmessages
      }
    })
  }
}

export default new ChatmesssageController();