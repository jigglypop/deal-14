import { RowDataPacket } from 'mysql2';
import Categories from '../enum/category.enum';
import Product from '../models/product';
import BaseQuery from './base.query';
import userQuery from './user.query';

type CreateTypes = {
  title: string;
  price: number | null;
  isSoldOut: boolean;
  content: string;
  category: Categories;
  userId: string;
  townId: number;
}

class ProductQuery extends BaseQuery<Product, number, CreateTypes> {
  constructor() {
    super('product');
  }

  async findByPk(id: number): Promise<Product | null> {
    const products = await this.select(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
    if (products.length === 0) {
      return null;
    }

    return products[0];
  }

  async create(data: CreateTypes): Promise<Product> {
    try {
      const {
        title, price, isSoldOut, content, category, userId, townId,
      } = data;
      const now = new Date();

      const insertResult = await this.save(
        `INSERT INTO ${this.tableName} (title, price, isSoldOut, content, category, userId, townId, createdAt, updatedAt)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`, [title, price, isSoldOut, content, category, userId, townId, now, now]);
      // const insertResult = await this.save(
      //   `INSERT INTO ${this.tableName} (title, price, isSoldOut, content, category, userId, createdAt, updatedAt)
      // VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, [title, price, isSoldOut, content, category, userId, now, now]);

      const product = await this.findByPk(insertResult.insertId);
      if (product === null) {
        throw new Error('MySQL 생성 오류');
      }

      return product;
    } catch (err) {
      throw err;
    }
  }

  map(row: RowDataPacket): Product {
    const product = new Product();
    product.id = row.id;
    product.title = row.title;
    product.price = row.price;
    product.isSoldOut = row.isSoldOut;
    product.content = row.content;
    product.category = row.category;
    product.userId = row.userId;
    product.townId = row.townId;
    product.createdAt = row.createdAt;
    product.updatedAt = row.updatedAt;
    product.townId = row.townId;
    product.user = {
      id: row['user.id'],
      createdAt: row['user.createdAt'],
      updatedAt: row['user.updatedAt'],
    };
    product.town = {
      id: row['town.id'],
      townName: row['town.townName'],
      createdAt: row['user.updatedAt'],
      updatedAt: row['user.updatedAt'],
    };

    return product;
  }
}

export default new ProductQuery();