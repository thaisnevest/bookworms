import { z } from 'zod';

export const Group = z.object({
  name: z.string({
    invalid_type_error: 'The name should be a string',
    required_error: 'Group name is mandatory'
  })
  .regex(/^[a-zA-z0-9\s]+$/,{message: 'The name can only contain letters and numbers'}),

  image: z.object({
    mimetype: z.string().refine(val => ['image/jpeg', 'image/png'].includes(val), {
      message: 'the image must be a PNG OR JPG file'
    }),
    size: z.number().max(1024 * 1024, {
      message: 'the image must be smaller then 1MB'
    }),
    path: z.string()
  }),

  duration: z.preprocess(
    (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
    z.date({
      invalid_type_error: 'The duration should be a date',
      required_error: 'The duration is mandatory'
    })
  ),
  
  type: z.enum(['CHECKIN', 'PAGES'], {
    required_error: 'The competition type is mandatory'
  })
});
