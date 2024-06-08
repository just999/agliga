import { DepoWdProps } from '@/types';
import { create } from 'zustand';

type DepoWdState = {
  item: DepoWdProps;
  isLoading: boolean;
  error: any;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: any) => void;
  setItem: (item: DepoWdProps) => void;
};

const initialState = {
  isLoading: false,
  error: null,
  item: {
    name: '',
    email: '',
    bank: '',
    game: '',
    gameUserId: '',
    bankPT: '',
    accountNumber: '',
    depoAmount: 0,
    wdAmount: 0,
  },

  // setItems: (items: PostProps[]) => {},
  // setItem: (item: PostProps) => {},
};

const useDepoWdStore = create<DepoWdState>((set) => ({
  ...initialState,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setError: (error) => set(() => ({ error })),
  setItem: (item: DepoWdProps) => set(() => ({ item })),
}));

export default useDepoWdStore;
