import { RowDataPacket } from 'mysql2';
import ChatMessage from '../models/chat-message';
import BaseQuery from './base.query';

type CreateTypes = {
  chatRoomId: number;
  userId: string;
  content: string;
}

class ChatMessageQuery extends BaseQuery<ChatMessage, number, CreateTypes> {
  constructor() {
    super('chat_message');
  }

  async findByPk(id: number): Promise<ChatMessage | null> {
    const chatMessages = await this.select(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
    if (chatMessages.length === 0) {
      return null;
    }

    return chatMessages[0];
  }

  async findByChatRoom(chatRoomId: number): Promise<ChatMessage[]> {
    const chatRooms = await this.select(`SELECT * FROM ${this.tableName} WHERE chatRoomId = ?`, [chatRoomId]);

    return chatRooms;
  }

  async findByChatRoomAfterThan(chatRoomId: number, chatMessageId: number): Promise<ChatMessage[]> {
    const chatMessages = await this.select(`SELECT * FROM ${this.tableName} WHERE chatRoomId = ? AND id > ?`, [chatRoomId, chatMessageId]);

    return chatMessages;
  }

  async create(data: CreateTypes): Promise<ChatMessage> {
    const { chatRoomId, userId, content } = data;
    const now = new Date();
    const insertResult = await this.save(
      `INSERT INTO ${this.tableName} (chatRoomId, userId, content, createdAt, updatedAt) VALUES(?, ?, ?, ?, ?)`,
      [chatRoomId, userId, content, now, now]);

    const chatMessage = await this.findByPk(insertResult.insertId);
    if (chatMessage === null) {
      throw new Error('MySQL 생성 오류');
    }

    return chatMessage;
  }

  map(row: RowDataPacket): ChatMessage {
    const chatMessage = new ChatMessage();
    chatMessage.id = row.id;
    chatMessage.chatRoomId = row.chatRoomId;
    chatMessage.userId = row.userId;
    chatMessage.content = row.content;
    chatMessage.createdAt = row.createdAt;
    chatMessage.updatedAt = row.updatedAt;

    return chatMessage;
  }
}

export default new ChatMessageQuery();