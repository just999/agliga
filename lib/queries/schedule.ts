'use server';

import { cache } from 'react';
import { db } from '../db';

export const fetchSchedule = cache(async () => {
  try {
    const schedules = await db.schedule.findMany({
      orderBy: {
        run: 'desc',
      },
    });
    return schedules;
  } catch (err) {
    console.error('Error fetching schedule', err);
    return null;
  }
});

export const fetchScheduleById = cache(async (id?: string) => {
  try {
    if (!id) throw new Error('No Id');
    return await db.schedule.findUnique({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.error('Error fetching schedule', err);
    return null;
  }
});
