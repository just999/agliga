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
  IPostsParams,
} from '@/lib/queries/posts';

import { PostProps } from '@/types';

type PostItemsPageProps = {
  searchParams: IPostsParams;
};

const PostItemsPage = async ({ searchParams }: PostItemsPageProps) => {
  // const posts = await fetchPosts();
  // const posts = await getPosts(searchParams);
  const posts = await fetchPostsByUserId(searchParams);
  const currentUser = await getCurrentUser();
  if (!posts || posts.length === 0) return [];

  return (
    <main id='main'>
      <section id='posts ' className='posts  pb-8 mb-8'>
        <div className='container  mx-auto md:container md:mx-auto px-4'>
          <PageTitle title='Daftar Berita' />

          <div className='row grid lg:grid-cols-4 md:grid-cols-2 gap-4'>
            {posts.length > 0 ? (
              posts.map((item: PostProps) => (
                <div className='col-lg-3 col-md-6 ' key={item.id}>
                  <PostItemOne
                    pageOne={false}
                    large={false}
                    item={item}
                    currentUser={currentUser}
                  />
                </div>
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PostItemsPage;
