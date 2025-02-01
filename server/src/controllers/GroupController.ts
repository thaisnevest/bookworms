import { NextFunction, Request, Response } from 'express';
import { GroupRepository } from '../repositories/index';
import { Group } from '../DTOs/index';
import uploadImage from '../services/cloudinaryService';

class GroupController {
  async createGroup(req: Request, res: Response) {
    try {
      const { groupName, groupDuration, groupType } = req.body;
      if (!groupName || !req.file || !groupDuration) {
        res.status(400).json('Campo obrigatório não preenchido');
        return;
      }

      const imageUrl = await uploadImage(req.file.path);

      const newGroup = await GroupRepository.create({
        name: groupName,
        image: imageUrl,
        duration: groupDuration,
        type: groupType,
        active: true,
        code: '',
      });
      res.status(200).json(newGroup);
    } catch (error) {
      res.status(500).json({
        error: 'internal server error',
      });
    }
  }

  async getGroup(req: Request, res: Response) {
    try {
      const { groupId } = req.params;
      const group = await GroupRepository.findById(groupId);
      if (!group) {
        res.status(404).json({ message: 'Grupo não encontrado' });
        return;
      }

      res.status(200).json(group);
    } catch (error) {
      res.status(500).json({
        message: 'internal server error',
        error: (error as Error).message,
      });
    }
  }

  async enterGroup(req: Request, res: Response) {
    try {
      const { groupCode, userId } = req.params;
      const checkGroup = await GroupRepository.findByCode(groupCode);
      if (!checkGroup) {
        res.status(404).json({ message: 'Grupo não encontrado' });
        return;
      }

      await GroupRepository.changeScoreSingle(userId, 0);
      // falta checar se o user existe, falta as rotas do user para isso(eu não sei se é necessário mesmo pq o user vai estar logado, como ele não vai existir?)

      const updatedGroup = await GroupRepository.enter(groupCode, userId);
      res.status(200).json(updatedGroup);
    } catch (error) {
      res.status(500).json({
        error: 'internal server error',
      });
    }
  }

  async leaveGroup(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      // falta checar se o user existe, é necessário as rotas do user para isso

      const updatedUser = await GroupRepository.leave(userId);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({
        error: 'internal server error',
      });
    }
  }

  async resetGroup(req: Request, res: Response) {
    try {
      const { groupId } = req.params;

      const group = await GroupRepository.findById(groupId);
      if (!group) {
        res.status(404).json({ message: 'Grupo não encontrado' });
        return;
      }

      const duration = group.duration.getTime() - group.createdAt.getTime();
      const newDate = new Date();
      newDate.setMilliseconds(newDate.getMilliseconds() + duration);
      await GroupRepository.changeScoreMultiple(groupId, 0);

      const updatedGroup = await GroupRepository.reset(groupId, newDate);
      res.status(200).json({ message: 'Competição reiniciada', updatedGroup });
    } catch (error) {
      res.status(500).json({
        error: 'internal server error',
      });
    }
  }

  async deleteGroup(req: Request, res: Response) {
    try {
      const { groupId } = req.params;

      const group = await GroupRepository.findById(groupId);
      if (!group) {
        res.status(404).json({ message: 'Grupo não encontrado' });
        return;
      }

      const deletedGroup = await GroupRepository.delete(groupId);

      res.status(200).json({ message: 'Grupo deletado', deletedGroup });
    } catch (error) {
      res.status(500).json({
        error: 'internal server error',
      });
    }
  }

  async getAllGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const groups = await GroupRepository.getAll();

      res.locals = {
        status: 200,
        message: 'Grupos encontrados',
        data: groups,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getRanking(req: Request, res: Response, next: NextFunction) {
    try {
      const { groupId } = req.params;

      const group = await GroupRepository.findById(groupId);
      if (!group) {
        return next({
          status: 404,
          message: 'Grupo não encontrado',
        });
      }

      const ranking = await GroupRepository.ranking(groupId);

      res.locals = {
        status: 200,
        message: 'Ranking encontrado',
        data: ranking,
      };

      return next();
    } catch (error) {
      return next({
        status: 500,
        message: 'internal server error',
      });
    }
  }
}

export default new GroupController();
