import { User } from '@prisma/client';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type PresenceState = {
  users: User[];
  usersId: string[];
  add: (id: string) => void;
  addUsers: (users: User) => void;
  remove: (id: string) => void;
  removeUser: (userId: string) => void;
  set: (ids: string[]) => void;
  setUsers: (users: User[]) => void;
};

export const usePresenceStore = create<PresenceState>()(
  devtools(
    (set) => ({
      users: [],
      usersId: [],
      add: (id) => set((state) => ({ usersId: [...state.usersId, id] })),
      addUsers: (user) => set((state) => ({ users: [...state.users, user] })),
      remove: (id) =>
        set((state) => ({
          usersId: state.usersId.filter((userId) => userId !== id),
        })),
      removeUser: (userId: string) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== userId),
        })),
      set: (ids) => set({ usersId: ids }),
      setUsers: (users) => set({ users: users }),
    }),
    { name: 'PresenceStoreDemo' }
  )
);
