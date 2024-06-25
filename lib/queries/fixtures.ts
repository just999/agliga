'use server';

import { cache } from 'react';
import { db } from '../db';
import { IPostsParams } from './posts';
import posts from '@/components/posts/posts';

export type TFixtureParams = {
  userId?: string;
  period?: string;
  fixtureId?: string;
  week?: string;
};

export const fetchFixtures = cache(async () => {
  try {
    const fixtures = await db.fixture.findMany({
      orderBy: {
        week: 'desc',
      },
    });

    if (!fixtures) return null;
    return fixtures;
  } catch (err) {
    console.error('Error fetching fixture', err);
    return null;
  }
});

export const fetchFixtureByUserId = cache(async (params: TFixtureParams) => {
  const { userId } = params;

  try {
    if (userId) {
      const fixturesByUserId = await db.fixture.findMany({
        where: { userId },
      });
      if (!fixturesByUserId) return null;
      return fixturesByUserId;
    } else if (!userId) {
      const fixtures = await db.fixture.findMany({
        orderBy: {
          week: 'asc',
        },
      });

      if (!fixtures) return null;
      return fixtures;
    }
  } catch (err: unknown) {
    console.error('Error fetching random post:', err);
    return null;
  }
});

export const fetchFixtureById = cache(async (id?: string) => {
  try {
    if (!id) throw new Error('No Id');
    const fixture = await db.fixture.findUnique({
      where: {
        id: id,
      },
    });

    return fixture;
  } catch (err: unknown) {
    console.error('Error fetching fixture', err);
    throw new Error('Something went wrong');
  }
});

export const fetchFixtureByPeriod = cache(async (params: TFixtureParams) => {
  try {
    const { period } = params;
    if (!period) return null;
    const fixtures = await db.fixture.findMany({
      where: {
        name: period,
      },
    });

    if (!fixtures) return null;

    return fixtures;
  } catch (err) {
    console.error('Error fetching fixture', err);
    return null;
  }
});

export const fetchEPL2122 = cache(async () => {
  try {
    const epl = await db.ePL2122.findMany({
      orderBy: {
        week: 'desc',
      },
    });
    if (!epl) return null;
    return epl;
  } catch (err) {
    console.error('Error fetching fixture', err);
    return null;
  }
});

export const fetchEPL2223 = cache(async () => {
  try {
    const epl = await db.ePL2223.findMany({
      orderBy: {
        week: 'desc',
      },
    });

    if (!epl) return null;
    return epl;
  } catch (err) {
    console.error('Error fetching fixture', err);
    return null;
  }
});

export const fetchEPL2324 = cache(async () => {
  try {
    const epl = await db.ePL2324.findMany({
      orderBy: {
        week: 'desc',
      },
    });

    if (!epl) return null;
    return epl;
  } catch (err) {
    console.error('Error fetching fixture', err);
    return null;
  }
});

export const fetchEPL2425 = cache(async () => {
  try {
    const epl = await db.ePL2425.findMany({
      orderBy: {
        week: 'desc',
      },
    });

    if (!epl) return null;
    return epl;
  } catch (err) {
    console.error('Error fetching fixture', err);
    return null;
  }
});
