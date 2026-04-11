import { Request, Response } from "express";
import { userService } from "./user.service";

export const userController = {

  async create(req: Request, res: Response) {
    try {
      const user = await userService.create(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
    const page = Number(req.query.page as string) || 1;
    const limit = Number(req.query.limit as string) || 10;

      const users = await userService.findAll(page, limit);

      return res.json(users);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  async findById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const user = await userService.findById(id);

      return res.json(user);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const user = await userService.update(id, req.body);

      return res.json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  async delete(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    await userService.delete(id);

    return res.status(204).send();
  } catch (error: any) {

    if (error.statusCode) {
      return res.status(error.statusCode).json({
        message: error.message
      });
    }

    return res.status(500).json({
      message: "Internal server error"
    });
  }
},

async updatePassword(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const { password } = req.body;

      await userService.updatePassword(id, password);

      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

};