'use server';

import { cache } from 'react';
import { db } from '../db';

export const fetchUsers = cache(async () => {
  try {
    const euros = await db.user.findMany({
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });
    return euros;
  } catch (err) {
    console.error('Error fetching euro', err);
    return null;
  }
});

export const fetchUserById = cache(async (id: string) => {
  try {
    if (!id) throw new Error('No Id');
    const euro = await db.user.findUnique({
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
export const fetchUserByEmail = cache(async (email: string) => {
  try {
    if (!email) throw new Error('No email');
    const euro = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    return euro;
  } catch (err) {
    console.error('Error fetching euro', err);
    return null;
  }
});
