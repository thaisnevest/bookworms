import { Request, Response } from 'express';
import { feedRepository }from '../repositories/index';

class FeedController {
  // método para pegar todos os posts do feed de um grupo
  async getFeed(req: Request, res: Response): Promise<void> {
    const { groupId } = req.params;
    
    try {
      const posts = await feedRepository.getFeed(groupId); 
      if (posts.length === 0) {
        res.status(404).json({ message: 'Nenhum post encontrado!' });
        return;
      }
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'internal server error' });
    }
  }

  // método para filtrar os posts de um usuário específico
  async getUserFeed(req: Request, res: Response): Promise<void> {
    const { userId, groupId } = req.params;

    try {
      const userFeed = await feedRepository.getUserFeed(userId, groupId); 
      if (userFeed.length === 0) {
        res.status(404).json({ message: `Nenhum post encontrado para o usuário ${userId}.` });
        return;
      }
      res.status(200).json(userFeed);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `internal server error` });
    }
  }
}

export default new FeedController();
