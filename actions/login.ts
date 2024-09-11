'use server';

import { loginSchema, LoginSchema } from '@/schemas';
import * as z from 'zod';
import { getUserByEmail } from './get-user';
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from '@/lib/auth-token/generate-token';
import {
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from '@/lib/auth-token/email';
import { getTwoFactorTokenByEmail } from '@/lib/auth-token/get-two-factor-token';
import { db } from '@/lib/db';
import { getTwoFactorConfirmationByUserId } from '@/lib/auth-token/get-two-factor-confirmation';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { revalidatePath } from 'next/cache';

export const login = async (
  values: z.infer<typeof loginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { status: 'error', error: 'Invalid fields!' };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.hashedPassword) {
    return { status: 'error', error: 'Email does not exist!' };
  }

  if (!existingUser?.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser?.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { status: 'success', success: 'Confirmation email sent!' };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: 'Invalid code!' };
      }
      if (twoFactorToken.token !== code) {
        return { error: 'Invalid code' };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { status: 'error', error: 'Code Expired!' };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: { userId: existingUser.id },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
    revalidatePath('/posts');
    return { status: 'success', data: 'Logged in' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        default:
          return { error: 'Something went wrong!' };
      }
    }
    throw error;
  }
};
