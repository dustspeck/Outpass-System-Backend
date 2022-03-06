import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import { ErrorHandler, throwError } from './handlers/error.handler';
import { getDecSignedOutpass, getEncSignedOutpass } from './controllers/outpass.controller';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/outpass/:id', getEncSignedOutpass);
app.post('/outpass', getDecSignedOutpass);

app.all('*', () => {
	throwError(500, 'Erroneous request');
});

app.use(ErrorHandler);

app.listen(PORT, () => {
	console.log(`Server started at port: ${PORT}`);
});
