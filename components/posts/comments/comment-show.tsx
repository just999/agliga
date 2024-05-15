import { fetchCommentsByPostId } from '@/lib/queries/comments';
import Image from 'next/image';
import CommentCreateForm from './comment-create-form';

interface CommentShowProps {
  commentId: string;
  // comments: CommentWithAuthor[];
  postId: string;
}

// TODO: Get a list of comments
export default async function CommentShow({
  commentId,
  postId,
}: CommentShowProps) {
  const comments = await fetchCommentsByPostId(postId);
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return <CommentShow key={child.id} commentId={child.id} postId={postId} />;
  });

  return (
    <div className='p-4 border bg-stone-100 drop-shadow-lg'>
      <div className='bg-slate-100 '>
        <div className='flex gap-3 '>
          <div className='flex flex-col justify-start items-center '>
            <Image
              src={comment.user.image || '/images/cavatar.svg'}
              alt='user image'
              width={40}
              height={40}
              className='w-10 h-10 rounded-full'
            />
            <p className='text-sm font-medium text-gray-500'>
              {comment.user.name}
            </p>
          </div>
          <div className='flex-1 space-y-3 bg-orange-200/20 shadow-lg rounded-xl p-2 m-2'>
            <p className=''>{comment.content}</p>

            <CommentCreateForm postId={comment.postId} parentId={comment.id} />
          </div>
        </div>
      </div>

      <div className=''>
        <div className='pl-4 bg-gray-100 '>{renderedChildren}</div>
      </div>
    </div>
  );
}
