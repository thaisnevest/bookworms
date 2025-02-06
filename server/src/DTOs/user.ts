import { z } from 'zod';

export const UserDTO = z.object({
  name: z
    .string({
      required_error: 'O nome é obrigatório',
      invalid_type_error: 'O nome deve ser uma string',
    })
    .min(1, { message: 'O nome não pode ser vazio' })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
      message: 'O nome deve conter apenas letras',
    }),

  username: z
    .string({
      required_error: 'O username é obrigatório',
      invalid_type_error: 'O username deve ser uma string',
    })
    .min(3, { message: 'O username deve ter pelo menos 3 caracteres' }),

  email: z
    .string({
      required_error: 'O email é obrigatório',
      invalid_type_error: 'O email deve ser uma string',
    })
    .email({ message: 'O email informado não é válido' }),

  password: z
    .string({
      required_error: 'A senha é obrigatória',
      invalid_type_error: 'A senha deve ser uma string',
    })
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),

  bio: z.string().optional(),
  image: z
    .string()
    .url({ message: 'A imagem deve ser uma URL válida' })
    .optional(),
});
