import { Router } from 'express';
import FeedController from '../controllers/FeedController';

const router = Router();

router.get('/', (_, res) => {
  res.status(200).send('Feed API funcionando 🚀');
});

router.get('/groups/:groupId', FeedController.getFeed); // rota para pegar todos os posts do feed de um grupo
router.get('/groups/:groupId/user/:userId', FeedController.getUserFeed); // rota para pegar todos os posts de um usuário específico

export default router;