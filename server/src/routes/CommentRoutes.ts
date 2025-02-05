import { Router } from 'express';
import { CommentController } from '../controllers';

const commentRoutes = Router();

commentRoutes.post('/', CommentController.createComment); // Criar comentário
commentRoutes.get('/comment/:commentId', CommentController.getComment); // Obter comentário específico
commentRoutes.get('/post/:postId', CommentController.getCommentsByPost); // Obter comentários por post
commentRoutes.put('/:commentId', CommentController.updateComment); // Atualizar comentário
commentRoutes.delete('/:commentId', CommentController.deleteComment); // Deletar comentário

export default commentRoutes;
