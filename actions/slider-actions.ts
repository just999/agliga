'use server';

import { cache } from 'react';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import cloudinary from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';

import { id } from 'date-fns/locale';
import { addSliderSchema } from '@/schemas/slider-schema';
import { Slider } from '@prisma/client';

type Sliders = {
  id: string;
  images: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export const getAllSliders = cache(async () => {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
      return { status: 'error', error: 'Unauthorized' };
    }

    const sliders = await db.slider.findMany();

    if (!sliders) {
      return { status: 'error', error: 'No slider found' };
    }

    return {
      status: 'success',
      data: sliders,
    };
  } catch (err) {
    console.error(err);
    return { status: 'error', error: 'Server error' }; // Return a consistent error object
  }
});

export const addSlider = cache(async (data: FormData) => {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
      return { status: 'error', error: 'Unauthorized' };
    }

    // Validate input
    const validationResult = addSliderSchema.safeParse({
      img: data.get('img'),
    });

    if (!validationResult.success) {
      return {
        status: 'error',
        error: validationResult.error.errors.map((e) => e.message).join(', '),
      };
    }

    const { img } = validationResult.data;

    const imageBuffer = await img.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);
    const imageBase64 = imageData.toString('base64');

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      { folder: 'slider' }
    );

    const newSliderImage: Omit<Slider, 'createdAt' | 'updatedAt' | 'id'> = {
      images: result.secure_url,
      userId: session.user.id,
    };

    const slider = await db.slider.create({
      data: newSliderImage,
    });

    revalidatePath('/dashboard/admin/sliders');

    return { status: 'success', data: slider };
  } catch (err) {
    console.error(err);
    return { status: 'error', error: 'Server error' };
  }
});

export const deleteSliderImage = cache(async (id: string) => {
  console.log(id);

  try {
    const session = await auth();
    const userRole = session?.user.role;

    if (userRole !== 'admin') return { status: 'error', error: 'Unauthorized' };

    const img = await db.slider.findFirst({
      where: {
        id: id,
      },
    });

    if (!img) {
      return;
    }

    if (img.images.startsWith('http')) {
      const publicId = img.images.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(publicId, (err: any, res: any) => {});
    }

    const deletedImg = await db.slider.delete({
      where: {
        id: id,
      },
    });

    if (!deletedImg) {
      return { status: 'error', error: 'No Image was found to this id' };
    }

    revalidatePath('/dashboard/admin/sliders');

    return { status: 'success', data: deletedImg };
  } catch (err) {
    console.error(err);
    return { status: 'error', error: 'Something went wrong!' };
  }
});

export const editSliderImage = cache(async (id: string, data: FormData) => {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'admin') {
      return { status: 'error', error: 'Unauthorized' };
    }

    const image = data.get('img');

    const img = await db.slider.findFirst({
      where: {
        id: id,
      },
    });

    if (img?.images.startsWith('http')) {
      const publicId = img.images.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(publicId, (err: any, res: any) => {});
    }

    if (!(image instanceof File))
      return { status: 'error', error: 'Invalid image file' };

    const imageBuffer = await image.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);
    const imageBase64 = imageData.toString('base64');

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      { folder: 'sliders' }
    );

    const newSliderImage: Omit<Slider, 'createdAt' | 'updatedAt' | 'id'> = {
      images: result.secure_url,
      userId: session.user.id,
    };

    const slider = await db.slider.update({
      where: {
        id: id,
      },
      data: newSliderImage,
    });
    revalidatePath('/dashboard/admin/sliders');
    return { status: 'success', data: slider };
  } catch (err) {
    console.error(err);
    return { status: 'error', error: 'something went wrong!' };
  }
});
