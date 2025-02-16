import { Router } from 'express';
import GroupRoutes from './GroupRoutes';
import CommentRoutes from './CommentRoutes';
import ScoreRoutes from './ScoreRoutes';

const router = Router();

router.use('/groups', GroupRoutes);
router.use('/comments', CommentRoutes);
router.use('/score', ScoreRoutes);
router.route('/').get((_, res) => {
  res.status(200).send('made by bookworms');
});

export default router;
