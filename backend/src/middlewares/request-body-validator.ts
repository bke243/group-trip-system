import { RequestHandler, Response, Request, NextFunction } from "express";
import { AnySchema } from "joi";

export enum RESPONSE_STATUS {
  BAD_REQUEST=400,
  OK=200,
  CONFLICT=409,
  INTERNAL_SERVER_ERROR=500,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export const validateBodyParams = (validationSchema: AnySchema): RequestHandler => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const value = await validationSchema.validateAsync(request.body, { abortEarly: false });
    } catch(err) {
      const error = err as { details: {message: string}[] };
      const customErrorMessage = error.details.map((detail) =>  detail.message).join("/n") ;
      return response.status(RESPONSE_STATUS.BAD_REQUEST).json({ status: RESPONSE_STATUS.BAD_REQUEST, result: customErrorMessage  });
    }
    next();
  }
} 