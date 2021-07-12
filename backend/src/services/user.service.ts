import sequelize from '../database';
import HTTPError from '../errors/http-error';
import User from "../models/user";
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

    await sequelize.transaction(t => {
      return User.create({
        id,
      }, {
        transaction: t,
      })
        .then(registeredUser => {
          UserTown.create({
            townName: town,
            userId: registeredUser.id,
          });
        });
    });
  }
}

export default new UserService();