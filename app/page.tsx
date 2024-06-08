'use server';

import getCurrentUser from '@/actions/get-user';
import EmptyState from '@/components/empty-state';

import Hero from '@/components/hero';

import Posts from '@/components/posts/posts';

import ClientOnly from '@/lib/client-only';

import {
  fetchPostByCat,
  getPosts,
  getRandomPost,
  IPostsParams,
} from '@/lib/queries/posts';

import { fetchSliders } from '@/lib/queries/sliders';

type HomeProps = {
  searchParams: IPostsParams;
};

const Home = async ({ searchParams }: HomeProps) => {
  let posts: any;
  let randPost;
  const { category } = searchParams;
  if (searchParams) {
    posts = await fetchPostByCat(searchParams);
    randPost = await getRandomPost(searchParams);
  } else if (searchParams === undefined) {
    posts = await getPosts();
    randPost = await getRandomPost();
  }
  if (Array.isArray(posts) && (!posts || posts.length === 0)) posts = [];

  const images = await fetchSliders();

  if (!images) return [];

  const currentUser = await getCurrentUser();

  if (!randPost) return <EmptyState showReset title='no post!' />;

  return (
    <ClientOnly>
      <Hero images={images} />
      <Posts
        randPost={randPost}
        items={posts}
        size={20}
        cat={category}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default Home;
