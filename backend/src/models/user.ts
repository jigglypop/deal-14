import { Table, Model, Column, PrimaryKey, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'user',
  timestamps: true,
})
class User extends Model<User> {
  @PrimaryKey
  @Column(DataType.UUID)
  id!: string;
}

export default User;
