import HTTPError from '../errors/http-error';
import ProductImage from '../models/product-image';
import chatMessageQuery from '../query/chat-message.query';
import chatRoomQuery from '../query/chat-room.query';
import productImageQuery from '../query/product-image.query';
import productQuery from '../query/product.query';
import readChatMessageQuery from '../query/read-chat-message.query';

class ChatroomService {

  async join(userId: string, productId: number) {
    const product = await productQuery.findByPk(productId);
    if (product === null) {
      throw new HTTPError(404, '채팅방 없음');
    }

    const chatRoom = await chatRoomQuery.findByUserAndProduct(userId, productId)
    if (chatRoom === null) {
      return chatRoomQuery.create({
        userId,
        productId,
      });
    }

    return chatRoom;
  }

  async leave(userId: string, chatRoomId: number) {
    const chatRoom = await this.findChatRoom(chatRoomId, userId);
    await chatRoomQuery.remove(chatRoom.id);
  }

  async findMyChatRooms(userId: string) {
    const sql = `SELECT
    chat_room.*,
    host.id as 'host.id',
    client.id as 'client.id',
    chat_message.content as 'chat_message.content',
    chat_message.createdAt as 'chat_message.createdAt'
    FROM chat_room
    LEFT JOIN user as client ON client.id = chat_room.userId
    LEFT JOIN product ON product.id = chat_room.productId
    LEFT JOIN user as host ON product.userId = host.id
    LEFT JOIN chat_message ON chat_message.id = (
      SELECT c.id FROM chat_message as c WHERE c.chatRoomId = chat_room.id ORDER BY createdAt DESC LIMIT 1
    )
    WHERE host.id = ? OR client.id = ?
    ORDER BY chat_message.createdAt DESC`;

    const chatRooms = await chatRoomQuery.select(sql, [userId, userId]);
    const detailChatRooms = await Promise.all(chatRooms.map(chatRoom => {
      let image: ProductImage[] = [];
      return productImageQuery.findByProduct(chatRoom.productId)
        .then(image => {
          image = image;

          return readChatMessageQuery.select(
            `SELECT * FROM read_chat_message WHERE userId = ? AND chatRoomId = ? LIMIT 1`, [userId, chatRoom.id]);
        })
        .then(lastReadChatMessage => {
          let chatMessageId = 0;
          if (lastReadChatMessage.length > 0) {
            chatMessageId = lastReadChatMessage[0].chatMessageId;
          }

          return chatMessageQuery.count(`
          SELECT COUNT(*) FROM chat_message WHERE id > ? AND chatRoomId = ?`, [chatMessageId, chatRoom.id]);
        })
        .then(count => {
          return {
            ...chatRoom,
            productImages: image,
            partnerId: chatRoom.clientId === userId ? chatRoom.hostId : chatRoom.clientId,
            newMessageCount: count,
          };
        })
    }));

    return detailChatRooms;
  }

  async findChatRoom(chatRoomId: number, userId: string) {
    const sql = `SELECT
    chat_room.*, host.id as 'host.id', client.id as 'client.id',
    product.title as 'product.title', product.price as 'product.price', product.isSoldOut as 'product.isSoldOut'
    FROM chat_room
    LEFT JOIN user as client ON client.id = chat_room.userId
    LEFT JOIN product ON product.id = chat_room.productId
    LEFT JOIN user as host ON product.userId = host.id
    WHERE chat_room.id = ?`;

    const chatRooms = await chatRoomQuery.select(sql, [chatRoomId]);

    if (chatRooms.length === 0) {
      throw new HTTPError(404, '채팅방 없음');
    }

    const [chatRoom] = chatRooms;
    if (chatRoom.clientId !== userId && chatRoom.hostId !== userId) {
      throw new HTTPError(403, '본인의 채팅방만 조회 가능');
    }

    const productImages = await productImageQuery.findByProduct(chatRoom.productId);

    return {
      ...chatRoom,
      productImages,
      partnerId: chatRoom.clientId === userId ? chatRoom.hostId : chatRoom.clientId,
    };
  }
}

export default new ChatroomService();