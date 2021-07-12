import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import dotenv from '../config/dotenv';

const {
  MYSQL_DB,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
} = dotenv;

const sequelize = new Sequelize({
  database: MYSQL_DB,
  dialect: 'mysql',
  host: MYSQL_HOST,
  port: parseInt(MYSQL_PORT),
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  models: [path.join(__dirname, '../models')],
  logging: false,
});

export default sequelize;
