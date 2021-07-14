import HTTPError from '../errors/http-error';
import chatmessageQuery from '../query/chatmessage.query';
import { CreateChatmessageRequest } from "../requests/chatmessage.request"

class ChatmessageService {

  async create(creaetChatmessageRequest: CreateChatmessageRequest) {
    const { chatroomId, userId, content } = creaetChatmessageRequest;

    const createChatmessage = await chatmessageQuery.create({
      chatroomId,
      userId,
      content
    });
    if (!createChatmessage ) {
      throw new HTTPError(500, "채팅룸 생성 실패")
    }
    return createChatmessage;
  }

  async findByChatrommId(chatrommId: string) {
    const findChatrooms = await chatmessageQuery.findByChatroomId(chatrommId)
    
    return findChatrooms
  }
}

export default new ChatmessageService();
