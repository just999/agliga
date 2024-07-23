import { create } from 'zustand';

type UserId = string | number;

interface UserState {
  users: Record<UserId, boolean>;
  toggleUserStatus: (userId: UserId) => void;
  setUserStatus: (userId: UserId, status: boolean) => void;
}

const useUserIsActiveStore = create<UserState>((set) => ({
  users: {},

  toggleUserStatus: (userId: UserId) => {
    set((state) => ({
      users: {
        ...state.users,
        [userId]: !state.users[userId],
      },
    }));
  },

  setUserStatus: (userId: UserId, status: boolean) => {
    set((state) => ({
      users: {
        ...state.users,
        [userId]: status,
      },
    }));
  },
}));

export default useUserIsActiveStore;
