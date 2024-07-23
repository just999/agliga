'use server';

import { cache } from 'react';
import { db } from '../db';

export const fetchUsers = cache(async () => {
  try {
    const users = await db.user.findMany({
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });
    return users;
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
        id: id,
      },
    });

    return user;
  } catch (err) {
    console.error('Error fetching euro', err);
    return null;
  }
});
export const fetchUserByEmail = cache(async (email: string) => {
  try {
    if (!email) throw new Error('No email');
    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    return user;
  } catch (err) {
    console.error('Error fetching euro', err);
    return null;
  }
});
