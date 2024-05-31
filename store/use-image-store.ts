'use client';

import { create } from 'zustand';

type UseImageStoreProps = {
  images: string;
  error: any;
  isLoading: boolean;
  setImages: (image: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: any) => void;
};

export const useImageStore = create<UseImageStoreProps>((set) => ({
  images: '',
  isLoading: false,
  error: null,
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
  setError: (error) => set(() => ({ error })),
  setImages: (image: string) =>
    set((state) => ({
      images: state.images ? `${state.images},${image}` : image,
    })),
}));
