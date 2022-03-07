import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import { ErrorHandler } from './handlers/error.handler';
import outpassRouter from './routes/outpass.route';
import { getPublicKey } from './controllers/common.controller';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/public_key', getPublicKey);

app.use('/outpass', outpassRouter);

app.use(ErrorHandler);

app.listen(PORT, () => {
	console.log(`Server started at port: ${PORT}`);
});
