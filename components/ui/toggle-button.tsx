'use client';

import useToggleFavorite from '@/hooks/use-toggle-favorite';
import { cn } from '@/lib/utils';
import useToggleStore from '@/store/use-favorite-store';
import { SafeUser } from '@/types';
import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
// Replace with your store path

type ToggleButtonProps = {
  size?: number;
  postId: string;
  className?: string;
  currentUser?: SafeUser | null;
};

const ToggleButton = ({
  className,
  currentUser,
  size,
  postId,
}: ToggleButtonProps) => {
  const { hasFavorited, handleToggleFavorite } = useToggleFavorite({
    postId,
    currentUser,
  });

  return (
    <button
      onClick={() => handleToggleFavorite}
      className={cn(`relative hover:opacity-80 transition cursor-pointer`)}
    >
      {hasFavorited ? (
        <AiOutlineHeart
          size={size}
          className='fill-white absolute -top-[2px] -right-[2px]'
        />
      ) : (
        <AiFillHeart
          size={size}
          className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
        />
      )}
    </button>
  );
};

export default ToggleButton;
