'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { cache } from 'react';

export const getAllSliders = cache(async () => {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
      return { status: 'error', error: 'Unauthorized' };
    }

    const sliders = await db.slider.findMany();

    if (!sliders || sliders.length === 0) {
      return { status: 'error', error: 'No slider found' };
    }

    return { status: 'success', data: sliders };
  } catch (err) {
    console.error('Failed to get sliders:', err);
    return { status: 'error', error: 'Server error' }; // Return a consistent error object
  }
});
