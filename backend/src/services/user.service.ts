import HTTPError from '../errors/http-error';
import townQuery from '../query/town.query';
import userTownQuery from '../query/user-town.query';
import userQuery from '../query/user.query';
import { RegisterRequest } from '../requests/auth.request';

class UserService {
  async find(id: string) {
    const user = await userQuery.findByPk(id);

    return user;
  }

  async register(registerRequest: RegisterRequest) {
    const { id, town } = registerRequest;

    const duplicateUser = await userQuery.findByPk(id);
    if (duplicateUser !== null) {
      throw new HTTPError(409, '이미 존재하는 아이디');
    }

    const registeredUser = await userQuery.create({
      id,
    });

    const createdTown = await townQuery.findOrCreateByTownName(town);
    userTownQuery.create({
      userId: registeredUser.id,
      townId: createdTown.id,
    })

    return registeredUser;
  }
}

export default new UserService();