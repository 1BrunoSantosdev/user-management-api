import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});
export type CreateUserDTO = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").optional(),
  email: z.string().email("Email inválido").optional(),
});
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;

export const idSchema = z.object({
  id: z.string().uuid("ID inválido"),
});

export const updatePasswordSchema = z.object({
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});
export type UpdatePasswordDTO = z.infer<typeof updatePasswordSchema>;

export const paginationSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
});
export type PaginationDTO = z.infer<typeof paginationSchema>;   