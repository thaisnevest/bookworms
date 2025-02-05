import { Router } from 'express';
import GroupRoutes from './GroupRoutes';
import CommentRoutes from './CommentRoutes';

const router = Router();

router.use('/groups', GroupRoutes);
console.log('✅ Rotas registradas!');
router.use('/comments', CommentRoutes);
router.route('/').get((_, res) => {
  res.status(200).send('made by bookworms');
});

export default router;
