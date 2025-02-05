import { z } from 'zod';

export const Comment = z.object({
  text: z
    .string({
      invalid_type_error: 'The text should be a string',
      required_error: 'Comment text is mandatory',
    })
    .min(1, { message: 'The comment cannot be empty' })
    .max(500, { message: 'The comment must not exceed 500 characters' }),

  postId: z.string({
    invalid_type_error: 'Post ID must be a string',
    required_error: 'Post ID is mandatory',
  }),

  authorId: z.string({
    invalid_type_error: 'Author ID must be a string',
    required_error: 'Author ID is mandatory',
  }),
});
