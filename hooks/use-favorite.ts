import { SafeUser } from '@/types';

import useModal from './use-modal';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useFavoriteStore from '@/store/use-favorite-store';

type UseFavoriteProps = {
  postId: string;
  currentUser?: SafeUser;
};

const useFavorite = ({ postId, currentUser }: UseFavoriteProps) => {
  const {
    favoritePosts,
    toggleFavorite: storeToggleFavorite,
    addFavoritePost,
  } = useFavoriteStore();
  const { onOpen } = useModal();

  const [isFavorited, setIsFavorited] = useState(false);

  const hasFavorited = useMemo(() => {
    // if (!currentUser?.favoriteIds.length) throw new Error('no favorite');
    const list = currentUser?.favoriteIds || [];

    // list.forEach((id) => addFavoritePost(id));
    return list.includes(postId);
  }, [currentUser, postId]);

  useEffect(() => {
    setIsFavorited(hasFavorited);
    storeToggleFavorite(postId);
  }, [hasFavorited, postId, storeToggleFavorite]);
  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) return onOpen('no-user');

      try {
        storeToggleFavorite(postId);

        const res = await (isFavorited
          ? axios.delete(`/api/favorites/${postId}`)
          : axios.post(`/api/favorites/${postId}`));

        setIsFavorited((prev) => !prev);
        // router.refresh();
        toast.success('Success');
      } catch (err) {
        toast.error('Something went wrong');
      }
    },
    [currentUser, postId, onOpen, isFavorited, storeToggleFavorite]
  );

  // const toggleDislike = useCallback(
  //   async (e: React.MouseEvent<SVGElement>) => {
  //     e.stopPropagation();

  //     if (!currentUser) return onOpen('no-user');

  //     try {
  //       storeToggleFavorite(postId);

  //       if (!isFavorited) return;
  //       if (isFavorited) {
  //         const res = await axios.delete(`/api/favorites/${postId}`);

  //         setIsFavorited(false);
  //         toast.success('Success');
  //       }
  //     } catch (err) {
  //       toast.error('Something went wrong');
  //     }
  //   },
  //   [
  //     currentUser,
  //     isFavorited,
  //     postId,
  //     onOpen,
  //     hasFavorited,
  //     storeToggleFavorite,
  //   ]
  // );

  // const toggleLike = useCallback(
  //   async (e: React.MouseEvent<SVGElement>) => {
  //     e.stopPropagation();

  //     if (!currentUser) return onOpen('no-user');

  //     try {
  //       storeToggleFavorite(postId);

  //       if (isFavorited) return;
  //       if (!isFavorited) {
  //         const res = await axios.post(`/api/favorites/${postId}`);

  //         setIsFavorited(false);
  //         toast.success('Success');
  //       }
  //     } catch (err) {
  //       toast.error('Something went wrong');
  //     }
  //   },
  //   [
  //     currentUser,
  //     isFavorited,
  //     postId,
  //     onOpen,
  //     hasFavorited,
  //     storeToggleFavorite,
  //   ]
  // );

  return {
    hasFavorited,
    toggleFavorite,
    // toggleLike,
    // toggleDislike,
    isFavorited,
    setIsFavorited,
  };
};
export default useFavorite;
