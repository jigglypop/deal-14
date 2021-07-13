import express from 'express';
import cookieParser from 'cookie-parser';
import apiRouter from './routes';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);
// 바꿀 예정
app.get('/', (_, res) => {
    res.send(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>배달의 민족</title>
        </head>
        <body>
            <h1>우아마켓 14조</h1>
        </body>
        </html>
    `)
})
app.use(errorMiddleware);

export default app;