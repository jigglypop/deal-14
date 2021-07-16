import Product from './product';
import UserTown from './user-town';

class Town {
  id!: number;
  townName!: string;
  products?: Product[];
  userTown?: UserTown[];
  createdAt!: Date;
  updatedAt!: Date;
}

export default Town;