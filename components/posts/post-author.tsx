'use client';

import { PostProps } from '@/types';
import Image from 'next/image';

type PostAuthorProps = {
  item: PostProps;
};

const PostAuthor = ({ item }: PostAuthorProps) => {
  if (!item) return;

  return (
    <div className='flex items-center author  white-space-nowrap '>
      <div className='photo w-4 h-4'>
        <Image
          src={item.avatar}
          alt='avatar'
          height={28}
          width={28}
          sizes='(max-width: 30px) 5vw, 10vw'
          priority
          className='img-fluid '
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className='name text-xs flex '>
        &nbsp;By:
        <p className='m-0 p-0 text-xs white-space-nowrap  '>
          {' '}
          &nbsp;{item.author}
        </p>
      </div>
    </div>
  );
};

export default PostAuthor;
