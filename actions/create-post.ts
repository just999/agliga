'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { paths } from '@/lib/helper';
import { schema } from '@/lib/formSchema';
import cloudinary from '@/lib/cloudinary';

interface CreatePostFormState {
  errors: {
    title?: string[];
    img?: string[];
    category?: string[];
    author?: string[];
    brief?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function createPost(
  { userId }: { userId: string },
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = schema.safeParse({
    title: formData.get('title'),
    category: formData.get('category'),
    img: formData.get('img'),
    author: formData.get('author'),
    brief: formData.get('brief'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user || session.user.role !== 'admin') {
    return {
      errors: {
        _form: ['you need to be an admin for posting post'],
      },
    };
  }

  const topic = await db.topic.findUnique({
    where: {
      slug: formData.get('category')?.toString(),
    },
  });
  const img = result.data.img;

  const data = {
    category: result.data.category,
    title: result.data.title,
    author: result.data.author,
    brief: result.data.brief,
    avatar: session.user.image,
    top: false,
    topicId: topic?.id,
    trending: false,
    userId: userId,
    img,
  } as any;

  let imageUploadPromises = [];
  for (const image of img) {
    if (image instanceof File) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      const imageBase64 = imageData.toString('base64');

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: 'agenliga' }
      );
      imageUploadPromises.push(result.secure_url);
      const uploadedImages = await Promise.all(imageUploadPromises);
      data.img = uploadedImages;
    }
  }

  try {
    const res = await db.post.create({
      data: data,
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong...'],
        },
      };
    }
  }

  // const topic = await db.topic.findFirst({
  //   where: {
  //     posts: {
  //       some: {
  //         id: postId,
  //       },
  //     },
  //   },
  // });
  if (!topic) {
    return {
      errors: {
        _form: ['failed to revalidate topic'],
      },
    };
  }

  revalidatePath(paths.postShow(topic.slug, userId));
  return {
    errors: {},
    success: true,
  };

  return {
    errors: {},
    success: true,
  };
}
