import { RowDataPacket } from 'mysql2';
import Town from '../models/town';
import BaseQuery from './base.query';

type CreateTypes = {
  townName: string;
}

class TownQuery extends BaseQuery<Town, number, CreateTypes> {
  constructor() {
    super('town');
  }

  async findByPk(id: number): Promise<Town | null> {
    const towns = await this.select(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
    if (towns.length === 0) {
      return null;
    }

    return towns[0];
  }

  async findByTownName(townName: string) {
    const towns = await this.select(`SELECT * FROM ${this.tableName} WHERE townName = ?`, [townName]);
    if (towns.length === 0) {
      return null;
    }

    return towns[0];
  }

  async findOrCreateByTownName(townName: string): Promise<Town> {
    const town = await this.findByTownName(townName);
    if (town === null) {
      return this.create({
        townName,
      });
    }

    return town;
  }

  async create(data: CreateTypes): Promise<Town> {
    const now = new Date();
    const insertResult = await this.save(
      `INSERT INTO ${this.tableName} (townName, createdAt, updatedAt) VALUES(?, ?, ?)`,
      [data.townName, now, now]);

    const town = await this.findByPk(insertResult.insertId);
    if (town === null) {
      throw new Error('MySQL 생성 오류');
    }

    return town;
  }

  map(row: RowDataPacket): Town {
    const town = new Town();
    town.id = row.id;
    town.townName = row.townName;
    town.createdAt = row.createdAt;
    town.updatedAt = row.updatedAt;

    return town;
  }
}

export default new TownQuery();