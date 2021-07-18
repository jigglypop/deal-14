import HTTPError from '../errors/http-error';
import chatMessageQuery from '../query/chat-message.query';
import { CreateChatmessageRequest } from "../requests/chatmessage.request"

class ChatMessageService {

  async create(creaetChatmessageRequest: CreateChatmessageRequest) {
    const { chatroomId, userId, content } = creaetChatmessageRequest;

    const createChatmessage = await chatMessageQuery.create({
      chatroomId,
      userId,
      content
    });
    if (!createChatmessage) {
      throw new HTTPError(500, "채팅룸 생성 실패")
    }
    return createChatmessage;
  }

  async findByChatrommId(chatrommId: string) {
    const findChatrooms = await chatMessageQuery.findByChatroomId(chatrommId)

    return findChatrooms
  }
}

export default new ChatMessageService();
