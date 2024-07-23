import { UserProps } from '@/types';
import { create } from 'zustand';

// export type UserProps = {
//   id: string;
//   name: string | null;
//   email: string | null;
//   active: boolean | null;
//   phone: string | null;
//   bank: string;
//   game: string;
//   accountNumber: string;
//   image: string | null;
//   password: string | null;
//   role: 'admin' | 'user';
//   favoriteIds: string[];
// };

export const userData: UserProps = {
  id: '',
  name: '',
  email: '',
  active: null,
  phone: '',
  bank: null,
  game: [],
  accountNumber: '',
  image: null,
  password: null,
  role: 'user',
  favoriteIds: [],
};

type UserId = string;

interface UserState {
  user: UserProps;
  users: UserProps[];
  userActive: Record<UserId, boolean>;
  loading: boolean;
  error: string | null;
  setUser: (user: UserProps) => void;
  setUsers: (user: UserProps[]) => void;
  initializeUser: (userId: UserId, status: boolean) => void;
  toggleUserStatus: (userId: UserId) => void;
  setUserStatus: (userId: UserId, status: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const initialState = {
  user: userData,
  users: [],
  userActive: {},
  loading: false,
  error: null,
};

const useUserStore = create<UserState>((set) => ({
  ...initialState,
  setUser: (user: UserProps) => set(() => ({ user })),
  setUsers: (users: UserProps[]) => set(() => ({ users })),
  initializeUser: (userId: UserId, status: boolean) =>
    set((state) => ({
      users: {
        ...state.users,
        [userId]: status,
      },
    })),

  toggleUserStatus: (userId: UserId) =>
    set((state) => ({
      userActive: {
        ...state.userActive,
        [userId]: !state.userActive[userId],
      },
      error: null,
    })),

  setUserStatus: (userId: UserId, status: boolean) =>
    set((state) => ({
      users: {
        ...state.users,
        [userId]: status,
      },
      error: null,
    })),

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));

export default useUserStore;
