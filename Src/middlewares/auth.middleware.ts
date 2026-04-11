import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("Token não informado");
    }

    const [, token] = authHeader.split(" ");

    const decoded = jwt.verify(token, "secret") as TokenPayload;

    // salva o id do usuário na requisição
    (req as any).userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}