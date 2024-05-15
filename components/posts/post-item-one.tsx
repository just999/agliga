'use client';

import './postItemOne.css';

import Link from 'next/link';
import Image from 'next/image';
// import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { BsDot } from 'react-icons/bs';
import Loader from '../loader';
import { PostProps, SafeUser } from '@/types';
// import ClientOnly from '@/lib/client-only';
import PostAuthor from './post-author';
import VerticalDropdown from './vertical-dropdown';
import HeartButton from '../heart-button';

import { Suspense, useEffect, useState } from 'react';
import { Button } from '../ui/button';

interface PostItemOneProps {
  pageOne: boolean;
  large: boolean;
  item: PostProps;
  className?: string;
  currentUser?: SafeUser | null;
}

// const inter = Inter({ subsets: ['latin'] });

const PostItemOne = ({
  pageOne,
  large,
  item,
  className,
  currentUser,
}: PostItemOneProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!item) return <Loader />;

  return (
    // <ClientOnly>
    isMounted && (
      <div
        className={cn(
          'post-entry-1 p-4 bg-stone-50 drop-shadow-md rounded-md',
          className,
          large ? 'lg' : undefined
        )}
      >
        <Link href={`/posts/${item.id}`}>
          {item.img && (large || pageOne) ? (
            <Image
              src={item.img}
              alt='image'
              height={160}
              width={320}
              sizes='(max-width: 720px) 700vw, 100vw'
              priority
              className='img-fluid shadow-lg rounded-md '
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          ) : (
            <Image
              src={item.img}
              alt='image'
              height={160}
              width={320}
              sizes='(max-width: 320px) 50vw, 30vw'
              priority
              className='img-fluid  object-cover w-96 h-48 drop-shadow-lg rounded-md '
              // style={{
              //   width: 'auto',
              //   height: '150px',
              // }}
            />
          )}
        </Link>
        <div className='flex flex-row items-center justify-between '>
          <div
            className={cn(
              'post-meta flex flex-row items-center justify-start gap-0',
              className
            )}
          >
            <span className='date'>{item.category}</span>
            <span className='mx-1'>
              <BsDot />
            </span>
            <span>{new Date(item.date).toLocaleDateString('en-US')}</span>
          </div>
          <div className='flex items-center gap-2 '>
            <Suspense
              fallback={
                <Button type='button' variant='ghost' disabled>
                  <svg
                    className='animate-spin h-5 w-5 mr-3'
                    viewBox='0 0 24 24'
                  ></svg>
                </Button>
              }
            >
              {currentUser && (
                <HeartButton
                  className='flex'
                  size={18}
                  postId={item.id}
                  currentUser={currentUser}
                />
              )}
            </Suspense>
            {/* <ToggleButton
            className='flex'
            size={18}
            postId={item.id}
            currentUser={currentUser}
          /> */}
            {currentUser && (
              <VerticalDropdown item={item} currentUser={currentUser} />
            )}
          </div>
        </div>
        <h2>
          <Link href={`/posts/${item.id}`}>
            {item.title.substring(0, 30)}...
          </Link>
        </h2>
        {large ? (
          <span className='mb-4 block bg-slate-50 '>
            {item.brief}
            <PostAuthor item={item} />
          </span>
        ) : null}

        {/* <CommentCount postId={item.id} /> */}
      </div>
    )
    // </ClientOnly>
  );
};

export default PostItemOne;
