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
export const fetchEuroByRound = cache(async (round: string) => {
  try {
    if (!round) throw new Error('No round');
    const euro = await db.euro.findMany({
      where: {
        round: round,
      },
    });

    return euro;
  } catch (err) {
    console.error('Error fetching euro', err);
    return null;
  }
});
export const fetchEuroByQFinals = cache(async (qRound: string) => {
  try {
    if (!qRound) throw new Error('No qRound');
    const euro = await db.euro.findMany({
      where: {
        qRound: qRound,
      },
    });

    return euro;
  } catch (err) {
    console.error('Error fetching euro', err);
    return null;
  }
});
