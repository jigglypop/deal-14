import HTTPError from '../errors/http-error';
import chatroomQuery from '../query/chatroom.query';
// import townQuery from '../query/town.query';
// import { ReadDetailProductsRequest, WriteProductRequest } from '../requests/product.request';
import { CreateChatroomRequest } from "../requests/chatroom.request"

class ChatroomService {

  async create(creaetChatroomRequest: CreateChatroomRequest) {
    const { productId } = creaetChatroomRequest;

    const createChatroom = await chatroomQuery.create({
      productId,
    });
    return createChatroom;
  }
}

export default new ChatroomService();
