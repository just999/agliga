'use client';

import { PostProps } from '@/types/types';
import Link from 'next/link';
import { BsDot } from 'react-icons/bs';
import PostAuthor from './post-author';

type SidePostItemProps = {
  i?: number;
  item: PostProps;
};

const SidePostItem = ({ item, i }: SidePostItemProps) => {
  return (
    <div className='post-entry-1 border-bottom border-b m-3 bg-slate-100 shadow-sm py-3'>
      <div className='post-meta flex items-center justify-start text-xs text-neutral-400 '>
        <span className='date '>{item.category}</span>
        <span className='mx-1 '>
          <BsDot />
        </span>
        <span>{new Date(item.date).toLocaleDateString('en-US')}</span>
      </div>
      <h2 className='mb-2 '>
        <Link href={`/posts/${item.id}`}>{item.title}</Link>
      </h2>
      {item && item.author && (
        // <span className='author mb-3 block text-xs '>{item.author}</span>
        <PostAuthor item={item} />
      )}

      {/* <hr /> */}
    </div>
  );
};

export default SidePostItem;
