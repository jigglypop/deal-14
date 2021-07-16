import townQuery from '../query/town.query';

class TownService {
  async findAll() {
    return townQuery.findAll();
  }
}

export default new TownService();
