import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import Categories from '../enum/category.enum';
import ChatRoom from './chat-room';
import LikedProduct from './liked-product';
import User from './user';

export interface IProductAttributes {
  title: string;
  price: number;
  content: string;
  isSoldOut: boolean;
  userId: string;
  category: Categories;
}

@Table({
  tableName: 'product',
  timestamps: true,
})
class Product extends Model<IProductAttributes> {
  @Column({
    type: DataType.STRING,
  })
  title!: string;

  @Column({
    type: DataType.INTEGER,
  })
  price!: number;

  @Column({
    type: DataType.TINYINT,
  })
  isSoldOut!: boolean;

  @Column({
    type: DataType.TEXT,
  })
  content!: string;

  @Column({
    type: DataType.INTEGER,
  })
  category!: Categories;

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => LikedProduct)
  likedProducts!: LikedProduct[];

  @HasMany(() => ChatRoom)
  chatRooms!: ChatRoom[];
}

export default Product;
