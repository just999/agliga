'use server';

import { depoSchema, DepoSchema, WdSchema, wdSchema } from '@/schemas';
import { getAuthUserId } from './auth-actions';
import { ActionResult } from '@/types';
import { Depo, Wd } from '@prisma/client';

import { db } from '@/lib/db';
import { cache } from 'react';

export async function createDepo(
  data: DepoSchema
): Promise<ActionResult<Depo>> {
  try {
    const validated = depoSchema.safeParse(data);
    const userId = await getAuthUserId();
    if (!validated.success) {
      return { status: 'error', error: validated.error.errors };
    }

    const {
      name,
      email,
      bank,
      accountNumber,
      depoAmount,
      bankPT,
      game,
      gameUserId,
    } = validated.data;

    if (!userId)
      return {
        status: 'error',
        error: 'user does not exist, please register or login',
      };
    const depo = await db.depo.create({
      data: {
        userId,
        name,
        email,
        bank: bank.value,
        accountNumber,
        depoAmount: +depoAmount,
        bankPT: bankPT.value,
        game: game.value,
        gameUserId,
      },
    });

    return { status: 'success', data: depo };
  } catch (err) {
    console.error(err);
    return { status: 'error', error: 'Something went wrong!' };
  }
}

export async function createWd(data: WdSchema): Promise<ActionResult<Wd>> {
  try {
    const validated = wdSchema.safeParse(data);
    const userId = await getAuthUserId();
    if (!validated.success) {
      return { status: 'error', error: validated.error.errors };
    }

    const { name, email, bank, accountNumber, wdAmount, game, gameUserId } =
      validated.data;
    console.log('create wd invoke');
    if (!userId)
      return {
        status: 'error',
        error: 'user does not exist, please register or login',
      };
    const wd = await db.wd.create({
      data: {
        userId,
        name,
        email,
        bank: bank.value,
        accountNumber,
        wdAmount: +wdAmount,
        game: game.value,
        gameUserId,
      },
    });

    return { status: 'success', data: wd };
  } catch (err) {
    console.error(err);
    return { status: 'error', error: 'Something went wrong!' };
  }
}

export const getDepos = cache(async () => {
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
export const getDepoById = cache(async (id: string) => {
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
export const getDepoByUserId = cache(async (id: string) => {
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

export const getDepoByEmail = cache(async (email: string) => {
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

export const getWds = cache(async () => {
  try {
    const wds = await db.wd.findMany({
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });

    if (!wds) {
      return;
    }
    return wds;
  } catch (err) {
    console.error('Error fetching wd', err);
    return null;
  }
});
export const getWdByUserId = cache(async (id: string) => {
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

export const getWdById = cache(async (id: string) => {
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

export const getWdByEmail = cache(async (email: string) => {
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
