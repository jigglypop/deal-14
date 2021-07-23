import HTTPError from '../errors/http-error';
import chatMessageQuery from '../query/chat-message.query';
import readChatMessageQuery from '../query/read-chat-message.query';
import { ReadChatMessageRequest } from '../requests/read-chat-message.request';
import chatRoomService from './chat-room.service';

class ReadChatMessageService {
  async readMessage(userId: string, chatRoomId: number, readChatMessageRequest: ReadChatMessageRequest) {
    const { chatMessageId } = readChatMessageRequest;
    const chatMessage = await chatMessageQuery.findByPk(chatMessageId);
    if (chatMessage === null) {
      throw new HTTPError(404, '채팅 메시지 없음');
    }

    const chatRoom = await chatRoomService.findChatRoom(chatRoomId, userId);
    if (chatRoom === null) {
      throw new HTTPError(404, '채팅방 없음');
    }

    if (chatMessage.chatRoomId !== chatRoom.id) {
      throw new HTTPError(400, '옳지 않은 채팅 정보');
    }

    const readChatMessage = await readChatMessageQuery.findByUserAndChatRoom(userId, chatRoomId);
    if (readChatMessage === null) {
      await readChatMessageQuery.create({
        chatRoomId,
        userId,
        chatMessageId,
      });
    } else {
      await readChatMessageQuery.executeQuery(`UPDATE read_chat_message SET chatMessageId = ? WHERE id = ?`, [chatMessageId, readChatMessage.id]);
    }
  }
}

export default new ReadChatMessageService();