// import getCurrentUser from '@/actions/get-user';
// import EmptyState from '@/components/empty-state';

// import Hero from '@/components/hero';

// import Posts from '@/components/posts/posts';

// import ClientOnly from '@/lib/client-only';

// import {
//   fetchPostByCat,
//   getPosts,
//   getRandomPost,
//   IPostsParams,
// } from '@/lib/queries/posts';

// import { fetchSliders } from '@/lib/queries/sliders';

// type HomeProps = {
//   searchParams: IPostsParams;
// };

// const Home = async ({ searchParams }: HomeProps) => {
//   let posts = searchParams
//     ? await fetchPostByCat(searchParams)
//     : await getPosts();
//   let randPost = await getRandomPost(searchParams);
//   const images = await fetchSliders();
//   const currentUser = await getCurrentUser();

//   if (!randPost) return <EmptyState showReset title='no post!' link='/' />;
//   if (!images)
//     return <EmptyState showReset title='no images available!' link='/' />;
//   if (Array.isArray(posts) && (!posts || posts.length === 0)) posts = [];

//   return (
//     <ClientOnly>
//       <Hero images={images} />
//       <Posts
//         randPost={randPost}
//         items={posts}
//         size={20}
//         cat={searchParams.category}
//         currentUser={currentUser}
//       />
//     </ClientOnly>
//   );
// };

// export default Home;

import getCurrentUser from '@/actions/get-user';
import ClientEmblaCarousel from '@/components/carousel/Client-embla-carousel';
import ImageSliders from '@/components/carousel/image-sliders';

import Posts from '@/components/posts/posts';
import ClientOnly from '@/lib/client-only';

import {
  fetchPostByCat,
  getPosts,
  getRandomPost,
  IPostsParams,
} from '@/lib/queries/posts';
import { fetchSliders } from '@/lib/queries/sliders';
import { PostProps } from '@/types/types';

type HomeProps = {
  searchParams: IPostsParams;
};

const Home = async ({ searchParams }: HomeProps) => {
  let posts: PostProps[] = [];

  if (searchParams) {
    const fetchedPosts = await fetchPostByCat(searchParams);
    posts = Array.isArray(fetchedPosts) ? fetchedPosts : [];
  } else {
    const allPosts = await getPosts();
    posts = Array.isArray(allPosts) ? allPosts : [];
  }

  let randPost = await getRandomPost(searchParams);
  const images = await fetchSliders();
  const currentUser = await getCurrentUser();

  // if (!randPost) return <EmptyState showReset title='no post!' link='/' />;
  // if (!images)
  //   return <EmptyState showReset title='no images available!' link='/' />;
  // if (Array.isArray(posts) && (!posts || posts.length === 0)) posts = [];

  return (
    <>
      <div className=''>
        {images && images.length > 0 && (
          <ClientEmblaCarousel>
            {images.map((hero) => (
              <ImageSliders key={hero.id} images={hero.images} />
            ))}
          </ClientEmblaCarousel>
        )}
        <Posts
          randPost={randPost}
          items={posts}
          size={20}
          cat={searchParams.category}
          currentUser={currentUser}
        />
      </div>
    </>
  );
};

export default Home;
