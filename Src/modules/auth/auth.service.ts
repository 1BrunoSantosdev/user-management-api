import { userRepository } from "../user/user.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/AppError";

export const authService = {

  async login(email: string, password: string) {

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Credenciais inválidas");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Credenciais inválidas");
    }

    const token = jwt.sign(
      { id: user.id },
      "secret", 
      { expiresIn: "1d" }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  }

};