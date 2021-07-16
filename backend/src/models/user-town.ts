import Town from './town';
import User from './user';

class UserTown {
  id!: number;
  userId!: string;
  townId!: number;
  user!: User;
  town!: Town;
  createdAt!: Date;
  updatedAt!: Date;
}

export default UserTown;
