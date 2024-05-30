'use client';

import './postItemOne.css';

import Link from 'next/link';
import Image from 'next/image';

import { EB_Garamond } from 'next/font/google';
import { Source_Serif_4 } from 'next/font/google';
import { cn } from '@/lib/utils';
import { BsDot } from 'react-icons/bs';
import Loader from '../loader';
import { PostProps, SafeUser } from '@/types';

import PostAuthor from './post-author';
import VerticalDropdown from './vertical-dropdown';
import HeartButton from '../heart-button';

import { Suspense } from 'react';
import { Button } from '../ui/button';

interface PostItemOneProps {
  pageOne: boolean;
  large: boolean;
  item: PostProps;
  className?: string;
  currentUser?: SafeUser | null;
}

const eb = EB_Garamond({ subsets: ['latin'] });
const source = Source_Serif_4({ subsets: ['latin'] });

const PostItemOne = ({
  pageOne,
  large,
  item,
  className,
  currentUser,
}: PostItemOneProps) => {
  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);
  if (!item) return <Loader />;
  return (
    <div
      className={cn(
        'post-entry-1 p-2 bg-yellow-50/60 shadow-xl rounded-md h-[380px]',
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
        ) : item.img ? (
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
        ) : (
          ''
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
          {/* <pre>{JSON.stringify(item.date)}</pre> */}
        </div>
        <div className='flex items-center gap-2 '>
          <Button type='button' variant='ghost' disabled>
            {/* <svg
              className='animate-spin h-5 w-5 mr-3'
              viewBox='0 0 24 24'
            ></svg> */}
          </Button>
          {currentUser && (
            <HeartButton
              className='flex'
              size={18}
              postId={item.id}
              currentUser={currentUser}
            />
          )}

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
        <Link
          href={`/posts/${item.id}`}
          className='text-ellipsis overflow-hidden'
        >
          {item.img && pageOne === false ? (
            <span className='shadow-lg px-1'>
              <div className={cn('mb-2 font-semibold', eb.className)}>
                {item.title.substring(0, 30)}
              </div>{' '}
              <div
                className={cn(
                  'text-sm w-full py-2 mb-2 text-pretty text-gray-700 font-light',
                  source.className
                )}
              >
                {item.brief?.substring(0, 60)}...
              </div>{' '}
            </span>
          ) : item.img && pageOne ? (
            <span className='shadow-lg'>
              <div className={cn('mb-0 font-semibold', eb.className)}>
                {item.title.substring(0, 30)}
              </div>{' '}
              <div
                className={cn(
                  'text-sm w-full py-2 text-pretty text-gray-700 font-light',
                  source.className
                )}
              >
                {item.brief?.substring(0, 120)}...
              </div>{' '}
            </span>
          ) : (
            ''
          )}

          {item.img === '' && pageOne === false && (
            <span className='shadow-lg'>
              <div className={cn('mb-2 font-semibold', eb.className)}>
                {item.title.substring(0, 30)}
              </div>
              <div
                className={cn(
                  'text-sm w-full  py-2 text-pretty text-gray-700 font-light',
                  source.className
                )}
              >
                {item.brief?.substring(0, 350)}
              </div>
            </span>
          )}
        </Link>
      </h2>
      {large ? (
        <span className='mb-4 block  pb-4  text-pretty text-gray-700 font-light'>
          {item.brief}
          {/* <pre>{JSON.stringify(item.brief)}</pre> */}
          <PostAuthor item={item} />
        </span>
      ) : (
        <span> {/* <pre>{JSON.stringify(item.brief, null, 2)}</pre> */}</span>
      )}
    </div>
  );
};

export default PostItemOne;
