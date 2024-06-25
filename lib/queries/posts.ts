'use server';

import { db } from '@/lib/db';

import { cache } from 'react';
import { PostProps } from '@/types';

export type PostWithData = Post & {
  topic: { slug: string } | null;
  user: { name: string | null };
  _count: { comments: number };
};

export const getPostByPostId = cache(async (id?: string) => {
  try {
    if (!id) return;
    const data = await db.post.findUnique({
      where: { id: id },
      include: {
        comments: true,
      },
    });
    return data;
  } catch (err: unknown) {
    throw new Error('Something went wrong');
  }
});

export type IPostsParams = {
  userId?: string;
  category?: string;
  postId?: string;
};
interface Post {
  img: string;
  category: string;
  title: string;
  brief: string | null;
  author: string | null;
  topicId: string;
  comments: Comment[];
}

interface Comment {
  content: string;
  postId: string;
  userId: string;
  parentId: string | null;
}

export const getPosts = cache(async (params?: IPostsParams) => {
  try {
    let userId;
    if (params) {
      userId = params.userId;
    }

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

export const getRandomPost = cache(
  async (params?: IPostsParams): Promise<PostProps | null> => {
    try {
      let posts: PostProps[] = [];
      if (!params) {
        posts = await db.post.findMany({
          where: {
            img: {
              not: {
                equals: '',
              },
            },
          },
        });
        if (posts.length === 0) return null;
      }
      if (params) {
        posts = await db.post.findMany({
          where: {
            AND: [
              {
                category: params.category,
              },
              {
                img: {
                  not: {
                    equals: '',
                  },
                },
              },
            ],
          },
        });
        if (posts.length === 0) return null;
      }
      const randPost = posts.sort(() => Math.random() - Math.random())[0];
      return randPost;
    } catch (err: unknown) {
      console.error('Error fetching random post:', err);
      return null;
    }
  }
);
// export const getRandomPost = async () => {
//   try {
//     const randomPost = await db.post.aggregateRaw({
//       pipeline: [
//         { $match: { img: { $ne: '' } } }, // Filter for posts with non-empty img
//         { $sample: { size: 1 } }, // Sample one random document
//       ],
//     });

//     return randomPost[0];
//   } catch (err: unknown) {
//     console.error('Error fetching random post:', err);
//     return null;
//   }
// };

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

export const fetchPostsByUserId = cache(async (params: IPostsParams) => {
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
});

export const fetchPostByPostId = cache(
  async (postId: string): Promise<PostProps> => {
    console.log('comments query making query');
    return db.post
      .findFirst({
        where: { id: postId },
        include: {
          comments: {
            select: {
              content: true,
            },
          },
        },
      })
      .then((post) => post as any);
  }
);

export const fetchPostByCat = cache(
  async (params: IPostsParams): Promise<PostProps> => {
    return db.post
      .findMany({
        where: { category: params.category },
        include: {
          comments: {
            select: {
              content: true,
            },
          },
        },
      })
      .then((post) => post as any);
  }
);
// export const fetchAllPosts = cache(async (params?: IPostsParams) => {
//   try {
//     let posts;
//     if (!params) {
//       posts = await db.post.findMany({
//         orderBy: {
//           createdAt: 'desc',
//         },
//         include: {
//           comments: true,
//         },
//       });
//       if (posts.length === 0) throw new Error('No data');

//       return posts;
//     } else if ({ category: params.category }) {
//       posts = await db.post
//         .findMany({
//           where: { category: params.category },
//           include: {
//             comments: {
//               select: {
//                 content: true,
//               },
//             },
//           },
//         })
//         .then((post) => post);
//       return posts;
//     } else if ({ postId: params.postId }) {
//       posts = await db.post
//         .findFirst({
//           where: { id: params.postId },
//           include: {
//             comments: {
//               select: {
//                 content: true,
//               },
//             },
//           },
//         })
//         .then((post) => post);
//       return posts;
//     }
//   } catch (err) {
//     console.error('Error fetching random post:', err);
//     return null;
//   }
// });
