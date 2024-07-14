import { DepoProps, WdProps } from '@/types';
import { create } from 'zustand';

type DepoWdState = {
  depo: DepoProps;
  depos: DepoProps[];
  wd: WdProps;
  wds: WdProps[];
  isLoading: boolean;
  error: any;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: any) => void;
  setDepo: (depo: DepoProps) => void;
  setDepos: (depos: DepoProps[]) => void;
  setWd: (wd: WdProps) => void;
  setWds: (wds: WdProps[]) => void;
};

const initialState = {
  isLoading: false,
  error: null,
  depos: [],
  depo: {
    name: '',
    email: '',
    bank: '',
    game: '',
    gameUserId: '',
    bankPT: '',
    accountNumber: '',
    depoAmount: null,
    status: '',
  },
  wds: [],
  wd: {
    name: '',
    email: '',
    bank: '',
    game: '',
    gameUserId: '',
    accountNumber: '',
    wdAmount: null,
    status: '',
  },

  // setDepos: (depos: PostProps[]) => {},
  // setDepo: (depo: PostProps) => {},
};

const useDepoWdStore = create<DepoWdState>((set) => ({
  ...initialState,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setError: (error) => set(() => ({ error })),
  setDepo: (depo: DepoProps) => set(() => ({ depo })),
  setDepos: (depos: DepoProps[]) => set(() => ({ depos })),
  setWd: (wd: WdProps) => set(() => ({ wd })),
  setWds: (wds: WdProps[]) => set(() => ({ wds })),
}));

export default useDepoWdStore;
