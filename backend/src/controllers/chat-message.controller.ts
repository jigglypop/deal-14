import { Request, Response } from 'express';
import chatMessageService from '../services/chat-message.service';
import HTTPError from '../errors/http-error';
import { SendChatMessageRequest } from '../requests/chat-message.request';
import { ReadChatMessageRequest } from '../requests/read-chat-message.request';
import readChatMessageService from '../services/read-chat-message.service';

class ChatMessageController {

  async send(req: Request, res: Response) {
    const { userId, body, params } = req;
    const sendChatMessageRequest = new SendChatMessageRequest(body);
    await sendChatMessageRequest.validate();
    if (isNaN(Number(params.chatRoomId))) {
      throw new HTTPError(400, '채팅방 번호 검증 오류');
    }

    const chatMessage = await chatMessageService.send(userId, Number(params.chatRoomId), sendChatMessageRequest);

    res.status(200).json({
      message: '채팅 등록 성공',
      data: {
        chatMessage,
      },
    });
  }

  async findByChatRoom(req: Request, res: Response) {
    const { userId, params, query } = req;
    if (isNaN(Number(params.chatRoomId))) {
      throw new HTTPError(400, '채팅방 번호 검증 오류');
    }

    const { lastChatMessageId } = query;
    const chatMessages = await chatMessageService.findByChatRoom(userId, Number(params.chatRoomId), lastChatMessageId ? Number(lastChatMessageId) : undefined);

    return res.status(200).json({
      message: '채팅 조회 성공',
      data: {
        chatMessages,
      },
    });
  }

  async read(req: Request, res: Response) {
    const { userId, params, body } = req;
    if (isNaN(Number(params.chatRoomId))) {
      throw new HTTPError(400, '채팅방 번호 검증 오류');
    }

    const readChatMessageRequest = new ReadChatMessageRequest(body);
    await readChatMessageRequest.validate();

    await readChatMessageService.readMessage(userId, Number(params.chatRoomId), readChatMessageRequest);

    res.status(200).json({
      message: '채팅 읽음 성공',
    });
  }

}

export default new ChatMessageController();