'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { paths } from '@/lib/helper';
import images from '@/components/candidate-form/images';

const createSliderSchema = z.object({
  images: z.array(z.string()),
});

interface CreateSliderFormState {
  errors: {
    images?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function createSlider(
  { id }: { id: string },
  formState: CreateSliderFormState,
  formData: FormData
): Promise<CreateSliderFormState> {
  const result = createSliderSchema.safeParse({
    images: formData.get('images'),
  });
  console.log('🚀 ~ images:', images);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['mohon login untuk slider'],
      },
    };
  }

  try {
    const res = await db.slider.create({
      data: {
        images: result.data.images,
        userId: id,
      },
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
  //   where: { posts: { some: { id: postId } } },
  // });
  // if (!topic) {
  //   return {
  //     errors: {
  //       _form: ['Failed to revalidate topic'],
  //     },
  //   };
  // }

  // revalidatePath(paths.postShow(topic.slug, postId));
  return {
    errors: {},
    success: true,
  };
}
