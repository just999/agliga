import { PostProps } from '@/types/types';
import { create } from 'zustand';

type PostState = {
  items: PostProps[];
  item: PostProps;
  randomItem: PostProps | null;
  isLoading: boolean;
  error: any;
  itemBySlugAndPostId: PostProps;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: any) => void;
  setItems: (items: PostProps[]) => void;
  setItem: (item: PostProps) => void;
  setRandomItem: (item: PostProps) => void;
  setItemBySlugAndPostId: (itemBySlugAndPostId: PostProps) => void;
};

// !Default post object to use as an initial state
const emptyPostItem: PostProps = {
  id: '',
  img: '',
  category: '', // Assuming icon can be null
  title: '',
  date: new Date().toISOString(),
  brief: '',
  avatar: '',
  author: '',
  topicId: '',
  comments: [],
  top: false,
  trending: false,
  userId: null,
};

// !Initial state definition
const initialState = {
  items: [],
  isLoading: false,
  error: null,
  randomItem: null,
  item: emptyPostItem,
  itemBySlugAndPostId: emptyPostItem,
};

const usePostsStore = create<PostState>((set) => ({
  ...initialState,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setError: (error) => set(() => ({ error })),
  setItems: (items: PostProps[]) => set(() => ({ items })),
  setItem: (item: PostProps) => set(() => ({ item })),
  // setRandomItem: (randomItem: PostProps) => set(() => ({ randomItem })),
  setRandomItem: () => {
    if (initialState.items.length > 0) {
      const randomIndex = Math.floor(Math.random() * initialState.items.length);
      const randomItem = initialState.items[randomIndex];
      set(() => ({ randomItem })); // Update itemRand using setter
    } else {
      console.warn('No posts available to select a random item.');
    }
  },
  setItemBySlugAndPostId: (itemBySlugAndPostId: PostProps) =>
    set(() => ({ itemBySlugAndPostId })),
}));

export default usePostsStore;
