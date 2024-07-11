'use server';

import { cache } from 'react';
import { db } from '../db';

export const fetchDepo = cache(async () => {
  try {
    const depos = await db.depo.findMany({
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });
    return depos;
  } catch (err) {
    console.error('Error fetching euro', err);
    return null;
  }
});

export const fetchDepoByEmail = cache(async (email: string) => {
  try {
    const depo = await db.depo.findMany({
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });
    return depo;
  } catch (err) {
    console.error('Error fetching euro', err);
    return null;
  }
});

export const fetchWd = cache(async () => {
  try {
    const wd = await db.wd.findMany({
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });
    return wd;
  } catch (err) {
    console.error('Error fetching euro', err);
    return null;
  }
});
