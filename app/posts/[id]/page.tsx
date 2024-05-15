'use server';

import './style.css';

import Loader from '@/components/loader';

import PostShow from '@/components/posts/post-show';

import TabsActive from '@/components/posts/tabs-active';

import ClientOnly from '@/lib/client-only';
import CommentCreateForm from '@/components/posts/comments/comment-create-form';
import CommentList from '@/components/posts/comments/comments-list';
import { fetchPosts, getPostByPostId } from '@/lib/queries/posts';

type PostItemPageProps = {
  params: {
    id: string;
  };
};

const PostItemPage = async ({ params }: PostItemPageProps) => {
  // const { id }: { id: string } = useParams();

  const id = params.id;

  // const { item, items, isLoading, error } = useGetPost();

  // const session = await auth();
  // const userId = session?.user.id;

  // const { data: session, status } = useSession();

  // const userId = session?.user.id;
  // if (!userId) return null;

  // const item = await db.post.findUnique({
  //   where: {
  //     id: id,
  //   },
  //   include: { comments: true },
  // });

  const item = await getPostByPostId(id);
  if (!item) return 'found nothing';
  // const items = await db.post.findMany({
  //   include: { comments: true },
  // });

  const items = await fetchPosts();
  if (!items) return [];
  return (
    <ClientOnly>
      <main id='main' className='pt-8 '>
        <section className='single-post-content '>
          <div className='container mx-auto px-4 '>
            <div className='row flex flex-row lg:flex-row lg:flex lg:gap-5 gap-20 2xs:flex-col '>
              <div className='col-md-9 post-content  xs:w-full px-4 rounded-lg bg-stone-50 shadow-xl pb-4'>
                {item && item.category !== '' ? (
                  <PostShow item={item} />
                ) : (
                  // <SkeletonLoading className='h-full, w-3/4' />
                  <Loader />
                )}
                <CommentCreateForm postId={id} />
                <CommentList postId={id} />
              </div>

              <div className='col-md-3 2xl:w-1/3 xl:w-1/3 md:w-1/3  bg-neutral-100 shadow-lg '>
                <TabsActive items={items} />

                {/* <div className='aside-block 2xl:w-1/3  xl:w-1/3 lg:w-1/3'>
                  <h3 className='aside-title '>Video</h3>
                  <div className='video-post '>
                    <iframe
                      width={320}
                      height={180}
                      src='https://www.youtube.com/embed/2K4lMYexDgw?si=vvTrv0TeopDxTXmg'
                      title='YouTube video player'
                      style={{ border: 'none' }}
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
    </ClientOnly>
  );
};

export default PostItemPage;
