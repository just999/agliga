import { cache } from 'react';
import { db } from '../db';

export const getSoccers = cache(async () => {
  try {
    const schedule = await db.schedule.findMany({
      orderBy: {
        run: 'asc',
      },
    });

    return schedule;
  } catch (err: any) {
    throw new Error('Something went wrong', err);
  }
});
