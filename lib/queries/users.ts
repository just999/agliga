'use server';

import { cache } from 'react';
import { db } from '../db';
import { getAuthUserId } from '@/actions/auth-actions';

export const fetchUsers = cache(async () => {
  const userId = await getAuthUserId();

  try {
    return await db.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
      },
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });
  } catch (err) {
    console.error('Error fetching euro', err);
    return null;
  }
});

export const fetchUserById = cache(async (id: string) => {
  try {
    if (!id) throw new Error('No Id');
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (err) {
    console.error('Error fetching user', err);
    return null;
  }
});
export const fetchUserByEmail = cache(async (email: string) => {
  try {
    if (!email) throw new Error('No email');
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (err) {
    console.error('Error fetching euro', err);
    return null;
  }
});
