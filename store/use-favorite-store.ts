import { create } from 'zustand';

interface FavoriteState {
  favoritePosts: string[];
  addFavoritePost: (postId: string) => void;
  toggleFavorite: (postId: string) => void;
}

const useFavoriteStore = create<FavoriteState>((set) => ({
  favoritePosts: [],
  addFavoritePost: (postId) =>
    set((state) => ({ favoritePosts: [...state.favoritePosts, postId] })),
  toggleFavorite: (postId) =>
    set((state) => {
      const isFavorited = state.favoritePosts.includes(postId);
      const updatedFavorites = isFavorited
        ? state.favoritePosts.filter((id) => id !== postId)
        : [...state.favoritePosts, postId];

      return { ...state, favoritePosts: updatedFavorites };
    }),
}));

export default useFavoriteStore;
