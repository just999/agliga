'use client';

import './trendingPost.css';
import { PostProps } from '@/types';

import Link from 'next/link';
import PostAuthor from './post-author';

type TrendingPostProps = {
  i: number;
  item: PostProps;
  className?: string;
};

const TrendingPost = ({ item, i, className }: TrendingPostProps) => {
  if (!item) return;
  return (
    <li className={className}>
      <Link href={`/posts/${item.id}`}>
        <span className='number'>{i}</span>
        <h2 className='text-sm font-semibold '>{item.title}</h2>
        {/* <span className='author'>{item.author}</span> */}
        <PostAuthor item={item} />
      </Link>
    </li>
  );
};

export default TrendingPost;
