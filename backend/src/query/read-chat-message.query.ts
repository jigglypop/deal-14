import { RowDataPacket } from 'mysql2';
import ReadChatMessage from '../models/read-chat-message';
import BaseQuery from './base.query';

type CreateTypes = {
  chatRoomId: number;
  chatMessageId: number;
  userId: string;
}

class ReadChatMessageQuery extends BaseQuery<ReadChatMessage, number, CreateTypes> {
  constructor() {
    super('read_chat_message');
  }

  async findByPk(id: number): Promise<ReadChatMessage | null> {
    const readChatMessages = await this.select(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
    if (readChatMessages.length === 0) {
      return null;
    }

    return readChatMessages[0];
  }

  async findByUserAndChatRoom(userId: string, chatRoomId: number): Promise<ReadChatMessage | null> {
    const readChatMessages = await this.select(`SELECT * FROM ${this.tableName} WHERE userId = ? AND chatRoomId = ?`, [userId, chatRoomId]);
    if (readChatMessages.length === 0) {
      return null;
    }

    return readChatMessages[0];
  }

  async create(data: CreateTypes): Promise<ReadChatMessage> {
    const { chatRoomId, chatMessageId, userId } = data;

    const insertResult = await this.save(
      `INSERT INTO ${this.tableName} (chatRoomId, chatMessageId, userId)
      VALUES (?, ?, ?)`, [chatRoomId, chatMessageId, userId],
    );

    const readChatMessage = await this.findByPk(insertResult.insertId);
    if (readChatMessage === null) {
      throw new Error('MySQL 생성 오류');
    }

    return readChatMessage;
  }

  map(row: RowDataPacket): ReadChatMessage {
    const readChatMessage = new ReadChatMessage();
    readChatMessage.id = row['id'];
    readChatMessage.chatMessageId = row['chatMessageId'];
    readChatMessage.chatRoomId = row['chatRoomId'];
    readChatMessage.userId = row['userId'];

    return readChatMessage;
  }
}

export default new ReadChatMessageQuery();