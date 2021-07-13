import 'dotenv/config';

import http from 'http';
import app from './app';
import dotenv from './config/dotenv';
import './database';

const server = http.createServer(app);
const port = parseInt(dotenv.PORT);

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});