'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    if (!user) throw new Error('No user found with email submitted by User');

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id?: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    if (!user) throw new Error('No user found with that user id');
    return user;
  } catch (err) {
    return null;
  }
};

export default async function getCurrentUser() {
  try {
    const session = await auth();
    if (!session?.user?.email) return null;

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) throw new Error('No User currently Logged in');
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (err) {
    return null;
  }
}
