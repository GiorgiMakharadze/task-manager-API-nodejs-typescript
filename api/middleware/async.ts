import { Request, Response, NextFunction, RequestHandler } from "express";
import { AsyncHandler } from "../../types/asyncWrapperType";

export const asyncWrapper = (fn: AsyncHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
