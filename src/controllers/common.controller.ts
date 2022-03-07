import { exportPublicKey } from '../handlers/encryption.handler';
import { catchCustomError, throwError } from '../handlers/error.handler';
import { asyncWrap } from '../middlewares/async.middleware';
import { ApiResponse } from '../types/ApiResponse.type';

export const getPublicKey = asyncWrap(async (_req, res, next) => {
	let response = { status: 200, success: true, data: {}, message: '' } as ApiResponse;
	try {
		const public_key = exportPublicKey();
		if (!public_key) throwError(500, 'Error exporting current public key');

		response.data = public_key;
		res.status(200).json(response);
	} catch (error) {
		catchCustomError(error, next);
	}
});
