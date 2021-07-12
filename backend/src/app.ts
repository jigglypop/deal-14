import express from 'express';
import cookieParser from 'cookie-parser';
import apiRouter from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);


export default app;