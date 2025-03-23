import {Request, Response, NextFunction} from 'express';
import { PostRepository } from '../repositories';
import {Post} from '../DTOs';

class PostController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const post = Post.parse(req.body);
      const newPost = await PostRepository.create(post);
      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const post = Post.parse(req.body);
      const updatedPost = await PostRepository.update(req.params.id, post);
      res.json(updatedPost);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await PostRepository.delete(req.params.id);
      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await PostRepository.findById(req.params.id);
      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async getUserPostsin(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await PostRepository.getUserPostsin(req.params.authorId, new Date(req.params.date));
      res.json(posts);
    } catch (error) {
      next(error);
    }
  }
}

export default new PostController(); 