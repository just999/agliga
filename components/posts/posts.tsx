'use client';

import { PostProps, SafeUser } from '@/types/types';
import { EB_Garamond } from 'next/font/google';
import PostItemOne from './post-item-one';
import TrendingPost from './trending-post';

import Container from '../container';

import { cn, ol } from '@/lib/utils';

import Sci from './sci';
import ClientOnly from '@/lib/client-only';

const eb = EB_Garamond({ subsets: ['latin'] });

type PostsProps = {
  items: PostProps[];
  randPost: PostProps | null;
  size?: number | string | undefined;
  currentUser?: SafeUser | null;
  cat?: string;
};

const Posts = ({ randPost, items, size, currentUser, cat }: PostsProps) => {
  const filterNonTopTrendingItems = (data: PostProps[]): PostProps[] =>
    data
      .filter((item) => !item.trending && !item.top)
      .filter((p) => p.id !== randPost?.id);
  const filterTopTrendingItems = (data: PostProps[]): PostProps[] =>
    data.filter((item) => item.trending);

  const sliceFirstThree = (data: PostProps[]): PostProps[] => data.slice(0, 3);
  const sliceNextThree = (data: PostProps[]): PostProps[] => data.slice(3, 6);
  const filteredItems = filterNonTopTrendingItems(items);
  const firstThreePosts = sliceFirstThree(filteredItems);
  const nextThreePosts = sliceNextThree(filteredItems);

  // if (typeof randPost === undefined) return [];
  // if (!items) return [];

  return (
    <ClientOnly>
      <Container>
        <section id='posts' className='posts pt-4'>
          <div
            className='mx-auto px-4 bg-zinc-50 rounded-xl'
            data-aos='fade-up'>
            <div className='flex flex-row items-center justify-around text-center w-full pb-4 rounded-xl bg-stone-300/40  xs:py-2 '>
              <span className='opacity-0 hidden '>none</span>
              <h1
                className={cn(
                  'news 2xl:text-8xl 2xs:text-3xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center  font-semibold drop-shadow-sm text-shadow  w-full px-2',
                  ol.className
                )}>
                {cat ? (
                  <span>
                    Sports News.
                    <span className='2xl:text-4xl 2xs:text-xl xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl'>
                      {cat}
                    </span>
                  </span>
                ) : (
                  <span>Sports News.</span>
                )}
              </h1>
              <span className='flex flex-row gap-2 mx-4 items-center justify-center shadow-lg rounded-lg sm:hidden '>
                <Sci size={size} className='xs:hidden' />
              </span>
            </div>
            <div className='row md:grid md:grid-cols-2 gap-5 mt-1  grid-flow-col xs:flex xs:flex-col'>
              <div className='col-lg-4 rounded-xl shadow-lg'>
                {randPost && (
                  <PostItemOne
                    pageOne={true}
                    large={true}
                    item={randPost}
                    className='bg-stone-100 h-full'
                    currentUser={currentUser}
                  />
                )}
              </div>
              <div className='col-lg-8 h-full '>
                <div className=' 2xl:grid 2xl:grid-cols-3 gap-5 lg:grid lg:grid-cols-2'>
                  <div className='col-lg-4 border-start custom-border sm:flex sm:flex-col'>
                    {firstThreePosts.map((item) => (
                      <PostItemOne
                        pageOne={true}
                        key={item.id}
                        large={false}
                        item={item}
                        className='bg-stone-100 mb-4'
                        currentUser={currentUser}
                      />
                    ))}
                  </div>
                  <div className='col-lg-4 border-start custom-border sm:flex sm:flex-col'>
                    {nextThreePosts.map((item) => (
                      <PostItemOne
                        pageOne={true}
                        key={item.id}
                        large={false}
                        item={item}
                        className='bg-stone-100 mb-4'
                        currentUser={currentUser}
                      />
                    ))}
                  </div>
                  <div className='hidden col-lg-4 2xl:w-full 2xl:block xs:mb-20 '>
                    <div className='trending 2xl:rounded-lg 2xl:shadow-md bg-zinc-100'>
                      <h3
                        className={cn('mx-4 py-2 font-semibold', eb.className)}>
                        Trending
                      </h3>
                      <ul className='trending-post'>
                        {filterTopTrendingItems(items).map((item, i) => (
                          <TrendingPost key={item.id} i={i + 1} item={item} />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>{' '}
    </ClientOnly>
  );
};

export default Posts;
