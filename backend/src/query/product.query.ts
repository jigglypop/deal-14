import { RowDataPacket } from 'mysql2';
import Categories from '../enum/category.enum';
import Product from '../models/product';
import BaseQuery from './base.query';

type CreateTypes = {
  title: string;
  price: number | null;
  isSoldOut: boolean;
  content: string;
  category: Categories;
  userId: string;
  townId: string;
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
    const {
      title, price, isSoldOut, content, category, userId, townId,
    } = data;
    const now = new Date();
    const insertResult = await this.save(
      `INSERT INTO ${this.tableName} (title, price, isSoldOut, content, category, userId, townId)
      VALUES(?, ?, ?, ?, ?, ?, ?)`, [title, price, isSoldOut, content, category, userId, townId]);

    const product = await this.findByPk(insertResult.insertId);
    if (product === null) {
      throw new Error('MySQL 생성 오류');
    }

    return product;
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

    return product;
  }
}

export default new ProductQuery();