import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Product from './product';
import User from './user';

export interface ILikedProduct {
  productId: string;
  userId: string;
}

@Table({
  tableName: 'liked_product',
  timestamps: true,
})
class LikedProduct extends Model<ILikedProduct> {
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

export default LikedProduct;
