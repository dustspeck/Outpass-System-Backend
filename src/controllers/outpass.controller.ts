import { decryptData, encryptData } from '../handlers/encryption.handler';
import { catchCustomError, throwError } from '../handlers/error.handler';
import { asyncWrap } from '../middlewares/async';
import { ApiResponse } from '../types/ApiResponse';
import { getOutpass, getUserInfo } from './supabase.controller';

type OutpassData = {
	o: any;
	s: any;
	w: any;
};

export const getEncSignedOutpass = asyncWrap(async (req, res, next) => {
	let response = { status: 200, success: true, data: {}, message: '' } as ApiResponse;
	try {
		const outpass_id = req.params.id;
		let data = { o: {}, s: {}, w: {} } as OutpassData;
		const outpass = await getOutpass(outpass_id);
		if (outpass.error) throwError(500, outpass.message);
		if (!outpass.data) throwError(404, 'Outpass not found');
		if (!outpass.data.student_id) throwError(400, 'Outpass not associated to student');
		if (!outpass.data.signed_by) throwError(400, 'Outpass not yet signed');

		// const { from, to, address, transport, reason, is_consent } = outpass.data;
		// data.o = { f: from, t: to, a: address, tr: transport, r: reason, c: is_consent };
		const { from, to } = outpass.data;
		data.o = { f: from, t: to };

		const student = await getUserInfo(outpass.data.student_id);
		const warden = await getUserInfo(outpass.data.signed_by);

		if (student.error) throwError(400, 'Error fetching student');
		const { full_name: student_name, block, room, gender, regno } = student.data;
		data.s = { n: student_name, b: block, r: room, g: gender, rn: regno };

		if (warden.error) throwError(400, 'Error fetching signatory');
		const { full_name: warden_name } = warden.data;
		data.w = warden_name;

		const enc_string = encryptData(JSON.stringify(data));
		if (!enc_string) throwError(500, 'Error encrypting data');

		response.data = enc_string;
		res.status(200).json(response);
	} catch (error) {
		catchCustomError(error, next);
	}
});

export const getDecSignedOutpass = asyncWrap(async (req, res, next) => {
	let response = { status: 200, success: true, data: {}, message: '' } as ApiResponse;
	try {
		if (!req.body) throwError(400, 'No body provided');
		if (!req.body.data) throwError(400, 'No data provided');
		const enc_data = req.body.data;

		const dec_string = decryptData(JSON.stringify(enc_data));
		if (!dec_string) throwError(500, 'Error decrypting data. Invalid key or data.');
		try {
			response.data = JSON.parse(dec_string || '{}');
		} catch (error) {
			console.log(error);
			response.data = dec_string;
		}
		res.status(200).json(response);
	} catch (error) {
		catchCustomError(error, next);
	}
});
