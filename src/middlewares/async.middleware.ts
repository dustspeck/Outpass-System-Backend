import { RequestHandler } from 'express';
import { AsyncHandler } from '../types/Misc.type';

export const asyncWrap =
	(handler: AsyncHandler): RequestHandler =>
	async (req, res, next) =>
		handler(req, res, next).catch(next);
