import { getPosts } from '@/actions/get-post';
import { getPostByPostId } from '@/actions/post-actions';
import ClientOnly from '@/lib/client-only';
import React from 'react';
import EditPostForm from './Edit-post-form';
import { categories, sportsCategories } from '@/lib/helper';
import PostForm from '@/components/dashboard/post-form';

type EditPostPageProps = {
  params: {
    postId: string;
  };
};

const EditPostPage = async ({ params }: EditPostPageProps) => {
  const post = await getPostByPostId(params.postId);

  return (
    <>
      <div className='py-2 '>
        <PostForm post={post.data} />
      </div>
    </>
  );
};
export default EditPostPage;
