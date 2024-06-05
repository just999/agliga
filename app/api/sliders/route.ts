import getCurrentUser from '@/actions/get-user';
import cloudinary from '@/lib/cloudinary';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await db.post.findMany();
    if (!posts) throw new Error('Something went wrong');

    return NextResponse.json(posts, {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    const formData = await req.formData();

    const images = formData.get('images');
    const newSliderImage = {
      images,
      userId: currentUser.id,
    } as any;

    let imageSliderPromise = [];

    if (images instanceof File) {
      const imageBuffer = await images.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      const imageBase64 = imageData.toString('base64');

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: 'sliders' }
      );
      imageSliderPromise.push(result.secure_url);
      const uploadedImages = await Promise.all(imageSliderPromise);
      newSliderImage.images = uploadedImages[0];
      revalidatePath('/sliders');
    }

    const createdSliderImage = await db.slider.create({
      data: newSliderImage,
    });

    if (!createdSliderImage) throw new Error('image upload error');

    return Response.redirect(`${process.env.NEXTAUTH_URL}`);

    // return NextResponse.json({ message: 'success' });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}
