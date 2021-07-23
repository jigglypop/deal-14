import { RowDataPacket } from 'mysql2';
import User from '../models/user';
import BaseQuery from './base.query';

type CreateTypes = {
  id: string;
  profileImage?: string | null;
}

class UserQuery extends BaseQuery<User, string, CreateTypes> {
  constructor() {
    super('user');
  }

  async findByPk(id: string): Promise<User | null> {
    const users = await this.select(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
    if (users.length === 0) {
      return null;
    }

    return users[0];
  }

  async create(data: CreateTypes): Promise<User> {
    const now = new Date();
    await this.save(
      `INSERT INTO ${this.tableName} (id, profileImage, createdAt, updatedAt) VALUES(?, ?, ?, ?)`,
      [data.id, data.profileImage, now, now]);

    const createdUser = await this.findByPk(data.id);
    if (createdUser === null) {
      throw new Error('MySQL 생성 오류');
    }

    return createdUser;
  }

  map(row: RowDataPacket) {
    const user = new User();
    user.id = row.id;
    user.profileImage = row.profileImage;
    user.createdAt = row.createdAt;
    user.updatedAt = row.updatedAt;

    return user;
  }
}

export default new UserQuery();