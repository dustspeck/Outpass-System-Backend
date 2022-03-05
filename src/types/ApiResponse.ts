export type ApiResponse = {
	status: number;
	success: boolean;
	message?: string;
	data?: object;
};

export type Response = {
	data: any;
	error: boolean;
	message: string;
};
