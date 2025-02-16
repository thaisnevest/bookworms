import { Post } from '@prisma/client';
import prisma from '../database';

class FeedRepository {
  // pega todos os posts do feed de um grupo específico
  async getFeed(groupId: string): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: { groupId },
      orderBy: {
        createdAt: 'desc', // ordena por data de criação, do mais recente para o mais antigo
      },
    });
    return posts;
  }

  // pega todos os posts de um usuário específico
  async getUserFeed(userId: string, groupId: string): Promise<Post[]> {
    const userFeed = await prisma.post.findMany({
      where: {
        authorId: userId, 
        groupId, 
      },
      orderBy: {
        createdAt: 'desc', // ordena os posts do mais recente para o mais antigo
      },
    });
    return userFeed;
  }

}

export default new FeedRepository();
