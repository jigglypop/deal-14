import 'dotenv/config';

import http from 'http';
import app from './app';
import dotenv from './config/dotenv';
import './database';
import sequelize from './database';

const server = http.createServer(app);

const port = parseInt(dotenv.PORT);

sequelize.sync()
  .then(() => {
    console.log('Model sync');

    server.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  });