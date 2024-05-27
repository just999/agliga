'use client';

import { getCommentByPostId } from '@/actions/get-comment';
import Loader from '@/components/loader';
import { useGetComment } from '@/hooks/use-get-comment';
import { useGetPost } from '@/hooks/use-get-post';
import ClientOnly from '@/lib/client-only';

import { PostProps } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type CommentCountProps = {
  postId: string;
};

const CommentCount = ({ postId }: CommentCountProps) => {
  const [post, setPost] = useState<PostProps | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCommentByPostId(postId);
      setPost(res);
    };

    fetchData();

    return () => {};
  }, [postId]);
  let postType;
  if (Array.isArray(post)) {
    postType = post.length;
  } else if (typeof post === 'object') {
    return 'No comment ';
  } else {
    return <Loader />;
  }
  return (
    <ClientOnly>
      <div className='text-[10px] '>CommentCount: {postType} comments </div>
    </ClientOnly>
  );
};

export default CommentCount;
