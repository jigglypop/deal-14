import { RowDataPacket } from 'mysql2';
import LikedProduct from '../models/liked-product';
import BaseQuery from './base.query';

type CreateTypes = {
  productId: number;
  userId: string;
}

class LikedProductQuery extends BaseQuery<LikedProduct, number, CreateTypes> {
  constructor() {
    super('liked_product');
  }

  async findByPk(id: number): Promise<LikedProduct | null> {
    const likedProducts = await this.select(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
    if (likedProducts.length === 0) {
      return null;
    }

    return likedProducts[0];
  }

  async countByProduct(productId: number): Promise<number> {
    const count = await this.count(`SELECT COUNT(*) FROM ${this.tableName} WHERE productId = ?`, [productId]);

    return count;
  }

  async findByUserAndProduct(userId: string, productId: number): Promise<LikedProduct | null> {
    const likedProducts = await this.select(`SELECT * FROM ${this.tableName} WHERE userId = ? AND productId = ?`, [userId, productId]);
    if (likedProducts.length === 0) {
      return null;
    }

    return likedProducts[0];
  }

  async create(data: CreateTypes): Promise<LikedProduct> {
    const { productId, userId } = data;
    const now = new Date();

    const insertResult = await this.save(
      `INSERT INTO ${this.tableName} (productId, userId, createdAt, updatedAt) VALUES(?, ?, ?, ?)`,
      [productId, userId, now, now]);

    const createdLikedProduct = await this.findByPk(insertResult.insertId);
    if (createdLikedProduct === null) {
      throw new Error('MySQL 생성 오류');
    }

    return createdLikedProduct;
  }

  async delete(id: number): Promise<void> {
    await this.executeQuery(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
  }

  map(row: RowDataPacket) {
    const likedProduct = new LikedProduct();
    likedProduct.id = row.id;
    likedProduct.productId = row.productId;
    likedProduct.userId = row.userId;
    likedProduct.createdAt = row.createdAt;
    likedProduct.updatedAt = row.updatedAt;

    return likedProduct;
  }
}

export default new LikedProductQuery();