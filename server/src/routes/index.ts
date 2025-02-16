import { Router } from 'express';
import GroupRoutes from './GroupRoutes';
import ScoreRoutes from './ScoreRoutes';
import FeedRoutes from './FeedRoutes';

const router = Router();

router.use('/feed', FeedRoutes);
router.use('/groups', GroupRoutes);
router.use('/score', ScoreRoutes);
router.route('/').get((_, res) => {
  res.status(200).send('made by bookworms');
});


export default router;
