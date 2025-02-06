import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repositories/index';
import { UserDTO } from '../DTOs/index';

class UserController {
  async create(req: Request, res: Response) {
    try {
      const parsedData = UserDTO.parse(req.body);

      const existingUser = await UserRepository.findByUsernameOrEmail(
        parsedData.username,
      );
      if (existingUser) {
        return res.status(400).json({ message: 'O username já está em uso' });
      }

      const newUser = await UserRepository.create(parsedData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const parsedData = UserDTO.partial().parse(req.body);

      const updatedUser = await UserRepository.update(userId, parsedData);
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const deletedUser = await UserRepository.delete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res
        .status(200)
        .json({ message: 'Usuário deletado com sucesso', deletedUser });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserRepository.getAll();

      if (users.length === 0) {
        res.locals = {
          status: 404,
          message: 'Nenhum usuário encontrado',
          data: [],
        };
        return next();
      }

      res.locals = {
        status: 200,
        message: 'Usuários encontrados',
        data: users,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await UserRepository.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  async getByUsername(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const user = await UserRepository.findByUsernameOrEmail(username);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  async getByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const user = await UserRepository.findByUsernameOrEmail(email);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }
}

export default new UserController();
