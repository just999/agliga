import { z } from 'zod';

export const nonMember = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z.string().email({
    message: 'Email is required',
  }),
});

export type NonMember = z.infer<typeof nonMember>;

export const liveChatNotification = z.object({
  notification: z.string().min(1, {
    message: 'notification required',
  }),
});
export type LiveChatNotification = z.infer<typeof liveChatNotification>;
