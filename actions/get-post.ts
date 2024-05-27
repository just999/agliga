'use server';

import { db } from '@/lib/db';
import { PostProps } from '@/types';

type PostsResponse = PostProps[];

// export const getPost = async (id: string) => {
//   try {
//     const postById = await db.post.findUnique({
//       where: { id: id },
//       include: { comments: true },
//     });
//     if (!postById) return null;
//     return postById;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };
export const getPost = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getPosts = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/posts`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};
// export const getPosts = async () => {
//   try {
//     const posts = await db.post.findMany({
//       include: { comments: true },
//     });
//     if (!posts) return null;
//     return posts;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };

export const getPostByTopicAndSlug = async (id: string, slug: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/posts/topic/${slug}/posts/${id}`,
      {
        cache: 'no-store',
      }
    );
    // .then((res) => {
    //   return;
    // })
    // .catch((err) => console.log(err));
    // if (!res.ok) throw new Error('Failed to fetch data');
    // return res.json();
    if (!res.ok) throw new Error('Failed to fetch data');

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// export const getPostByTopicAndSlug = async (id: string, slug: string) => {
//   try {
//     const post = await db.post.findUnique({
//       where: { id, topic: { slug } },
//       include: { comments: true }, // Include comments relation
//     });

//     if (!post) return null;

//     return post;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };
