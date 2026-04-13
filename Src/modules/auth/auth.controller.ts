import { Request, Response } from "express";
import { authService } from "./auth.service";
import { loginSchema } from "./auth.schema";
import { ZodError } from "zod";

export const authController = {

  async login(req: Request, res: Response) {
    try {
      const data = loginSchema.parse(req.body);

      const result = await authService.login(
        data.email,
        data.password
      );

      return res.json(result);

    } catch (error: any) {

      if (error instanceof ZodError) {
        return res.status(400).json({
          message: error.issues.map((err: any) => err.message)
        });
      }

      return res.status(401).json({
        message: error.message
      });
    }
  }

};