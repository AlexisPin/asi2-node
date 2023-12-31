import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";


export const validation = <T>(schema : ZodSchema<T>) => (req : Request, _res : Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
}
