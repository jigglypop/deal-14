import { RowDataPacket } from 'mysql2';
import UserTown from '../models/user-town';
import BaseQuery from './base.query';

type CreateTypes = {
  userId: string;
  townId: number;
}

class UserTownQuery extends BaseQuery<UserTown, number, CreateTypes> {
  constructor() {
    super('user_town');
  }

  async findByPk(id: number): Promise<UserTown | null> {
    const userTowns = await this.select(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
    if (userTowns.length === 0) {
      return null;
    }

    return userTowns[0];
  }

  async findAllByUser(userId: string): Promise<UserTown[]> {
    const userTowns = await this.select(`SELECT * FROM ${this.tableName} WHERE userId = ?`, [userId]);

    return userTowns;
  }

  async create(data: CreateTypes): Promise<UserTown> {
    const { userId, townId } = data;

    const now = new Date();
    const insertResult = await this.save(
      `INSERT INTO ${this.tableName} (userId, townId, createdAt, updatedAt) VALUES(?, ?, ?, ?)`,
      [userId, townId, now, now],
    );

    const userTown = await this.findByPk(insertResult.insertId);
    if (userTown === null) {
      throw new Error('MySQL 생성 오류');
    }

    return userTown;
  }

  async delete(id: number): Promise<void> {
    await this.executeQuery(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
  }

  map(row: RowDataPacket): UserTown {
    const userTown = new UserTown();
    userTown.id = row.id;
    userTown.userId = row.userId;
    userTown.townId = row.townId;
    userTown.createdAt = row.createdAt;
    userTown.updatedAt = row.updatedAt;
    userTown.town = {
      id: row['town.id'],
      townName: row['town.townName'],
      createdAt: row['user.updatedAt'],
      updatedAt: row['user.updatedAt'],
    }

    return userTown;
  }

}

export default new UserTownQuery();