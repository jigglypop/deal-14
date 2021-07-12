import express from 'express';
import cookieParser from 'cookie-parser';
import apiRouter from './routes';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);

app.use(errorMiddleware);

export default app;