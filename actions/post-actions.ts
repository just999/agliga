'use server';

import { db } from '@/lib/db';
import { postSchema, PostSchema } from '@/schemas';
import { ActionResult } from '@/types';
import { Post } from '@prisma/client';
import { getUserRole } from './auth-actions';
import cloudinary from '@/lib/cloudinary';

import getCurrentUser from './get-user';
import { cache } from 'react';

export const createPost = cache(
  async (
    formData: FormData
    // data: PostSchema
  ): Promise<ActionResult<Post>> => {
    const title = formData.get('title');
    const brief = formData.get('brief');
    const author = formData.get('author');
    const category = formData.get('category');
    const img = formData.get('img');

    const newFormData = {
      title,
      brief,
      author,
      img,
      category: { value: category },
    };
    try {
      const currentUser = await getCurrentUser();
      const role = await getUserRole();
      if (role !== 'admin') throw new Error('Unauthorized');

      const validated = postSchema.safeParse(newFormData);
      if (!validated.success) {
        console.error(validated.error.errors);
        return { status: 'error', error: validated.error.errors };
      }
      const file: File | null = formData.get('img') as unknown as File;
      if (!file)
        throw new Error('No file  uploaded or file type is not compatible');

      const { title, brief, img, category, author } = validated.data;

      const topic = await db.topic.findUnique({
        where: {
          slug: 'soccer',
        },
      });

      const newPost = {
        img,
        category: formData.get('category'),
        title: formData.get('title'),
        author: formData.get('author'),
        brief: formData.get('brief'),
        avatar: currentUser?.image,
        top: false,
        topicId: topic?.id,
        trending: false,
        userId: currentUser?.id,
      } as any;

      let imageUploadPromises = [];

      if (file instanceof File) {
        const arrayBuffer = await file.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(arrayBuffer));
        const imageData = Buffer.from(imageArray);

        const imageBase64 = imageData.toString('base64');

        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${imageBase64}`,
          { folder: 'agenliga' }
        );
        imageUploadPromises.push(result.secure_url);
        const uploadedImages = await Promise.all(imageUploadPromises);
        newPost.img = uploadedImages[0];

        // await new Promise((resolve, reject) => {
        //   cloudinary.v2.v2.uploader
        //     .upload_stream({}, function (error, result) {
        //       if (error) {
        //         reject(error);
        //         return;
        //       }
        //       resolve(result);
        //     })
        //     .end(buffer);
        // });
      } else {
        console.log('not File');
        throw new Error('it is not type of File');
      }

      const post = await db.post.create({
        data: newPost,
      });
      return { status: 'success', data: post };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const getPostByPostId = cache(async (postId?: string) => {
  if (!postId) return { status: 'error', error: 'No post id found, Fuck off' };
  try {
    return await db.post.findFirst({
      where: {
        id: postId,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

export const getPosts = cache(async () => {
  try {
    return await db.post.findMany();
  } catch (err) {
    console.error(err);
    throw err;
  }
});
