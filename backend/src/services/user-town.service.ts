import HTTPError from '../errors/http-error';
import Town from '../models/town';
import UserTown from '../models/user-town';
import townQuery from '../query/town.query';
import userTownQuery from '../query/user-town.query';
import userQuery from '../query/user.query';
import { CreateUserTownRequest } from '../requests/town.request';
import SelectSQLGenerator from '../utils/select-sql-generator';

const MAX_USER_TOWN = 2;
const MIN_USER_TOWN = 1;

class UserTownService {

  async findByUser(userId: string): Promise<Town[]> {
    const selectSQLGenerator = new SelectSQLGenerator('user_town',
      `user_town.*, town.townName as 'town.townName'`);
    selectSQLGenerator.addJoin({
      type: 'LEFT JOIN',
      joinTable: 'town',
      joinPK: 'id',
      equalColum: 'townId',
    });
    selectSQLGenerator.addWhere({
      column: 'userId',
    });

    const userTowns = await userTownQuery.select(selectSQLGenerator.generate(), [userId]);

    return userTowns.map(userTown => userTown.town);
  }

  async create(userId: string, createUserTownRequest: CreateUserTownRequest) {
    const user = await userQuery.findByPk(userId);
    if (user === null) {
      throw new HTTPError(400, '존재하지 않는 회원의 동네 추가');
    }

    const registeredTowns = await userTownQuery.findAllByUser(userId);
    if (registeredTowns.length >= MAX_USER_TOWN) {
      throw new HTTPError(400, '최대 개수의 동네 설정');
    }

    const { townName } = createUserTownRequest;
    const town = await townQuery.findOrCreateByTownName(townName);

    const duplicateTown = registeredTowns.find(registeredTown => registeredTown.townId === town.id);
    if (duplicateTown !== undefined) {
      throw new HTTPError(409, '중복된 동네 설정');
    }

    userTownQuery.create({
      userId,
      townId: town.id,
    });
  }

  async remove(userId: string, userTownId: number) {
    const userTown = await userTownQuery.findByPk(userTownId);
    if (userTown === null) {
      throw new HTTPError(400, '존재하지 않는 동네 설정');
    }

    if (userTown.userId !== userId) {
      throw new HTTPError(403, '본인의 동네설정만 삭제 가능');
    }

    const registeredTowns = await userTownQuery.findAllByUser(userId);
    if (registeredTowns.length <= MIN_USER_TOWN) {
      throw new HTTPError(400, '최소 개수의 동네 설정');
    }


    await userTownQuery.delete(userTownId);
  }

}

export default new UserTownService();