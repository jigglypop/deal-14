import { RowDataPacket } from 'mysql2';
import ChatRoom from '../models/chat-room';
import BaseQuery from './base.query';

type CreateTypes = {
  productId: number;
  userId: string;
}

class ChatRoomQuery extends BaseQuery<ChatRoom, number, CreateTypes> {
  constructor() {
    super('chat_room');
  }

  async findByPk(id: number): Promise<ChatRoom | null> {
    const chatroom = await this.select(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
    if (chatroom.length === 0) {
      return null;
    }

    return chatroom[0];
  }

  async findByProduct(productId: string): Promise<ChatRoom | null> {
    const chatRooms = await this.select(`SELECT * FROM ${this.tableName} WHERE productId = ?`, [productId]);
    if (chatRooms.length === 0) {
      return null;
    }

    return chatRooms[0];
  }

  async findByUserAndProduct(userId: string, productId: number): Promise<ChatRoom | null> {
    const chatRooms = await this.select(`SELECT * FROM ${this.tableName} WHERE userId = ? AND productId = ?`,
      [userId, productId]);
    if (chatRooms.length === 0) {
      return null;
    }

    return chatRooms[0];
  }

  async create(data: CreateTypes): Promise<ChatRoom> {
    const now = new Date();
    const insertResult = await this.save(
      `INSERT INTO ${this.tableName} (productId, userId, createdAt, updatedAt) VALUES(?, ?, ?, ?)`,
      [data.productId, data.userId, now, now]);

    const chatRoom = await this.findByPk(insertResult.insertId);
    if (chatRoom === null) {
      throw new Error('MySQL 생성 오류');
    }

    return chatRoom;
  }

  async remove(chatRoomId: number): Promise<void> {
    await this.executeQuery(`DELETE FROM ${this.tableName} WHERE id = ?`, [chatRoomId]);
  }

  map(row: RowDataPacket): ChatRoom {
    const chatroom = new ChatRoom();
    chatroom.id = row.id;
    chatroom.productId = row.productId;
    chatroom.product = {
      title: row['product.title'],
      price: row['product.price'],
      isSoldOut: row['product.isSoldOut'],
    }
    chatroom.hostId = row['host.id'];
    chatroom.clientId = row['client.id'];
    chatroom.createdAt = row.createdAt;
    chatroom.updatedAt = row.updatedAt;
    chatroom.recentMessage = {
      content: row['chat_message.content'],
      createdAt: row['chat_message.createdAt'],
    }

    return chatroom;
  }
}

export default new ChatRoomQuery();