import HTTPError from '../errors/http-error';
import chatroomQuery from '../query/chatroom.query';
import { CreateChatroomRequest } from "../requests/chatroom.request"

class ChatroomService {

  async create(creaetChatroomRequest: CreateChatroomRequest) {
    const { productId, userId } = creaetChatroomRequest;

    const createChatroom = await chatroomQuery.create({
      productId,
      userId
    });
    if (!createChatroom) {
      throw new HTTPError(500, "채팅룸 생성 실패")
    }
    return createChatroom;
  }

  async findByProductId(productId: string) {
    const findChatrooms = await chatroomQuery.findByProduct(productId)
    
    return findChatrooms
  }
}

export default new ChatroomService();
