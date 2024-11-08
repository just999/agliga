'use server';

import { db } from '@/lib/db';
import { Sin4dFormDataSchema, sin4dSchema } from '@/schemas/togel-schema';
import { ActionResult } from '@/types';
import { Prisma, SinPool } from '@prisma/client';
import { cache } from 'react';
import { getAuthUserId } from './auth-actions';

export const createTogel = cache(
  async (data: Sin4dFormDataSchema): Promise<ActionResult<SinPool>> => {
    const userId = await getAuthUserId();

    if (!userId) {
      return { status: 'error', error: 'not authenticated' };
    }
    try {
      const validated = sin4dSchema.safeParse(data);
      if (!validated.success) {
        return { status: 'error', error: validated.error.errors };
      }

      const sin4Pool = validated.data;
      if (!validated.data) return { status: 'error', error: 'no data' };

      const { sin4ds } = sin4Pool;

      const [{ d1, d2, d3, d4, game, wager, dis, net, period }] = sin4ds;

      const sin4dsJson = sin4ds as Prisma.JsonArray;

      const createData = {
        userId,
        periode: sin4ds[0].period ?? '',
        copy: sin4Pool.copy,
        copyWager: sin4Pool.copyWager,
        totalBet: sin4Pool.totalBet,

        sinNumber: sin4dsJson,
      } as any;
      const togel = await db.sinPool.create({
        data: createData,
      });
      return { status: 'success', data: togel };
    } catch (err) {
      console.error(err);
      return { status: 'error', error: 'Something went wrong' };
    }
  }
);

export const getTogelSinByUserId = cache(async () => {
  const userId = await getAuthUserId();

  try {
    const togel = await db.sinPool.findMany({
      where: {
        userId,
      },
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
      include: {
        user: true,
      },
    });

    return { status: 'success', data: togel };
  } catch (err) {
    console.error(err);
    return { status: 'error', error: 'Something went wrong' };
  }
});
