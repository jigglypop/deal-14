import HTTPError from '../errors/http-error';
import townQuery from '../query/town.query';
import userTownQuery from '../query/user-town.query';
import initQuery from '../query/init.query';
import { initialSQL } from "./init"

class InitService {

  async createAllTable() {
    for (let item of initialSQL) {
        const result = await initQuery.init(item);
        if (!result) {
            throw new HTTPError(500, "테이블 생성 실패")
        }
    }
    return true
  }
}

export default new InitService();