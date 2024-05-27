import getCurrentUser from '@/actions/get-user';
import cloudinary from '@/lib/cloudinary';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();
  // const body = await req.json();
  // if (!body) NextResponse.error();

  const id = params.id;

  const formData = await req.formData();

  // const images = formData.getAll('image').filter((image) => {
  //   return image !== '';
  // });
  const images = formData.get('image') as File;
  const userId = formData.get('userId');

  const updatedAvatar = {
    image: images,
  } as any;

  if (currentUser.image?.startsWith('htt')) {
    if (Array.isArray(currentUser.image)) {
      for (const imgUrl of currentUser.image) {
        const publicId = imgUrl.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId, (err: any, res: any) => {});
      }
    }
    let imgUrl = currentUser.image;
    const publicId = imgUrl.split('/').slice(-2).join('/').split('.')[0];
    await cloudinary.uploader.destroy(publicId, (err: any, res: any) => {});
  }

  let imageUploadPromises = [];

  console.log(
    '🚀 ~ image:',
    images instanceof File,
    images instanceof Blob,
    images
  );
  if (images instanceof File) {
    const imageBuffer = await images.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    const imageBase64 = imageData.toString('base64');

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      { folder: 'agenliga' }
    );
    imageUploadPromises.push(result.secure_url);
    const uploadedImages = await Promise.all(imageUploadPromises);

    updatedAvatar.image = uploadedImages;

    revalidatePath('/');
  }

  if (currentUser.id !== id) {
    return NextResponse.error();
  }

  try {
    const userAvatar = await db.user.update({
      where: { id: id },
      data: {
        image: updatedAvatar.image[0],
      },
    });

    if (!userAvatar)
      return new Response(
        JSON.stringify({ message: 'No Item Found for this id' }),
        {
          status: 404,
        }
      );

    // return NextResponse.json(userAvatar);

    return new Response(JSON.stringify(userAvatar), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });

    return new Response(JSON.stringify({ message: 'Success' }), {
      status: 200,
    });

    return Response.redirect(`${process.env.NEXTAUTH_URL}/posts/${id}`);
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}
