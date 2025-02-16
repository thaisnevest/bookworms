import { Router } from 'express';
import FeedController from '../controllers/FeedController';

const router = Router();

router.get('/group/:groupId', FeedController.getFeed); // rota para pegar todos os posts do feed de um grupo
router.get('/group/:groupId/user/:userId', FeedController.getUserFeed); // rota para pegar todos os posts de um usuário específico

export default router;