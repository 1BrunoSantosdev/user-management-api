import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";

export function errorMiddleware(
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction
) {

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: error.issues.map((err: any) => err.message),
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
}