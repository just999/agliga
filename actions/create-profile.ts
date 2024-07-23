// 'use server';

// import { auth } from '@/auth';
// import cloudinary from '@/lib/cloudinary';
// import { db } from '@/lib/db';
// import { revalidatePath } from 'next/cache';
// import { z } from 'zod';

// const createAvatarSchema = z.object({
//   image: z.string().min(3),
// });

// interface CreateAvatarFormState {
//   errors: {
//     image?: string[];
//     _form?: string[];
//   };
//   success?: boolean;
// }

// export async function createAvatar(
//   { userId }: { userId: string },
//   formState: CreateAvatarFormState,
//   formData: FormData
// ): Promise<CreateAvatarFormState> {
//   const result = createAvatarSchema.safeParse({
//     image: formData.get('image'),
//   });

//   if (!result.success) {
//     return {
//       errors: result.error.flatten().fieldErrors,
//     };
//   }

//   const session = await auth();
//   if (!session || !session.user) {
//     return {
//       errors: {
//         _form: ['mohon login untuk comment'],
//       },
//     };
//   }

//   const img = formData.get('image') as File;
//   const imageBuffer = await img.arrayBuffer();
//   const imageArray = new Uint8Array(imageBuffer);
//   const imageData = Buffer.from(imageArray);

//   const imageBase64 = imageData.toString('base64');

//   const res = await cloudinary.uploader.upload(
//     `data:image/png;base64,${imageBase64}`,
//     { folder: 'agenliga' }
//   );
//   const imageUploadPromises = res.secure_url;

//   const uploadedAvatar = await Promise.all(imageUploadPromises);

//   const newAvatar = await db.user.update({
//     where: { id: userId },
//     data: uploadedAvatar,
//   });

//   // await new Promise((resolve, reject) => {
//   //   cloudinary.uploader
//   //     .upload_stream({}, function (error, result) {
//   //       if (error) {
//   //         reject(error);
//   //         return;
//   //       }
//   //       resolve(result);
//   //     })
//   //     .end(buffer);
//   // });
//   revalidatePath('/');
//   return {
//     errors: {},
//   };
// }
