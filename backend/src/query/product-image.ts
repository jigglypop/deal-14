import { RowDataPacket } from 'mysql2';
import ProductImage from '../models/product-image';
import BaseQuery from './base.query';

type CreateTypes = {
  filePath: string;
  productId: number;
}

class ProductImageQuery extends BaseQuery<ProductImage, number, CreateTypes> {
  constructor() {
    super('product_image');
  }

  async findByPk(id: number): Promise<ProductImage | null> {
    const productImages = await this.select(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
    if (productImages.length === 0) {
      return null;
    }

    return productImages[0];
  }

  async create(data: CreateTypes): Promise<ProductImage> {
    const { filePath, productId } = data;
    const now = new Date();

    const insertResult = await this.save(
      `INSERT INTO ${this.tableName} (filePath, productId, createdAt, updatedAt) VALUES(?, ?)`,
      [filePath, productId, now, now]);

    const createdProductImage = await this.findByPk(insertResult.insertId);
    if (createdProductImage === null) {
      throw new Error('MySQL 생성 오류');
    }

    return createdProductImage;
  }

  map(row: RowDataPacket) {
    const productImage = new ProductImage();
    productImage.id = row.id;
    productImage.filePath = row.filePath;
    productImage.productId = row.productId;
    productImage.createdAt = row.createdAt;
    productImage.updatedAt = row.updatedAt;

    return productImage
  }
}

export default new ProductImage();