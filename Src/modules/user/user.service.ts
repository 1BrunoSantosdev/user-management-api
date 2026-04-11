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
      throw new Error("Usuário já existe");
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
      throw new Error("Usuário não encontrado");
    }

    return user;
  },

  async update(id: string, data: {
    name?: string;
    email?: string;
  }) {

    const user = await userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return userRepository.update(id, data);
  },

  async delete(id: string) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return userRepository.delete(id);
  },

  async updatePassword(id: string, password: string) {

    const user = await userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return userRepository.updatePassword(id, hashedPassword);
  }

};