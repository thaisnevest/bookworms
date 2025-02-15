import { Post } from '@prisma/client';
import prisma from '../database';

class PostRepository {
  async findById(postId: string): Promise<Post | null> {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    return post;
  }

  // posts from a specific user in a specific date
  async getUserPostsin(authorId: string, date: Date): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: {
        authorId,
        createdAt: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lt: new Date(date.setHours(24, 0, 0, 0)),
        },
      },
    });
    return posts;
  }
}

export default new PostRepository();
