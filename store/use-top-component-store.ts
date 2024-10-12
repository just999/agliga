// store/topComponentStore.ts
import { create } from 'zustand';
import { ReactNode } from 'react';

interface TopComponentState {
  content: ReactNode | null;
  showComponent: (content: ReactNode) => void;
  hideComponent: () => void;
}

export const useTopComponentStore = create<TopComponentState>((set) => ({
  content: null,
  showComponent: (content) => set({ content }),
  hideComponent: () => set({ content: null }),
}));
