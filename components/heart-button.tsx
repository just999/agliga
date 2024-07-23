'use client';

import { useFavorite } from '@/hooks/use-favorite';
import { cn } from '@/lib/utils';
import { SafeUser } from '@/types';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

type HeartButtonProps = {
  size?: number;
  postId: string;
  className?: string;
  currentUser?: SafeUser;
  listingId?: string;
};

const HeartButton = ({
  className,
  currentUser,
  size,
  postId,
}: HeartButtonProps) => {
  const { hasFavorited, toggleFavorite, isFavorited } = useFavorite({
    postId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavorite}
      className={cn(
        'relative hover:opacity-80 transition cursor-pointer px-2',
        className
      )}
    >
      <AiOutlineHeart
        size={size}
        className='fill-white absolute -top-[2px] -right-[2px]'
      />

      <AiFillHeart
        size={size}
        className={isFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  );
};

export default HeartButton;
