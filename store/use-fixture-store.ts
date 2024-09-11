import { FixtureProps } from '@/types/types';
import { create } from 'zustand';

type FixtureState = {
  items: FixtureProps[];
  item: FixtureProps;
  isLoading: boolean;
  error: string | null;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setItems: (items: FixtureProps[]) => void;
  setItem: (item: FixtureProps) => void;
};

const initialState: Omit<
  FixtureState,
  'setIsLoading' | 'setError' | 'setItems' | 'setItem'
> = {
  items: [],
  item: {
    id: '',
    name: '',
    date: new Date(),
    week: null,
    teamHome: '',
    homePenalty: [],
    homeScore: '',
    homeHTScore: '',
    teamAway: '',
    awayPenalty: [],
    awayScore: '',
    awayHTScore: '',
  },
  isLoading: false,
  error: null,
};

const useFixturesStore = create<FixtureState>((set) => ({
  ...initialState,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setError: (error) => set(() => ({ error })),
  setItems: (items) => set(() => ({ items })),
  setItem: (item) => set(() => ({ item })),
}));

export default useFixturesStore;
