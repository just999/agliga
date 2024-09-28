// import { z } from 'zod';

// const imageUrlValidator = z.any().optional();

// export const sliderSchema = z.object({
//   img: imageUrlValidator,
// });

// export type SliderSchema = z.infer<typeof sliderSchema>;

import { z } from 'zod';
import { imageUrlValidator } from '.';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const fileSchema = z
  .object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
  })
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    `File size should be less than 5MB.`
  )
  // .refine(
  //   (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
  //   'Only .jpg, .jpeg, .png and .webp formats are supported.'
  // );
  .refine(
    (file) => file.type.startsWith('image/'),
    'Only image files are allowed.'
  );

export const sliderSchema = z.object({
  img: z.union([z.instanceof(File), z.string()]),
});

export type SliderSchema = z.infer<typeof sliderSchema>;

export const addSliderSchema = z.object({
  img: z.instanceof(File, { message: 'Image file is required' }),
});

export type AddSliderSchema = z.infer<typeof addSliderSchema>;
