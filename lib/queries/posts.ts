'use server';

import { db } from '@/lib/db';

import { cache } from 'react';
import { PostProps } from '@/types';
import posts from '@/components/posts/posts';

export type PostWithData = Post & {
  topic: { slug: string } | null;
  user: { name: string | null };
  _count: { comments: number };
};

export const getPostByPostId = cache(async (postId: string) => {
  const data = await db.post.findUnique({
    where: { id: postId },
    include: {
      comments: true,
    },
  });
  return data;
});

export type IPostsParams = {
  userId?: string;
};
interface Post {
  id: string;
  img: string;
  category: string;
  date: Date;
  title: string;
  brief: string | null;
  avatar: string;
  author: string | null;
  userId: string | null;
  top: boolean | null;
  trending: boolean | null;
  topicId: string;
  createdAt: Date;
  comments: Comment[];
}

interface Comment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const getPosts = cache(async (params: IPostsParams) => {
  try {
    const { userId } = params;

    let query: { userId?: string } = {};
    if (userId) {
      query.userId = userId;

      const posts = await db.post.findMany({
        where: query,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          comments: true,
        },
      });

      return posts;
    } else if (!userId) {
      const posts = await db.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          comments: true,
        },
      });

      return posts;
    }

    // const safePostings = posts.map((post) => ({
    //   ...post,
    //   createdAt: post.createdAt.toISOString(),
    // }));
    // return safePostings;
    // return posts;
  } catch (err: unknown) {
    throw new Error('Something went wrong');
  }
});

export const getRandomPost = cache(async () => {
  try {
    const posts = await db.post.findMany({});
    if (posts.length === 0) return null;

    const randPost = posts.sort(() => Math.random() - Math.random())[0];

    return randPost;
  } catch (err: unknown) {
    console.error('Error fetching random post:', err);
    return null;
  }
});

export const fetchPosts = cache(async () => {
  // return db.post.findMany({
  //   orderBy: {
  //     createdAt: 'desc',
  //   },
  //   include: {
  //     comments: true,
  //   },
  // });

  try {
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        comments: true,
      },
    });
    if (posts.length === 0) return null;
    return posts;
  } catch (err) {
    console.error('Error fetching random post:', err);
    return null;
  }
});

export const fetchPostsByUserId = async (params: IPostsParams) => {
  const { userId } = params;
  // return await db.post.findMany({
  //   where: { userId },
  //   include: {
  //     comments: true,
  //     _count: { select: { comments: true } },
  //   },
  // });

  try {
    if (userId) {
      const postsByUserId = await db.post.findMany({
        where: { userId },
        include: {
          comments: true,
          _count: { select: { comments: true } },
        },
      });
      if (!postsByUserId) return null;
      return postsByUserId;
    } else if (!userId) {
      const posts = await db.post.findMany({
        include: {
          comments: true,
          _count: { select: { comments: true } },
        },
      });

      if (!posts) return null;
      return posts;
    }
  } catch (err: unknown) {
    console.error('Error fetching random post:', err);
    return null;
  }
};
