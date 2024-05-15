import { PostProps } from '@/types';
import { create } from 'zustand';

type PostState = {
  items: PostProps[];
  item: PostProps;
  itemBySlugAndPostId: PostProps;
  isLoading: boolean;
  error: any;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: any) => void;
  setItems: (items: PostProps[]) => void;
  setItem: (item: PostProps) => void;
  setItemBySlugAndPostId: (item: PostProps) => void;
};

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  itemBySlugAndPostId: {
    id: '',
    img: '',
    category: '',
    title: '',
    date: new Date(),
    brief: '',
    avatar: '',
    author: '',
    topicId: '',
    top: false,
    trending: false,
    comments: [{ id: '', content: '' }],
  },
  item: {
    // Include properties of the defaultPost object here
    id: '',
    img: '',
    category: '',
    title: '',
    date: new Date(),
    brief: '',
    avatar: '',
    topicId: '',
    author: '',
    top: false,
    trending: false,
    comments: [{ id: '', content: '' }],
  },

  // setItems: (items: PostProps[]) => {},
  // setItem: (item: PostProps) => {},
};

const usePostsStore = create<PostState>((set) => ({
  ...initialState,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setError: (error) => set(() => ({ error })),
  setItems: (items: PostProps[]) => set(() => ({ items })),
  setItem: (item: PostProps) => set(() => ({ item })),
  setItemBySlugAndPostId: (itemBySlugAndPostId: PostProps) =>
    set(() => ({ itemBySlugAndPostId })),
}));

export default usePostsStore;
