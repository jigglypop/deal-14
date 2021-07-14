import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import apiRouter from './routes';
import errorMiddleware from './middlewares/error.middleware';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, '../public')));
app.use(cors())

app.use('/api', apiRouter);
// 바꿀 예정
app.get('/', (_, res) => {
    res.send('<h1>우아마켓 14조 서버</h1>')
})
app.use(errorMiddleware);

export default app;