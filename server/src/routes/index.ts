import { Router } from 'express';
import GroupRoutes from './GroupRoutes';
import UserRoutes from './userRoutes';
import ScoreRoutes from './ScoreRoutes';

const router = Router();

router.use('/groups', GroupRoutes);
router.use('/score', ScoreRoutes);
router.route('/').get((_, res) => {
  res.status(200).send('made by bookworms');
});
router.use('/users', UserRoutes);

export default router;
