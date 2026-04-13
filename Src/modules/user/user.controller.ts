import { Request, Response } from "express";
import { userService } from "./user.service";
import { createUserSchema } from "./user.schema";
import { paginationSchema } from "./user.schema";
import { updateUserSchema, idSchema } from "./user.schema";
import { updatePasswordSchema } from "./user.schema";
import { ZodError } from "zod";

export const userController = {


async create(req: Request, res: Response) {
  try {
    const data = createUserSchema.parse(req.body);

    const user = await userService.create(data);

    return res.status(201).json(user);

  } catch (error: any) {

if (error instanceof ZodError) {
  return res.status(400).json({
    message: error.issues.map((err: any) => err.message)
  });
}

    return res.status(400).json({
      message: error.message
    });
  }
},

async findAll(req: Request, res: Response) {

  const { page = "1", limit = "10" } = paginationSchema.parse(req.query);

  const users = await userService.findAll(
    Number(page),
    Number(limit)
  );

  return res.json(users);
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

  const { id } = idSchema.parse(req.params);
  const data = updateUserSchema.parse(req.body);

  const user = await userService.update(id, data);

  return res.json(user);
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
    const { id } = idSchema.parse(req.params); 
    const { password } = updatePasswordSchema.parse(req.body); 

    await userService.updatePassword(id, password);

    return res.status(204).send();
  }
}