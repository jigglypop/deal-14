import 'dotenv/config';

import http from 'http';
import path from 'path';
import { convertToObject } from 'typescript';
import app from './app';
import dotenv from './config/dotenv';
import './database';
import initTable from './database/init';
import socketFunc from './socket';

const server = http.createServer(app);
const port = parseInt(dotenv.PORT);

initTable(path.join(__dirname, '../init.sql'))
  .then(() => {
    server.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.log('MySQL 테이블 동기화 오류')
    console.log(error);
  });

socketFunc(server)
