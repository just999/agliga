import { getPostByPostId } from '@/actions/post-actions';
import PostForm from './post-form';
import ClientOnly from '@/lib/client-only';

type AddNewPostPageProps = {
  params: {
    postId: string;
  };
};

const AddNewPostPage = async ({ params }: AddNewPostPageProps) => {
  const post = await getPostByPostId(params.postId);

  return (
    <ClientOnly>
      <div className='py-2 '>
        <PostForm post={post} />
      </div>
    </ClientOnly>
  );
};

export default AddNewPostPage;
