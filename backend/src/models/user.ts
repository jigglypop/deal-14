import { Table, Model, Column, PrimaryKey, DataType, HasMany } from 'sequelize-typescript';
import Product from './product';
import UserTown from './user-town';

export interface IUserAttributes {
  id: string;
}

@Table({
  tableName: 'user',
  timestamps: true,
})
class User extends Model<IUserAttributes> {
  @PrimaryKey
  @Column(DataType.STRING(255))
  id!: string;

  @HasMany(() => UserTown)
  userTowns!: UserTown[];

  @HasMany(() => Product)
  products!: Product[];
}

export default User;
