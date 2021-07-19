import chatMessageQuery from '../query/chat-message.query';
import { SendChatMessageRequest } from '../requests/chat-message.request';
import chatRoomService from './chat-room.service';

class ChatMessageService {

  async send(userId: string, chatRoomId: number, sendChatMessageRequest: SendChatMessageRequest) {
    const { content } = sendChatMessageRequest;
    const chatRoom = await chatRoomService.findChatRoom(chatRoomId, userId);

    const createdChatMessage = await chatMessageQuery.create({
      chatRoomId: chatRoom.id,
      userId,
      content,
    });

    return createdChatMessage;
  }

  async findByChatRoom(userId: string, chatRoomId: number, chatMessageId?: number) {
    const chatRoom = await chatRoomService.findChatRoom(chatRoomId, userId);

    if (chatMessageId === undefined) {
      return chatMessageQuery.findByChatRoom(chatRoom.id);
    }

    return chatMessageQuery.findByChatRoomAfterThan(chatRoom.id, chatMessageId);
  }
}

export default new ChatMessageService();
