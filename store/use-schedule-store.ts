import { ScheduleProps } from '@/types/types';
import { create } from 'zustand';

type ScheduleState = {
  items: ScheduleProps[];
  item: ScheduleProps;
  isLoading: boolean;
  error: any;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: any) => void;
  setItems: (items: ScheduleProps[]) => void;
  setItem: (item: ScheduleProps) => void;
};

const initialState = {
  items: [],
  item: {
    id: '',
    run: 0,
    date: new Date(),
    teamHome: '',
    score: 'VS',
    teamAway: '',
    analysis: '',
  },
  isLoading: false,
  error: null,
};

const useSchedulesStore = create<ScheduleState>((set) => ({
  ...initialState,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setError: (error) => set(() => ({ error })),
  setItems: (items: ScheduleProps[]) => set(() => ({ items })),
  setItem: (item: ScheduleProps) => set(() => ({ item })),
}));

export default useSchedulesStore;
