import HTTPError from '../errors/http-error';
import chatRoomQuery from '../query/chatroom.query';
import productImageQuery from '../query/product-image.query';
import { CreateChatroomRequest } from "../requests/chatroom.request"
import SelectSQLGenerator from '../utils/select-sql-generator';

class ChatroomService {

  async join(userId: string, productId: number) {
    const chatRoom = await chatRoomQuery.findByUserAndProduct(userId, productId)
    if (chatRoom === null) {
      return chatRoomQuery.create({
        userId,
        productId,
      });
    }

    return chatRoom;
  }

  async findMyChatRooms(userId: string) {
    const sql = `SELECT  chat_room.*, host.id as 'host.id', client.id as 'client.id' FROM chat_room
    LEFT JOIN user as client ON client.id = chat_room.userId
    LEFT JOIN product ON product.id = chat_room.productId
    LEFT JOIN user as host ON product.userId = host.id
    WHERE host.id = ? OR client.id = ?`;

    const chatRooms = await chatRoomQuery.select(sql, [userId, userId]);
    const detailChatRooms = await Promise.all(chatRooms.map(chatRoom => {
      return productImageQuery.findByProduct(chatRoom.productId)
        .then(image => {
          return {
            ...chatRoom,
            productImages: image,
            partnerId: chatRoom.clientId === userId ? chatRoom.hostId : chatRoom.clientId,
          };
        });
    }));

    return detailChatRooms;
  }
}

export default new ChatroomService();
