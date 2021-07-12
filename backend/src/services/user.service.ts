import User from "../models/user";

class UserService {
  async find(id: string) {
    const user = await User.findByPk(id);

    return user;
  }
}

export default new UserService();