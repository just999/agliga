import { FixtureProps } from '@/types';
import { create } from 'zustand';

type FixtureState = {
  items: FixtureProps[];
  item: FixtureProps;
  isLoading: boolean;
  error: any;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: any) => void;
  setItems: (items: FixtureProps[]) => void;
  setItem: (item: FixtureProps) => void;
};

const initialState = {
  items: [],
  item: {
    name: '',
    date: new Date().toISOString(),
    teamHome: '',
    homePenalty: [],
    homeScore: '',
    homeHTScore: '',
    teamAway: '',
    awayPenalty: [],
    awayScore: '',
    awayHTScore: '',
    week: null,
    userId: '',
  },
  isLoading: false,
  error: null,
};

const useFixturesStore = create<FixtureState>((set) => ({
  ...initialState,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setError: (error) => set(() => ({ error })),
  setItems: (items: FixtureProps[]) => set(() => ({ items })),
  setItem: (item: FixtureProps) => set(() => ({ item })),
}));

export default useFixturesStore;
