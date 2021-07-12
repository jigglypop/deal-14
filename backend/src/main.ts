import 'dotenv/config';

import http from 'http';
import app from './app';
import dotenv from './config/dotenv';

const server = http.createServer(app);

const port = parseInt(dotenv.PORT);

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
