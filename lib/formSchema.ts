import { z } from 'zod';

export const schema = z.object({
  title: z.string().trim().min(1, {
    message: 'Title is required.',
  }),
  img: z.array(z.instanceof(File)),
  category: z.string().trim().min(1, {
    message: 'Category is required.',
  }),
  author: z.string().trim().min(1, {
    message: 'Author is required.',
  }),
  brief: z.string().trim().min(5, {
    message: 'Brief is required.',
  }),
});
