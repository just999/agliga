'use server';

import { cache } from 'react';
import { db } from '../db';

export const fetchSliders = cache(async () => {
  try {
    const sliders = await db.slider.findMany({});
    if (!sliders) throw new Error('No image found');
    return sliders;
  } catch (err) {
    console.error('Error fetching schedule', err);
    return null;
  }
});

export const fetchSliderImageById = cache(async (id: string) => {
  try {
    if (!id) throw new Error('no id found');
    const image = await db.slider.findUnique({
      where: {
        id: id,
      },
    });

    if (!image) throw new Error('no image found with this id');

    return image;
  } catch (err) {
    console.error('Error fetching schedule', err);
    return null;
  }
});
