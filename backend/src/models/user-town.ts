import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user';

export interface IUserTownAttributes {
  userId: string;
  townName: string;
}

@Table({
  tableName: 'user_town',
  timestamps: true,
})
class UserTown extends Model<IUserTownAttributes> {
  @Column({
    type: DataType.STRING,
  })
  townName!: string;


  @ForeignKey(() => User)
  @Column(DataType.STRING)
  userId!: string;

  @BelongsTo(() => User)
  user!: User;
}

export default UserTown;
