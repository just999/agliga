import { CommentProps } from '@/types';

import { create } from 'zustand';

type CommentState = {
  comment: CommentProps;
  comments: CommentProps[];
  isLoading: boolean;
  error: any;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: any) => void;
  setComments: (comments: CommentProps[]) => void;
  setComment: (comment: CommentProps) => void;
};

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
  comment: {
    id: '',
    content: '',
    parentId: '',
    postId: '',
  },
};

// setComments: (comments: Comment[]) => {},
// setComment: (comment: Comment) => {},

const useCommentsStore = create<CommentState>((set) => ({
  ...initialState,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setError: (error) => set(() => ({ error })),
  setComments: (comments: CommentProps[]) => set(() => ({ comments })),
  setComment: (comment: CommentProps) => set(() => ({ comment })),
}));

export default useCommentsStore;
