import useFavoriteStore from '@/store/use-favorite-store';
import { SafeUser } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';
import useModal from './use-modal';

type UseFavoriteProps = {
  postId: string;
  currentUser?: SafeUser | null;
};

const useToggleFavorite = ({ postId, currentUser }: UseFavoriteProps) => {
  const { favoritePosts, toggleFavorite } = useFavoriteStore();

  const router = useRouter();
  const { onOpen } = useModal();

  const hasFavorited = useMemo(
    () => favoritePosts.includes(postId),
    [favoritePosts, postId]
  );

  const handleToggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) return onOpen('no-user');

      try {
        toggleFavorite(postId);

        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${postId}`);
        } else {
          request = () => axios.post(`/api/favorites/${postId}`);
        }

        await request();
        // router.refresh();
        toast.success('Success');
      } catch (err) {
        toast.error('Something went wrong');
      }
    },
    [currentUser, hasFavorited, postId, onOpen, toggleFavorite]
  );

  return { hasFavorited, handleToggleFavorite };
};

export default useToggleFavorite;
