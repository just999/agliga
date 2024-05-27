import type { Comment } from '@prisma/client';
import { db } from '../db';

import { cache } from 'react';

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

export const fetchCommentsByPostId = cache(
  (postId: string): Promise<CommentWithAuthor[]> => {
    // console.log('comments query making query');
    return db.comment.findMany({
      where: { postId: postId },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
  }
);

export type GetCommentsByPostIdProps = {
  postId?: string;
};

export const getComments = cache(
  async ({ postId }: GetCommentsByPostIdProps) => {
    try {
      if (!postId) throw new Error('No post');

      let query: any = {};
      if (postId) {
        query.postId = postId;
      }

      const comments = await db.comment.findMany({
        where: query,
        orderBy: {
          createdAt: 'desc',
        },
      });

      const safeCommenting = comments.map((comment) => ({
        ...comment,
        createdAt: comment.createdAt.toISOString(),
      }));
      return safeCommenting;
    } catch (err: unknown) {
      throw new Error('Something went wrong');
    }
  }
);
