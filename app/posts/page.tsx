'use server';

import getCurrentUser from '@/actions/get-user';
import Loader from '@/components/loader';
import PageTitle from '@/components/posts/page-title';
import PostItemOne from '@/components/posts/post-item-one';

// import { useGetPost } from '@/hooks/use-get-post';
import {
  fetchPosts,
  fetchPostsByUserId,
  getPosts,
  // getPosts,
  IPostsParams,
} from '@/lib/queries/posts';

import { PostProps } from '@/types';
import { Suspense } from 'react';

type PostItemsPageProps = {
  searchParams: IPostsParams;
};

const PostItemsPage = async ({ searchParams }: PostItemsPageProps) => {
  // const posts = await fetchPosts();
  const posts = await getPosts();
  // const posts = await fetchPostsByUserId(searchParams);
  const currentUser = await getCurrentUser();
  if (!posts || posts.length === 0) return [];

  return (
    <main id='main'>
      <section id='posts ' className='posts  pb-8 mb-8'>
        <div className='container  mx-auto md:container md:mx-auto px-4'>
          <PageTitle className='text-3xl page-title' title='Daftar Berita' />

          <div className='row grid lg:grid-cols-4 md:grid-cols-2 gap-4'>
            {posts.length > 0 ? (
              posts.map((item: PostProps) => (
                <div className='col-lg-3 col-md-6 ' key={item.id}>
                  <Suspense
                    fallback={<Loader className='align-middle h-full' />}
                  >
                    <PostItemOne
                      pageOne={false}
                      large={false}
                      item={item}
                      currentUser={currentUser}
                    />
                  </Suspense>
                </div>
              ))
            ) : (
              <div className='flex flex-col justify-center items-center '>
                <Loader />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PostItemsPage;
