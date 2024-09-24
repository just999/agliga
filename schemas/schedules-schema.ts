import { z } from 'zod';

export const scheduleSchema = z.object({
  run: z.object({
    value: z.string(),
    icon: z.any(),
  }),
  date: z.string().min(1, {
    message: 'Date is required',
  }),
  teamHome: z.object({
    value: z.string(),
    icon: z.any(),
  }),
  score: z.optional(z.string()),
  teamAway: z.object({
    value: z.string(),
    icon: z.any(),
  }),
  analysis: z.optional(z.string()),
});

export type ScheduleSchema = z.infer<typeof scheduleSchema>;
