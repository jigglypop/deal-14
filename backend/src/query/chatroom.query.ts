import { RowDataPacket } from 'mysql2';
import ChatRoom from '../models/chat-room';
import BaseQuery from './base.query';

type CreateTypes = {
  productId: number;
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

  async create(data: CreateTypes): Promise<ChatRoom> {
    const now = new Date();
    const insertResult = await this.save(
      `INSERT INTO ${this.tableName} (productId, createdAt, updatedAt) VALUES(?, ?, ?)`,
      [data.productId, now, now]);

    const town = await this.findByPk(insertResult.insertId);
    if (town === null) {
      throw new Error('MySQL 생성 오류');
    }

    return town;
  }

  map(row: RowDataPacket): ChatRoom {
    const chatroom = new ChatRoom();
    chatroom.productId = row.productId;
    chatroom.createdAt = row.createdAt;
    chatroom.updatedAt = row.updatedAt;

    return chatroom;
  }
}

export default new ChatRoomQuery();