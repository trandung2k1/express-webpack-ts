import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import colors from 'colors';
import bodyParser from 'body-parser';
import path from 'path';
const rfs = require('rotating-file-stream');
import connectDB from './configs/connect.db';
import routes from './routes';
const port: number = 4000;
const isProduction = process.env.NODE_ENV === 'production';
const accessLogStream = rfs.createStream('pro.log', {
    interval: '2d',
    path: path.join(__dirname, 'logs'),
});
const devLogStream = rfs.createStream('dev.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs'),
});
const app: Express = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    isProduction
        ? morgan('combined', { stream: accessLogStream })
        : morgan('tiny', { stream: devLogStream }),
);
connectDB();
routes(app);
app.listen(port, () =>
    console.log(colors.green(`Server listening on http://localhost:${port}`)),
);
