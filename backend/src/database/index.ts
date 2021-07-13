import mysql, { PoolConnection } from 'mysql2';
import dotenv from '../config/dotenv';

const {
  MYSQL_DB,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
} = dotenv;

class MySQL {
  private static _instance: MySQL;

  static get instance() {
    if (MySQL._instance === undefined) {
      MySQL._instance = new MySQL();
    }

    return MySQL._instance;
  }

  public pool;

  private constructor() {
    this.pool = mysql.createPool({
      database: MYSQL_DB,
      host: MYSQL_HOST,
      port: parseInt(MYSQL_PORT),
      user: MYSQL_USERNAME,
      password: MYSQL_PASSWORD,
    });
  }

  getConnection(): Promise<PoolConnection> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((error, connection) => {
        if (error) {
          reject(error);
        } else {
          resolve(connection);
        }
      })
    })
  }
}

export default MySQL;
