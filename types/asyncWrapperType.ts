import { Request, Response, NextFunction } from "express";

export interface AsyncHandler {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}
