import supabase from '../configs/supabase.config';
import { Response } from '../types/ApiResponse.type';

export const getOutpass = async (outpass_id: string) => {
	let response = { data: null, error: false, message: '' } as Response;
	try {
		const { data, error } = await supabase.from('outpass').select('*').eq('id', outpass_id).single();
		if (error) throw error.message;
		response.data = data;
	} catch (error) {
		console.log(error);
		response.error = true;
		response.message = `Error fetching outpass with id : ${outpass_id}`;
	} finally {
		return response;
	}
};
export const getUserInfo = async (id: string) => {
	let response = { data: null, error: false, message: '' } as Response;
	try {
		const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
		if (error) throw error.message;
		response.data = data;
	} catch (error) {
		console.log(error);
		response.error = true;
		response.message = `Error fetching student with id : ${id}`;
	} finally {
		return response;
	}
};
