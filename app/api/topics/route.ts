'use server';

// import type { Topic } from '@prisma/client';
import { auth } from '@/auth';
// import { z } from 'zod';
import { redirect } from 'next/navigation';

// import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
// import { paths } from '@/lib/helper';
import getCurrentUser from '@/actions/get-user';
import { NextResponse } from 'next/server';

// const createTopicSchema = z.object({
//   name: z
//     .string()
//     .min(3)
//     .regex(/^[a-z-]+$/, {
//       message: 'Must be lowercase letters or dashes without spaces',
//     }),
//   description: z.string().min(10),
// });

// interface CreateTopicFormState {
//   errors: {
//     name?: string[];
//     description?: string[];
//     _form?: string[];
//   };
// }

// export async function createTopic(
//   formState: CreateTopicFormState,
//   formData: FormData
// ): Promise<CreateTopicFormState> {
//   // await new Promise((resolve) => setTimeout(resolve, 2500));

//   const result = createTopicSchema.safeParse({
//     name: formData.get('name'),
//     description: formData.get('description'),
//   });

//   if (!result.success) {
//     console.log('create topic result', result.error.flatten().fieldErrors);
//     return {
//       errors: result.error.flatten().fieldErrors,
//     };
//   }

//   const session = await auth();
//   if (!session || !session.user) {
//     return {
//       errors: {
//         _form: ['You must log in to do this'],
//       },
//     };
//   }

//   let topic: Topic;
//   try {
//     topic = await db.topic.create({
//       data: {
//         slug: result.data.name,
//         description: result.data.description,
//       },
//     });
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       return {
//         errors: {
//           _form: [err.message],
//         },
//       };
//     } else {
//       return {
//         errors: {
//           _form: ['Something went wrong'],
//         },
//       };
//     }
//   }
//   revalidatePath('/');
//   redirect(paths.topicShow(topic.slug));

//   // return {
//   // 	errors: {},
//   // };
// }

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();
  const body = await req.json();
  const { slug, description } = body;
  if (!body) throw new Error('No data');

  try {
    const post = await db.topic.create({
      data: {
        slug,
        description,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}
