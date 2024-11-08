import { BbTab4dSchema } from '@/schemas/togel-schema';
import { create } from 'zustand';

interface BbfsState {
  bbfs: BbTab4dSchema[];
  setBbfs: (bbfs: BbTab4dSchema[]) => void;
}

export const useBbfsStore = create<BbfsState>((set) => ({
  bbfs: [],
  setBbfs: (bbfs) => set({ bbfs }),
}));
