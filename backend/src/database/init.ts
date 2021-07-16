import { readFileSync } from 'fs';
import { convertToObject } from 'typescript';
import MySQL from '.'


const runQuery = async (sql: string): Promise<void> => {
  const conn = await MySQL.instance.getConnection();

  return new Promise((resolve, reject) => {
    conn.query(sql, (error) => {
      conn.release();
      if (error) {
        return reject(error);
      }

      resolve();
    })
  })
}

const initTable = async (filePath: string): Promise<void> => {
  const initSQL = await readFileSync(filePath)
    .toString()
    .split('\n');

  for (const sql of initSQL) {
    await runQuery(sql);
  }
}

export default initTable;