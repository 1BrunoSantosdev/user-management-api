import { AppError } from "../../utils/AppError";
import { userRepository } from "./user.repository";
import bcrypt from "bcryptjs";

export const userService = {

  async create(data: {
    name: string;
    email: string;
    password: string;
  }) {

    
    const userExists = await userRepository.findByEmail(data.email);

    if (userExists) {
      throw new AppError("Usuário já existe");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    
    return userRepository.create({
      ...data,
      password: hashedPassword
    });
  },

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    return userRepository.findAll(skip, limit);
  },

  async findById(id: string) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    return user;
  },

  async update(id: string, data: {
    name?: string;
    email?: string;
  }) {

    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    return userRepository.update(id, data);
  },

  async delete(id: string) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    return userRepository.delete(id);
  },

  async updatePassword(id: string, password: string) {

    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado",  404);
    }

    if (!password) {
      throw new AppError("Senha é obrigatória",  400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userRepository.updatePassword(id, hashedPassword);
    
  }

};