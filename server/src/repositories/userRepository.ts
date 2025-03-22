import { Prisma, User } from '@prisma/client';
import prisma from '../database';

class UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    if (data.password.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres.');
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });

    if (existingUser) {
      throw new Error('Username ou email já estão em uso.');
    }

    const newUser = await prisma.user.create({
      data,
    });

    return newUser;
  }

  async findById(userId: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async findByUsernameOrEmail(identifier: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
      },
    });
  }

  async update(
    userId: string,
    data: Partial<Prisma.UserUpdateInput>,
  ): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async delete(userId: string): Promise<User> {
    return prisma.user.delete({
      where: { id: userId },
    });
  }

  async getAll(): Promise<User[]> {
    return prisma.user.findMany();
  }
}

export default new UserRepository();
