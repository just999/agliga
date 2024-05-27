'use client';

import { create } from 'zustand';

type UseImageStoreProps = {
  images: File[];
  addImage: (image: File) => void;
  removeImage: (image: File | string) => void;
};

export const useImageStore = create<UseImageStoreProps>((set) => ({
  images: [],
  addImage: (image) => set((state) => ({ images: [...state.images, image] })),
  removeImage: (imageToRemove) =>
    set((state) => ({
      images: state.images.filter((image) => image !== imageToRemove),
    })),
}));
