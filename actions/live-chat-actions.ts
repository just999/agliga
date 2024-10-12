'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NonMember } from '@/schemas/live-chat-schema';
import { ActionResult } from '@/types';
import { User } from '@prisma/client';
import { cache } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers';

// export async function createAnonymousUser(
//   data: NonMember,
//   existingSessionId?: string
// ): Promise<ActionResult<User>> {
//   try {
//     if (existingSessionId) {
//       const existingUser = await db.user.findFirst({
//         where: { nonUserSessionId: existingSessionId },
//       });
//       if (existingUser) return { status: 'success', data: existingUser };
//     }

//     const nonUserSessionId = uuidv4();

//     const anonymousUser = await db.user.create({
//       data: {
//         name: data.name,
//         email: data.email,
//         nonUserSessionId,
//       },
//     });

//     return { status: 'success', data: anonymousUser };
//   } catch (err) {
//     console.error(err);
//     return { status: 'error', error: 'something went wrong' };
//   }
// }

export async function createAnonymousUser(
  data: NonMember,
  existingSessionId?: string
): Promise<ActionResult<User>> {
  try {
    const cookieStore = cookies();
    let anonymousId = cookieStore.get('anonymousId')?.value;
    const sessionId =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('anonymousId')
        : null;

    if (existingSessionId || anonymousId || sessionId) {
      const existingUser = await db.user.findFirst({
        where: {
          OR: [
            { nonUserSessionId: existingSessionId },
            { nonUserSessionId: anonymousId },
            { nonUserSessionId: sessionId },
          ],
        },
      });
      if (existingUser) return { status: 'success', data: existingUser };
    }

    // If no existing user, create a new one
    anonymousId = uuidv4();

    const anonymousUser = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        nonUserSessionId: anonymousId,
      },
    });

    // Set the anonymous ID in a cookie
    cookieStore.set('anonymousId', anonymousId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    // Store the session ID in the session storage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('anonymousId', anonymousId);
    }

    return { status: 'success', data: anonymousUser };
  } catch (err) {
    console.error(err);
    return { status: 'error', error: 'Something went wrong' };
  }
}

export async function createLiveChatNotification(data: string) {
  try {
    const session = await auth();
    const userRole = session?.user.role;

    if (userRole !== 'admin')
      return { status: 'error', error: 'not authorized' };

    const lcNotification = await db.chat.create({
      data: {
        notification: data,
        userId: session?.user.id,
      },
    });

    return { status: 'success', data: lcNotification };
  } catch (err) {
    console.error(err);
    return { status: 'error', error: 'Something went wrong!' };
  }
}

export const getLiveChatNotifications = cache(async () => {
  try {
    return await db.chat.findMany();
  } catch (err) {
    console.error(err);
    return { status: 'error', error: 'Something went wrong' };
  }
});

export const getAnonymousUser = cache(
  async (userSessionId: string): Promise<ActionResult<User>> => {
    try {
      const cookieStore = cookies();
      const anonymousId = cookieStore.get('anonymousId')?.value;
      const sessionId =
        typeof window !== 'undefined'
          ? sessionStorage.getItem('anonymousSessionId')
          : null;

      let whereClause: { OR: { nonUserSessionId: string }[] };

      if (userSessionId) {
        whereClause = {
          OR: [
            { nonUserSessionId: userSessionId },
            { nonUserSessionId: anonymousId || '' },
            { nonUserSessionId: sessionId || '' },
          ],
        };
      } else {
        whereClause = {
          OR: [
            { nonUserSessionId: anonymousId || '' },
            { nonUserSessionId: sessionId || '' },
          ],
        };
      }
      const existingUser = await db.user.findFirst({
        where: whereClause,
      });

      if (!existingUser) {
        console.log('No user found for id:', userSessionId);
        return { status: 'error', error: 'no user found' };
      }

      return { status: 'success', data: existingUser };
    } catch (err) {
      console.error('Error in getAnonymousUser:', err);
      return { status: 'error', error: 'Something went wrong!' };
    }
  }
);

export const getAnonymousUserByEmail = cache(
  async (email: string): Promise<ActionResult<User>> => {
    try {
      const existingUser = await db.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!existingUser) {
        console.log('No user found for this email:', email);
        return { status: 'error', error: 'no user found' };
      }

      return { status: 'success', data: existingUser };
    } catch (err) {
      console.error('Error in getAnonymousUser:', err);
      return { status: 'error', error: 'Something went wrong!' };
    }
  }
);

export const getAnonymousUserById = cache(
  async (id: string): Promise<ActionResult<User>> => {
    try {
      const nonUser = await db.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!nonUser) return { status: 'error', error: 'no user found' };

      return { status: 'success', data: nonUser };
    } catch (err) {
      console.error(err);
      return { status: 'error', error: 'Something went wrong' };
    }
  }
);

export const getAnonymousUserBySessionId = cache(
  async (sessionId: string): Promise<ActionResult<User>> => {
    try {
      const nonUser = await db.user.findFirst({
        where: {
          nonUserSessionId: sessionId,
        },
      });

      if (!nonUser) return { status: 'error', error: 'no user found' };

      return { status: 'success', data: nonUser };
    } catch (err) {
      console.error(err);
      return { status: 'error', error: 'Something went wrong' };
    }
  }
);
