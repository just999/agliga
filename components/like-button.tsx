'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { PiSpinnerGap } from 'react-icons/pi';

type LikeButtonProps = {
  toggleLike: () => void;
  hasLiked: boolean;
  loading: boolean;
};

const LikeButton = ({ toggleLike, loading, hasLiked }: LikeButtonProps) => {
  return (
    <>
      {!loading ? (
        <div
          onClick={toggleLike}
          className='relative hover:opacity-80 transition cursor-pointer'>
          <AiOutlineHeart
            size={28}
            className='fill-white absolute -top-[2px] -right-[2px] svg'
          />
          <AiFillHeart
            size={24}
            className={
              hasLiked ? 'fill-rose-500 svg' : 'fill-neutral-500/70 svg'
            }
          />
        </div>
      ) : (
        <PiSpinnerGap size={32} className='fill-white animate-spin' />
      )}
    </>
  );
};

export default LikeButton;
