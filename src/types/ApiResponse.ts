export type ApiResponse = {
	status: number;
	success: boolean;
	message?: string;
	data?: any;
};

export type Response = {
	data: any;
	error: boolean;
	message: string;
};
