'use server';

import { scheduleSchema, ScheduleSchema } from '@/schemas/schedules-schema';
import { ActionResult } from '@/types';
import { Schedule } from '@prisma/client';
import { cache } from 'react';
import { getAuthUserId } from './auth-actions';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { format } from 'date-fns-tz';

export const createSchedule = cache(
  async (data: ScheduleSchema): Promise<ActionResult<Schedule>> => {
    try {
      const session = await auth();
      const userRole = session?.user.role;

      if (userRole !== 'admin') {
        return { status: 'error', error: 'unauthorized' };
      }

      const validated = scheduleSchema.safeParse(data);

      if (!validated.success) {
        return { status: 'error', error: validated.error.errors };
      }

      const { run, date, teamAway, teamHome, score, analysis } = validated.data;
      // const newDate = date.concat(':00+07:00');

      const newDate = format(new Date(date), "yyyy-MM-dd'T'HH:mm:ssxxx", {
        timeZone: 'Asia/Ho_Chi_Minh',
      });

      const schedule = await db.schedule.create({
        data: {
          run: +run.value,
          date: newDate,
          teamAway: teamAway.value,
          teamHome: teamHome.value,
        },
      });

      return { status: 'success', data: schedule };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const getScheduleById = cache(async (scheduleId: string) => {
  try {
    return await db.schedule.findFirst({
      where: {
        id: scheduleId,
      },
    });
  } catch (err) {
    console.error(err);
  }
});
