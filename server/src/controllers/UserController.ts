import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repositories/index';
import { UserDTO } from '../DTOs/index';
import { ZodError } from 'zod';

class UserController {
  async create(req: Request, res: Response) {
    try {
      // console.log('🔹 Recebendo requisição de cadastro:', req.body);

      const parsedData = UserDTO.parse(req.body);
      // console.log('✅ Dados validados com sucesso:', parsedData);

      const existingUser = await UserRepository.findByUsernameOrEmail(
        parsedData.username,
      );
      if (existingUser) {
        // console.log('⚠️ Usuário já existe:', existingUser);
        return res.status(400).json({ message: 'O username já está em uso' });
      }

      const newUser = await UserRepository.create(parsedData);
      // console.log('🎉 Usuário criado com sucesso:', newUser);

      return res.status(201).json({
        message: 'Cadastro realizado com sucesso',
        user: newUser,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // console.log('❌ Erro de validação:', error.errors);
        return res.status(400).json({
          message: error.errors[0].message,
          errors: error.errors,
        });
      }

      // console.error('🔥 Erro inesperado:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
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
