import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { catchCustomError, ErrorHandler, throwError } from './handlers/error.handler';
import { asyncWrap } from './middlewares/async';
import { getEncSignedOutpass } from './controllers/outpass.controller';
import { ApiResponse } from './types/ApiResponse';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

app.get('/', (req, res) => {
	res.send(`Hello world!`);
});

app.get(
	'/outpass/:id',
	asyncWrap(async (req, res, next) => {
		let response = { status: 200, success: true, data: {}, message: '' } as ApiResponse;
		try {
			const outpass_id = req.params.id;
			const { data, message, error } = await getEncSignedOutpass(outpass_id);
			response.data = data;
			if (error) throwError(500, message);
			else res.status(200).json(response);
		} catch (error) {
			catchCustomError(error, next);
		}
	})
);

app.use(ErrorHandler);

app.all('*', (_req, _res) => {
	throwError(500, 'Erroneous request');
});

app.listen(PORT, () => {
	console.log(`Server started at port: ${PORT}`);
});
