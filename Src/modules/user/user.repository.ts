import { prisma } from "../../lib/prisma";

export const userRepository = {
  
  async create(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return prisma.user.create({
      data
    });
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
  },

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id }
    });
  },

  async findAll(skip: number, take: number) {
    return prisma.user.findMany({
      skip,
      take,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
    });
  },

  async count() {
    return prisma.user.count();
  },

  async update(id: string, data: {
    name?: string;
    email?: string;
  }) {
    return prisma.user.update({
      where: { id },
      data
    });
  },

  async delete(id: string) {
    return prisma.user.delete({
      where: { id }
    });
  },

  async updatePassword(id: string, password: string) {
    return prisma.user.update({
      where: { id },
      data: { password }
    });
  }

};