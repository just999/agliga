import { Sin4dSchema, Sin4dSetSchema } from '@/schemas/togel-schema';
import { Pools4d } from '@/types/types';
import { Sin4d, User } from '@prisma/client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TogelState = {
  user: User | null;
  sin4d: Sin4dSchema[];
  sin4dSet: Sin4dSetSchema[];
  togels: Pools4d[];
  unreadCount: number;
  isToggle: boolean;
  setUser: (user: User) => void;
  setSin4dSet: (sin4dSet: Sin4dSetSchema[]) => void;
  setSin4d: (sin4d: Sin4dSchema[]) => void;
  add: (togel: Sin4d) => void;
  remove: (id: string) => void;
  setTogel: (togels: Pools4d[]) => void;
  updateUnreadCount: (amount: number) => void;
  resetTogels: () => void;
  setIsToggle: (isToggle: boolean) => void;
};

export const useTogelStore = create<TogelState>()(
  devtools(
    (set) => ({
      user: null,
      sin4dSet: [],
      sin4d: [],
      togels: [],
      unreadCount: 0,
      isToggle: false,
      setUser: (user) => set({ user }),
      setSin4dSet: (sin4dSet) => set({ sin4dSet }),
      setSin4d: (sin4d) => set({ sin4d }),
      add: (togel: Pools4d) =>
        set((state) => ({ togels: [togel, ...state.togels] })),
      remove: (id) =>
        set((state) => ({
          togels: state.togels.filter((togel) => togel.id !== id),
        })),
      setTogel: (togels) =>
        set((state) => {
          const map = new Map(
            [...state.togels, ...togels].map((m) => [m.id, m])
          );
          const uniqueTogels = Array.from(map.values());
          return { togels: uniqueTogels };
        }),
      updateUnreadCount: (amount: number) =>
        set((state) => ({ unreadCount: state.unreadCount + amount })),
      resetTogels: () => set({ togels: [] }),
      setIsToggle: (isToggle) => set({ isToggle: !isToggle }),
    }),
    { name: 'togelStore' }
  )
);
