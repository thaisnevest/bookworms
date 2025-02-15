import { User } from '@prisma/client';
import prisma from '../database';

class ScoreRepository {
  async ranking(groupId: string): Promise<User[]> {
    const ranking = await prisma.user.findMany({
      where: { groupId },
      orderBy: [{ score: 'desc' }, { name: 'asc' }],
    });

    return ranking;
  }

  async addScore(userId: string, score: number): Promise<User> {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        score: {
          increment: score,
        },
      },
    });
    return user;
  }

  async removeScore(userId: string, score: number): Promise<User> {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        score: {
          decrement: score,
        },
      },
    });
    return user;
  }
}

export default new ScoreRepository();
