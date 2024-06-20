'use server';

import { cache } from 'react';
import { db } from '../db';

export const fetchEuro = cache(async () => {
  try {
    const euros = await db.euro.findMany({
      orderBy: [
        {
          date: 'asc',
        },
      ],
    });
    return euros;
  } catch (err) {
    console.error('Error fetching euro', err);
    return null;
  }
});

export const fetchEuroById = cache(async (id: string) => {
  try {
    if (!id) throw new Error('No Id');
    const euro = await db.euro.findUnique({
      where: {
        id: id,
      },
    });

    return euro;
  } catch (err) {
    console.error('Error fetching euro', err);
    return null;
  }
});
