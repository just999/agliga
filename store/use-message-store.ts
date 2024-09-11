import { MessageDto } from '@/types';
import { User } from '@prisma/client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type MessageState = {
  user: User | null;
  admin: User | null;
  messages: MessageDto[];
  unreadCount: number;
  isToggle: boolean;
  setUser: (user: User) => void;
  setAdmin: (admin: User) => void;
  add: (message: MessageDto) => void;
  remove: (id: string) => void;
  setMessage: (messages: MessageDto[]) => void;
  updateUnreadCount: (amount: number) => void;
  resetMessages: () => void;
  setIsToggle: (isToggle: boolean) => void;
};

export const useMessageStore = create<MessageState>()(
  devtools(
    (set) => ({
      user: null,
      admin: null,
      messages: [],
      unreadCount: 0,
      isToggle: true,
      setUser: (user) => set({ user }),
      setAdmin: (admin) => set({ admin }),
      add: (message) =>
        set((state) => ({ messages: [message, ...state.messages] })),

      remove: (id) =>
        set((state) => ({
          messages: state.messages.filter((message) => message.id !== id),
        })),
      setMessage: (messages) =>
        set((state) => {
          const map = new Map(
            [...state.messages, ...messages].map((m) => [m.id, m])
          );
          const uniqueMessages = Array.from(map.values());
          return { messages: uniqueMessages };
        }),
      updateUnreadCount: (amount: number) =>
        set((state) => ({ unreadCount: state.unreadCount + amount })),
      resetMessages: () => set({ messages: [] }),
      setIsToggle: (isToggle) => set({ isToggle }),
    }),
    { name: 'messageStore' }
  )
);
