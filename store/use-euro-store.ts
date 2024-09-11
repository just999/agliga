import { team } from '@/lib/helper';
import { EuroWithIconProps } from '@/types/types';
import { create } from 'zustand';

type EuroState = {
  items: EuroWithIconProps[];
  item: EuroWithIconProps;
  isLoading: boolean;
  error: any;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: any) => void;
  setItems: (items: EuroWithIconProps[]) => void;
  setItem: (item: EuroWithIconProps) => void;
};

const initialState = {
  items: [],
  item: {
    id: '',
    date: new Date(),
    euroTeamHome: team,
    homePenalty: [],
    homeScore: '',
    awayScore: '',
    euroTeamAway: team,
    group: '',
    awayPenalty: [],
  },
  isLoading: false,
  error: null,
};

const useEuroStore = create<EuroState>((set) => ({
  ...initialState,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setError: (error) => set(() => ({ error })),
  setItems: (items: EuroWithIconProps[]) => set(() => ({ items })),
  setItem: (item: EuroWithIconProps) => set(() => ({ item })),
}));

export default useEuroStore;
