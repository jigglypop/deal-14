import MySQL from '../database';

class InitQuery {
  constructor() {
  }

  connection() {
    return MySQL.instance.getConnection()
      .then((conn) => conn);
  }

  async set(sql: string): Promise<any> {
    const conn = await this.connection();

    return new Promise((resolve, reject) => {
      conn.query(sql, (error, rows) => {
        conn.release();
        if (error !== null) {
          return reject(error);
        }

        resolve(rows);
      });
    });
  }

  async init(sql: string): Promise<boolean> {
    const result = await this.set(sql);

    if (result) {
      return true
    } else {
      return false
    }
  }
}

export default new InitQuery();