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

  const id = params.id;
  const formData = await req.formData();
  const images = formData.get('images');
  const updatedSliderImage = {
    images,
    userId: currentUser.id,
  } as any;
  const img = await db.slider.findFirst({
    where: {
      id: id,
    },
  });

  if (img?.images.startsWith('http')) {
    const publicId = img.images.split('/').slice(-2).join('/').split('.')[0];
    await cloudinary.uploader.destroy(publicId, (err: any, res: any) => {});
  }

  let imageUploadPromises = [];
  if (images instanceof File) {
    const imageBuffer = await images.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    const imageBase64 = imageData.toString('base64');

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      { folder: 'sliders' }
    );

    imageUploadPromises.push(result.secure_url);
    const uploadedImages = await Promise.all(imageUploadPromises);

    updatedSliderImage.images = uploadedImages[0];
    revalidatePath('/sliders');
  }

  try {
    const sliderImg = await db.slider.update({
      where: { id: id },
      data: updatedSliderImage,
    });

    if (!sliderImg)
      return new Response(
        JSON.stringify({ message: 'No image ws found for this id' }),
        { status: 404 }
      );
    // return NextResponse.json({ message: 'update success!' });

    return new Response(JSON.stringify(sliderImg), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const id = params.id;
  // const formData = await req.formData();
  // const images = formData.get('images');
  // const updatedSliderImage = {
  //   images,
  //   userId: currentUser.id,
  // } as any;
  const img = await db.slider.findFirst({
    where: {
      id: id,
    },
  });

  if (img?.images.startsWith('http')) {
    const publicId = img.images.split('/').slice(-2).join('/').split('.')[0];
    await cloudinary.uploader.destroy(publicId, (err: any, res: any) => {});
  }

  // let imageUploadPromises = [];
  // if (images instanceof File) {
  //   const imageBuffer = await images.arrayBuffer();
  //   const imageArray = Array.from(new Uint8Array(imageBuffer));
  //   const imageData = Buffer.from(imageArray);

  //   const imageBase64 = imageData.toString('base64');

  //   const result = await cloudinary.uploader.upload(
  //     `data:image/png;base64,${imageBase64}`,
  //     { folder: 'sliders' }
  //   );

  //   imageUploadPromises.push(result.secure_url);
  //   const uploadedImages = await Promise.all(imageUploadPromises);

  //   updatedSliderImage.images = uploadedImages[0];
  //   revalidatePath('/sliders');
  // }

  try {
    const deletedSliderImg = await db.slider.delete({
      where: { id: id },
    });

    if (!deletedSliderImg)
      return new Response(
        JSON.stringify({ message: 'No image ws found for this id' }),
        { status: 404 }
      );
    // return NextResponse.json({ message: 'update success!' });

    return new Response(JSON.stringify(deletedSliderImg), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}
