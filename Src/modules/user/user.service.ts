import { AppError } from "../../utils/AppError";
import { userRepository } from "./user.repository";
import { UpdateUserDTO } from "./user.schema";
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

    const [users, total] = await Promise.all([
      userRepository.findAll(skip, limit),
      userRepository.count()
   ]);

    return {
      data: users,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      },
    };
  },

  async findById(id: string) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    return user;
  },

  async update(id: string, data: UpdateUserDTO) {

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
      throw new AppError("Usuário não encontrado", 404);
  }
    const isSamePassword = await bcrypt.compare(password, user.password);

    if (isSamePassword) {
      throw new AppError("Nova senha não pode ser igual à anterior", 400);
  }
    const hashedPassword = await bcrypt.hash(password, 10);

    await userRepository.updatePassword(id, hashedPassword);
    return; 
  }
  
}