'use client';

import './trendingPost.css';
import { PostProps } from '@/types';
import { EB_Garamond } from 'next/font/google';

import Link from 'next/link';
import PostAuthor from './post-author';
import { cn } from '@/lib/utils';

const eb = EB_Garamond({ subsets: ['latin'] });

type TrendingPostProps = {
  i: number;
  item: PostProps;
  className?: string;
};

const TrendingPost = ({ item, i, className }: TrendingPostProps) => {
  if (!item) return;
  return (
    <li className={className}>
      <Link href={`/posts/${item.id}`} className='mx-4 py-2'>
        <span className='number'>{i}</span>
        <h2 className={cn('text-sm font-normal ', eb.className)}>
          {item.title}
        </h2>
        {/* <span className='author'>{item.author}</span> */}
        <PostAuthor item={item} />
      </Link>
    </li>
  );
};

export default TrendingPost;
