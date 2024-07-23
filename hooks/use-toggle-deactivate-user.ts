import useToggleDeactivateUserStore from '@/store/use-favorite-store';
import { SafeUser } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';
import useModal from './use-modal';

type UseToggleDeactivateUserProps = {
  userId: string;
  currentUser?: SafeUser | null;
};

const useToggleDeactivateUser = ({
  userId,
  currentUser,
}: UseToggleDeactivateUserProps) => {
  const { favoritePosts, toggleFavorite } = useToggleDeactivateUserStore();

  const router = useRouter();
  const { onOpen } = useModal();

  const hasFavorited = useMemo(
    () => favoritePosts.includes(userId),
    [favoritePosts, userId]
  );

  const handleToggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) return onOpen('no-user');

      try {
        toggleFavorite(userId);

        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/profiles/${userId}`);
        } else {
          request = () => axios.post(`/api/profiles/${userId}`);
        }

        await request();
        router.refresh();
        toast.success('Success');
      } catch (err) {
        toast.error('Something went wrong');
      }
    },
    [currentUser, hasFavorited, userId, onOpen, toggleFavorite]
  );

  return { hasFavorited, handleToggleFavorite };
};

export default useToggleDeactivateUser;
