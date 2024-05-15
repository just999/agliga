import { fetchCommentsByPostId } from '@/lib/queries/comments';
import CommentShow from './comment-show';

interface CommentListProps {
  // fetchData: () => Promise<CommentWithAuthor[]>;
  postId: string;
}

// TODO: Get a list of comments from somewhere
export default async function CommentList({ postId }: CommentListProps) {
  const comments = await fetchCommentsByPostId(postId);

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        // comments={comments}
        postId={postId}
      />
    );
  });

  return (
    <div className='space-y-3 bg-stone-50'>
      <h1 className='text-lg font-bold'>All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
