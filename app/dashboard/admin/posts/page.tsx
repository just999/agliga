import { getPostByPostId, getPosts } from '@/actions/post-actions';
import PostForm from '@/components/dashboard/post-form';

import ClientOnly from '@/lib/client-only';

type AddNewPostPageProps = {
  params: {
    postId: string;
  };
};

const AddNewPostPage = async ({ params }: AddNewPostPageProps) => {
  const post = (await getPostByPostId(params.postId)) || null;
  const posts = await getPosts();
  return (
    <ClientOnly>
      <div className='py-2 '>
        <PostForm />
      </div>
    </ClientOnly>
  );
};

export default AddNewPostPage;
