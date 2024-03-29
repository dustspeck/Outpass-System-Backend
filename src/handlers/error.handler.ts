import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/ApiResponse.type";

export class CustomError extends Error {
  statusCode: any;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const throwError = (code: number, message: string) => {
  throw new CustomError(code, message);
};

export const ErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response: ApiResponse = {
    status: err.statusCode,
    success: false,
    message: err.message,
  };

  console.log(err);

  res.status(err.statusCode).json(response);
};

export const catchCustomError = (error: any, next: NextFunction) => {
  if (error instanceof CustomError) {
    // do nothing
  } else throwError(500, "Some error occurred");
  next(error);
};
