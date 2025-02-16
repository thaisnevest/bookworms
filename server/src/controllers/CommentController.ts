import { Request, Response } from 'express';
import { CommentRepository } from '../repositories/index';
import { Comment } from '../DTOs/index';
import { ZodError } from 'zod';

class CommentController {
  // Criar um comentário
  async createComment(req: Request, res: Response) {
    try {
      const validatedData = Comment.parse(req.body);
      const { postId, authorId, text } = validatedData;

      // Criando o comentário
      const newComment = await CommentRepository.create({
        post: {
          connect: { id: postId }, // conectando o post
        },
        author: {
          // agora estamos conectando o autor (usuário)
          connect: { id: authorId }, // conectando o autor (usuário)
        },
        text, // texto do comentário
      });

      res.status(201).json({
        message: 'Comentário criado com sucesso!',
        data: newComment,
      });
    } catch (error) {
      // Verificando se o erro é de validação do Zod
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => err.message);

        // Checar por mensagens específicas
        if (errorMessages.includes('The comment cannot be empty')) {
          res.status(400).json({ message: 'Comentário não pode ser vazio' });
        } else if (
          errorMessages.includes('The comment must not exceed 150 characters')
        ) {
          res
            .status(400)
            .json({ message: 'Comentário deve ter no máximo 150 caracteres' });
        } else {
          // Caso outros erros de validação sejam encontrados
          res.status(400).json({ message: errorMessages.join(', ') });
        }
      } else {
        // Para outros tipos de erro
        res.status(500).json({
          message: 'Erro ao criar comentário',
          error: (error as Error).message,
        });
      }
    }
  }

  // Buscar comentário por ID
  async getComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const comment = await CommentRepository.findById(commentId);
      if (!comment) {
        res.status(404).json({ message: 'Comentário não encontrado' });
        return;
      }

      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({
        message: 'Erro interno no servidor',
        error: (error as Error).message,
      });
    }
  }

  // Atualizar comentário
  async updateComment(req: Request, res: Response) {
    try {
      const validatedData = Comment.pick({ text: true }).parse(req.body);
      const { commentId } = req.params;

      const updatedComment = await CommentRepository.update(
        commentId,
        validatedData.text,
      );
      res.status(200).json({
        message: 'Comentário atualizado com sucesso',
        data: updatedComment,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Erro ao atualizar comentário',
        error: (error as Error).message,
      });
    }
  }

  // Deletar comentário
  async deleteComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;

      const deletedComment = await CommentRepository.delete(commentId);
      res.status(200).json({
        message: 'Comentário deletado com sucesso',
        data: deletedComment,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Erro ao deletar comentário',
        error: (error as Error).message,
      });
    }
  }

  // Buscar todos os comentários de um post
  async getCommentsByPost(req: Request, res: Response) {
    try {
      const { postId } = req.params;

      const comments = await CommentRepository.findByPostId(postId);
      if (comments.length === 0) {
        res.status(404).json({ message: 'Nenhum comentário encontrado' });
        return;
      }

      res.status(200).json({
        message: 'Comentários encontrados',
        data: comments,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Erro ao buscar comentários',
        error: (error as Error).message,
      });
    }
  }
}

export default new CommentController();
