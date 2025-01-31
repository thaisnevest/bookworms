import { z } from 'zod';

export const Group = z.object({
  name: z.string({
    invalid_type_error: 'The name should be a string',
    required_error: 'Group name is mandatory'
  })
  .regex(/^[a-zA-z0-9\s]+$/,{message: 'The name can only contain letters and numbers'}),

  // image: z.custom<File>((file) => {
  //   if (!(file instanceof File)) {
  //     throw new Error('The image must be a valid file');
  //   }
  //   const maxSize = 1024 * 1024 // tamanho max da imagem;
  //   const validTypes = ['image/png'];
  //   if (!validTypes.includes(file.type)) {
  //     throw new Error('The image must be a PNG file');
  //   }
  //   if (file.size > maxSize) {
  //     throw new Error('The image must be smaller than 5 MB');
  //   }
  //   return true;
  // }, {
  //   message: 'Invalid file',
  // }),

  duration: z.date({
    invalid_type_error: 'The duration should be a date',
    required_error: 'The duration is mandatory'
  }),

  type: z.enum(['CHECKIN', 'PAGES'], {
    required_error: 'The competition type is mandatory'
  })
});
