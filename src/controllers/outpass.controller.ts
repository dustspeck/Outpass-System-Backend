import { CustomError, throwError } from '../handlers/error.handler';
import { Response } from '../types/ApiResponse';
import { getOutpass, getUserInfo } from './supabase.controller';

export const getEncSignedOutpass = async (outpass_id: string) => {
	let response = { data: {}, error: false, message: '' } as Response;
	try {
		let data = { outpass: {}, student: {}, warden: {} } as { outpass: any; student: any; warden: any };
		let enc_string = '';
		const outpass = await getOutpass(outpass_id);
		if (!outpass.data) throwError(404, 'Outpass not found');
		if (!outpass.data.student_id) throwError(404, 'Outpass not associated to student');
		if (!outpass.data.signed_by) throwError(404, 'Outpass not yet signed');

		data.outpass = { ...outpass.data };
		const student = await getUserInfo(outpass.data.student_id);
		const warden = await getUserInfo(outpass.data.signed_by);

		if (student.error) throwError(400, 'Error fetching student');
		const { full_name: student_name, block, room, gender, course, regno } = student.data;
		data.student = { name: student_name, block, room, gender, course, regno };

		if (warden.error) throwError(400, 'Error fetching warden signatory');
		const { full_name: warden_name } = warden.data;
		data.warden = { name: warden_name };

		response.data = { ...data };
	} catch (error) {
		console.log(error);
		response.error = true;
		if (error instanceof CustomError) {
			response.message = error.message;
		} else response.message = 'Error generating encrypted outpass';
	} finally {
		return response;
	}
};
