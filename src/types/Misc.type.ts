import { NextFunction, Response, Request } from 'express';

export type OutpassData = {
	o: any;
	s: any;
	w: any;
};

export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
