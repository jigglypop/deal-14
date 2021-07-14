import { RowDataPacket } from 'mysql2';
import ChatMessage from '../models/chat-message';
import BaseQuery from './base.query';

type CreateTypes = {
  chatroomId: number;
  userId: string;
  content: string;
}

class ChatMessageQuery extends BaseQuery<ChatMessage, number, CreateTypes> {
  constructor() {
    super('chat_message');
  }

  async findByPk(id: number): Promise<ChatMessage | null> {
    const chatmessage = await this.select(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
    if (chatmessage.length === 0) {
      return null;
    }

    return chatmessage[0];
  }

  async findByChatroomId(chatroomId: string): Promise<ChatMessage[]> {
    const chatRooms = await this.select(`SELECT * FROM ${this.tableName} WHERE chatroomId = ?`, [chatroomId]);

    return chatRooms;
  }

  async create(data: CreateTypes): Promise<ChatMessage> {
    const now = new Date();
    const insertResult = await this.save(
      `INSERT INTO ${this.tableName} (chatroomId, userId, content, createdAt, updatedAt) VALUES(?, ?, ?, ?, ?)`,
      [data.chatroomId, data.userId, data.content, now, now]);

    const message = await this.findByPk(insertResult.insertId);
    if (message === null) {
      throw new Error('MySQL 생성 오류');
    }

    return message;
  }

  map(row: RowDataPacket): ChatMessage {
    const chatmessage = new ChatMessage();
    chatmessage.chatroomId = row.chatroomId;
    chatmessage.userId = row.userId;
    chatmessage.content = row.content;
    chatmessage.createdAt = row.createdAt;
    chatmessage.updatedAt = row.updatedAt;

    return chatmessage;
  }
}

export default new ChatMessageQuery();