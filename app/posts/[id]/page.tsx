'use server';

import './style.css';

import Loader from '@/components/loader';

import PostShow from '@/components/posts/post-show';

import TabsActive from '@/components/posts/tabs-active';

import CommentCreateForm from '@/components/posts/comments/comment-create-form';
import CommentList from '@/components/posts/comments/comments-list';
import { fetchPosts, getPostByPostId } from '@/lib/queries/posts';
import { Suspense } from 'react';

type PostItemPageProps = {
  params: {
    id?: string;
  };
};

const PostItemPage = async ({ params }: PostItemPageProps) => {
  const { id } = params;
  if (!id || id === undefined) {
    return (
      <div>
        Post id not found <Loader />
      </div>
    );
  }
  const item = await getPostByPostId(id?.toString());
  if (!item) return <Loader />;

  const items = await fetchPosts();
  if (!items) return [];
  return (
    <main id='main' className='pt-4 '>
      <section className='single-post-content '>
        <div className='container mx-auto px-4 '>
          <div className='row flex flex-row  lg:flex lg:flex-row lg:gap-5 md:gap-5  2xs:flex-col '>
            <div className='col-md-9 post-content  lg:w-2/3 xs:w-full px-4 rounded-lg bg-stone-50 shadow-xl pb-4'>
              {item && item.category !== '' ? (
                <Suspense fallback={<Loader />}>
                  <PostShow item={item} />
                </Suspense>
              ) : (
                // <SkeletonLoading className='h-full, w-3/4' />
                <div className='flex flex-col h-full items-center'>
                  <Loader />
                </div>
              )}
              <CommentCreateForm postId={id} />
              <CommentList postId={id} />
            </div>

            <div className='col-md-3 2xl:w-1/3 xs:hidden sm:inline lg:block xl:w-1/3  lg:w-1/3 md:w-10/12 md:mx-auto bg-neutral-100 shadow-lg '>
              <TabsActive items={items} />

              {/* <div className='aside-block w-full mx-auto h-auto'>
                <h3 className='aside-title '>Video</h3>
                <div className='video-post w-full h-auto mx-auto'>
                  <iframe
                    width={320}
                    height={180}
                    src='https://www.youtube.com/embed/2K4lMYexDgw?si=vvTrv0TeopDxTXmg'
                    title='YouTube video player'
                    style={{ border: 'none', height: '240px', width: 'auto' }}
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    referrerPolicy='strict-origin-when-cross-origin'
                    allowFullScreen
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PostItemPage;
