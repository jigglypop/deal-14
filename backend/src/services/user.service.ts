import sequelize from '../database';
import HTTPError from '../errors/http-error';
import User, { IUserAttributes } from "../models/user";
import UserTown from '../models/user-town';
import { RegisterRequest } from '../requests/auth.request';

class UserService {
  async find(id: string) {
    const user = await User.findByPk(id);

    return user;
  }

  async register(registerRequest: RegisterRequest) {
    const { id, town } = registerRequest;

    const duplicateUser = await User.findByPk(id);
    if (duplicateUser !== null) {
      throw new HTTPError(409, '이미 존재하는 아이디');
    }

    const registeredUser = await sequelize.transaction(async t => {
      const registeredUser = await User.create({
        id,
      }, {
        transaction: t,
      });

      await UserTown.create({
        townName: town,
        userId: registeredUser.id,
      }, {
        transaction: t,
      });

      return registeredUser;
    });

    return registeredUser;
  }
}

export default new UserService();