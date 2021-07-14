import { ResultSetHeader, RowDataPacket } from 'mysql2';
import MySQL from '../database';

type ParamTypes = (string | number)[];

abstract class BaseQuery<T, PK, CreateTypes> {
  constructor(
    protected tableName: string,
  ) { }

  abstract map(row: RowDataPacket): T;
  abstract create(data: CreateTypes): Promise<T>;
  abstract findByPk(pk: PK): Promise<T | null>;

  connection() {
    return MySQL.instance.getConnection()
      .then((conn) => conn);
  }

  async executeQuery(sql: string, params?: ParamTypes): Promise<void> {
    const conn = await this.connection();

    return new Promise((resolve, reject) => {
      conn.query(sql, params, (error, rows) => {
        conn.release();
        if (error !== null) {
          return reject(error);
        }

        resolve();
      });
    });
  }

  async count(sql: string, params?: ParamTypes, countAs = 'COUNT(*)'): Promise<number> {
    const conn = await this.connection();

    return new Promise((resolve, reject) => {
      conn.query(sql, params, (error, rows: RowDataPacket[]) => {
        conn.release();
        if (error !== null) {
          return reject(error);
        }

        resolve(rows[0][countAs]);
      });
    });
  }

  async select(sql: string, params?: ParamTypes): Promise<T[]> {
    const conn = await this.connection();

    return new Promise((resolve, reject) => {
      conn.query(sql, params, (error, rows: RowDataPacket[]) => {
        conn.release();
        if (error !== null) {
          return reject(error);
        }
        resolve(rows.map(row => this.map(row)));
      });
    });
  }

  async save(sql: string, params?: (unknown)[]): Promise<ResultSetHeader> {
    const conn = await this.connection();
    return new Promise((resolve, reject) => {
      conn.query(sql, params, (error, rows: ResultSetHeader) => {
        conn.release();
        if (error !== null) {
          return reject(error);
        }

        resolve(rows);
      });
    });
  }
}

export default BaseQuery;
