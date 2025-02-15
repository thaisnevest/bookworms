import { Router } from 'express';
import { ScoreController } from '../controllers';

const scoreRouter = Router();

scoreRouter.get('/ranking/:groupId', ScoreController.getRanking);
scoreRouter.put(
  '/createPost/:groupId/:userId/:postId',
  ScoreController.updateScoreAfterCreatePost,
);
scoreRouter.put(
  '/putPost/:groupId/:userId/:postId',
  ScoreController.updateScoreAfterPutPost,
);
scoreRouter.put(
  '/deletePost/:groupId/:userId',
  ScoreController.updateScoreAfterDeletePost,
);

export default scoreRouter;
