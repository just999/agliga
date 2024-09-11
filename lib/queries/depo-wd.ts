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
    if (!depos) {
      return;
    }
    return depos;
  } catch (err) {
    console.error('Error fetching depo', err);
    return null;
  }
});
export const fetchDepoById = cache(async (id: string) => {
  try {
    if (!id) throw new Error('No depo id');
    const depo = await db.depo.findFirst({
      where: {
        id: id,
      },
    });
    return depo;
  } catch (err) {
    console.error('Error fetching depo by id', err);
    return null;
  }
});
export const fetchDepoByUserId = cache(async (id: string) => {
  try {
    if (!id) throw new Error('No user id');
    const depo = await db.depo.findMany({
      where: {
        userId: id,
      },
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });
    return depo;
  } catch (err) {
    console.error('Error fetching depo by user id', err);
    return null;
  }
});

export const fetchDepoByEmail = cache(async (email: string) => {
  try {
    const depo = await db.depo.findMany({
      where: {
        email: email,
      },
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

    if (!wd) {
      return;
    }
    return wd;
  } catch (err) {
    console.error('Error fetching wd', err);
    return null;
  }
});
export const fetchWdByUserId = cache(async (id: string) => {
  try {
    const wd = await db.wd.findMany({
      where: {
        userId: id,
      },
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });
    return wd;
  } catch (err) {
    console.error('Error fetching wd user id', err);
    return null;
  }
});

export const fetchWdById = cache(async (id: string) => {
  try {
    const wd = await db.wd.findFirst({
      where: {
        id: id,
      },
    });
    return wd;
  } catch (err) {
    console.error('Error fetching wd by id', err);
    return null;
  }
});

export const fetchWdByEmail = cache(async (email: string) => {
  try {
    const wd = await db.wd.findMany({
      where: {
        email: email,
      },
    });
    return wd;
  } catch (err) {
    console.error('Error fetching wd by email', err);
    return null;
  }
});
