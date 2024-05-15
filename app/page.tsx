'use server';

import getCurrentUser from '@/actions/get-user';
import EmptyState from '@/components/empty-state';

import Hero from '@/components/hero';

import Posts from '@/components/posts/posts';

import ClientOnly from '@/lib/client-only';
// import { fetchCommentsByPostId } from '@/lib/queries/comments';
import {
  fetchPosts,
  fetchPostsByUserId,
  getPosts,
  // getPosts,
  getRandomPost,
  IPostsParams,
} from '@/lib/queries/posts';

type HomeProps = {
  searchParams: IPostsParams;
};

const Home = async ({ searchParams }: HomeProps) => {
  // const posts = await getPosts(searchParams);
  const posts = await fetchPostsByUserId(searchParams);
  if (!posts || posts.length === 0) return [];

  const randPost = await getRandomPost();
  const currentUser = await getCurrentUser();

  if (!randPost) return <EmptyState showReset title='no post!' />;

  return (
    <>
      <Hero />
      <Posts
        randPost={randPost}
        items={posts}
        size={20}
        currentUser={currentUser}
      />

      {/* <CommentsList /> */}
    </>
  );
};

export default Home;
