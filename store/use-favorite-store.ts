import { create } from 'zustand';

interface FavoriteState {
  isActive: boolean;
  activeUsers: string[];
  favoritePosts: string[];
  addFavoritePost: (postId: string) => void;
  toggleFavorite: (postId: string) => void;
  addActiveUser: (userId: string) => void;
  toggleActive: (userId: string) => void;
}

const useFavoriteStore = create<FavoriteState>((set) => ({
  isActive: true,
  activeUsers: [],
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
  addActiveUser: (userId) =>
    set((state) => ({ activeUsers: [...state.activeUsers, userId] })),
  toggleActive: (userId) =>
    set((state) => {
      const isActivated = state.activeUsers.includes(userId);
      const updatedActive = isActivated
        ? state.activeUsers.filter((id) => id !== userId)
        : [...state.activeUsers, userId];

      return { ...state, activeUsers: updatedActive };
    }),
}));

export default useFavoriteStore;
