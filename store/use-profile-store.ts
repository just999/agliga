import { PostProps, ProfileProps } from '@/types';
import { create } from 'zustand';

type ProfileState = {
  item: ProfileProps;
  isPasswordVerified: boolean;
  isLoading: boolean;
  error: any;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: any) => void;
  setItem: (item: ProfileProps) => void;
  setIsPasswordVerified: (isPasswordVerified: boolean) => void;
};

const initialState = {
  isLoading: false,
  error: null,
  isPasswordVerified: false,
  item: {
    name: '',
    bank: '',
    accountNumber: '',
    email: '',
    game: [],
    image: '',
    phone: '',
  },

  // setItems: (items: PostProps[]) => {},
  // setItem: (item: PostProps) => {},
};

const useProfileStore = create<ProfileState>((set) => ({
  ...initialState,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setError: (error) => set(() => ({ error })),
  setItem: (item: ProfileProps) => set(() => ({ item })),
  setIsPasswordVerified: (isPasswordVerified) =>
    set(() => ({ isPasswordVerified })),
}));

export default useProfileStore;
