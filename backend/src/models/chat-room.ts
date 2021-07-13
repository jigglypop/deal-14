import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Product from './product';
import User from './user';

export interface IChatRoom {
  productId: string;
  userId: string;
}

@Table({
  tableName: 'chat_room',
  timestamps: true,
})
class ChatRoom extends Model<IChatRoom> {
  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  productId!: string;

  @BelongsTo(() => Product)
  product!: Product;

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  userId!: string;

  @BelongsTo(() => User)
  user!: User;
}

export default ChatRoom;
