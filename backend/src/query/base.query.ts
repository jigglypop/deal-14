import { ResultSetHeader, RowDataPacket } from 'mysql2';
import MySQL from '../database';

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

  async select(sql: string, params?: (string | number)[]): Promise<any> {
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
