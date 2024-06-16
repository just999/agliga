import { EuroProps } from '@/types';
import { create } from 'zustand';

type EuroState = {
  items: EuroProps[];
  item: EuroProps;
  isLoading: boolean;
  error: any;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: any) => void;
  setItems: (items: EuroProps[]) => void;
  setItem: (item: EuroProps) => void;
};

const initialState = {
  items: [],
  item: {
    id: '',
    date: new Date(),
    euroTeamHome: {
      value: '',
      icon: '',
    },
    homePenalty: [],
    homeScore: '',
    awayScore: '',
    status: '',
    group: '',
    euroTeamAway: {
      value: '',
      icon: '',
    },
    awayPenalty: [],
  },
  isLoading: false,
  error: null,
};

const useEuroStore = create<EuroState>((set) => ({
  ...initialState,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setError: (error) => set(() => ({ error })),
  setItems: (items: EuroProps[]) => set(() => ({ items })),
  setItem: (item: EuroProps) => set(() => ({ item })),
}));

export default useEuroStore;
