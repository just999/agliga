import { z } from 'zod';
import { numSchema } from './togel-schema';

const bigSmallOddEvenEnum = z.enum(['big', 'small', 'odd', 'even']);

const gameEnum = z.enum(['2dd', '2dt', '2d']);

const bseo4dArraySchema = z.array(numSchema);

export const bseoSchema = z.object({
  bseo: bigSmallOddEvenEnum,
  bseoArray: bseo4dArraySchema,
  game: gameEnum,
  wager: z.optional(z.string()),
});

export type Bseo4dSchema = z.infer<typeof bseoSchema>['bseoArray'][number];
export type BseoSchema = z.infer<typeof bseoSchema>;
