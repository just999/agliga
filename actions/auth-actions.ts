'use server';

import { db } from '@/lib/db';
import { TokenType, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { ActionResult } from '@/types';

import { auth, signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import {
  combinedRegisterSchema,
  LoginSchema,
  ProfileSchema,
  RegisterSchema,
} from '@/schemas';
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from '@/lib/auth-token/email';
import {
  generateToken,
  getTokenByToken,
} from '@/lib/auth-token/generate-token';
import { cache } from 'react';

import { verifyCaptchaToken } from './recapcha-actions';

// !LOGIN USER SERVER ACTION
export const login = async (
  data: LoginSchema
): Promise<ActionResult<string>> => {
  try {
    const existingUser = await getUserByEmail(data.email);

    if (!existingUser || !existingUser.email)
      return { status: 'error', error: 'Invalid credential' };

    if (!existingUser.emailVerified) {
      const token = await generateToken(
        existingUser.email,
        TokenType.VERIFICATION
      );

      await sendVerificationEmail(token.email, token.token);

      return {
        status: 'error',
        error: 'Please verify your email address before logging in',
      };
    }

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { status: 'success', data: 'Logged in' };
  } catch (err) {
    console.log(err);
    if (err instanceof AuthError) {
      switch (err.type) {
        case 'CredentialsSignin':
          return { status: 'error', error: 'Invalid credentials!' };
        default:
          return { status: 'error', error: 'credential not valid!' };
      }
    } else {
      return { status: 'error', error: 'Something went wrong' };
    }
  }
};

// !LOGOUT CURRENT USER
export const logOut = async () => {
  await signOut({ redirectTo: '/' });
};

// !REGISTER USER ACTIONS
export const register = async (
  data: RegisterSchema
): Promise<ActionResult<User>> => {
  try {
    const validated = combinedRegisterSchema.safeParse(data);

    if (!validated.success) {
      // return { error: validated.error.errors };
      return { status: 'error', error: validated.error.errors };
    }

    const { name, email, password, bank, phone, game, accountNumber } =
      validated.data;
    const hashedPassword = await bcrypt.hash(password, 12);
    const existingUser = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUser)
      return { status: 'error', error: 'Email already registered!' };

    let value: string[] = [];
    game.forEach((item: any) => {
      const gameValue = item.value;
      value.push(gameValue);
    });

    // const newDate = new Date();
    const user = await db.user.create({
      data: {
        name,
        email,
        hashedPassword: hashedPassword,
        profileComplete: true,
        bank: bank.value,
        game: value,
        phone,
        accountNumber,
      },
    });

    const verificationToken = await generateToken(
      email,
      TokenType.VERIFICATION
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { status: 'success', data: user };
  } catch (err) {
    console.error(err);
    return { status: 'error', error: 'Something went wrong!' };
  }
};

// !GET USER BY EMAIL
export const getUserByEmail = cache(async (email: string) => {
  return db.user.findUnique({ where: { email } });
});

// !GET USER BY ID
export const getUserById = cache(async (id: string) => {
  return db.user.findUnique({ where: { id } });
});

// !GET CURRENT USER ID
export const getAuthUserId = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  // if (!userId) throw new Error('User status Unauthorized');
  if (!userId) return;

  return userId;
};

// !GET USER ROLE ADMIN OR USER
export const getUserRole = cache(async () => {
  const session = await auth();
  const role = session?.user.role;

  if (!role) throw new Error('Please login');

  return role;
});

// !GET ADMIN USER ID
export const getAuthAdminId = async () => {
  try {
    // Get the current session
    const session = await auth();

    // Check if the session exists and if the user has an admin role
    if (session?.user.role === 'admin') {
      // Return the admin ID
      return session.user.id;
    }

    // Handle cases where the user is not an admin
    throw new Error('User is not an admin');
  } catch (error) {
    console.error('Error retrieving admin ID:', error);
    return { status: 'error', error: 'Could not retrieve admin ID' };
  }
};

// ! VERIFY EMAIL
export const verifyEmail = async (
  token: string
): Promise<ActionResult<string>> => {
  try {
    const existingToken = await getTokenByToken(token);

    if (!existingToken) {
      return { status: 'error', error: 'Invalid token' };
    }

    const hasExpired = new Date() > existingToken.expires;

    if (hasExpired) {
      return { status: 'error', error: 'Token has Expired' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { status: 'error', error: 'user not found' };
    }

    await db.user.update({
      where: { id: existingUser.id },
      data: { emailVerified: new Date() },
    });

    await db.token.delete({ where: { id: existingToken.id } });

    return { status: 'success', data: 'Success' };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// !GENERATE COMPLETE SOCIAL LOGIN PROFILE
export const completeSocialLoginProfile = cache(
  async (data: ProfileSchema): Promise<ActionResult<string>> => {
    const session = await auth();

    if (!session?.user) return { status: 'error', error: 'User not found' };

    const { name, bank, game, phone, accountNumber } = data;

    let value: string[] = [];
    game.forEach((item: any) => {
      const gameValue = item.value;
      value.push(gameValue);
    });
    try {
      const user = await db.user.update({
        where: { id: session.user.id },
        data: {
          name,
          profileComplete: true,
          bank: bank.value,
          game: value,
          phone,
          accountNumber,
        },

        select: {
          accounts: {
            select: {
              provider: true,
            },
          },
        },
      });

      return {
        status: 'success',
        data: user.accounts[0].provider,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

// !GENERATE RESET PASSWORD EMAIL
export const generateResetPasswordEmail = cache(
  async (email: string): Promise<ActionResult<string>> => {
    try {
      const existingUser = await getUserByEmail(email);

      if (!existingUser) {
        return { status: 'error', error: 'Email not found' };
      }

      const token = await generateToken(email, TokenType.PASSWORD_RESET);

      await sendPasswordResetEmail(token.email, token.token);

      return {
        status: 'success',
        data: 'Password reset email has been sent. Please check your email',
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

// !RESET PASSWORD
export const resetPassword = cache(
  async (
    password: string,
    token: string | null
  ): Promise<ActionResult<string>> => {
    try {
      if (!token) return { status: 'error', error: 'Missing Token' };

      const existingToken = await getTokenByToken(token);
      if (!existingToken) {
        return { status: 'error', error: 'Invalid token' };
      }

      const hasExpired = new Date() > existingToken.expires;

      if (hasExpired) {
        return { status: 'error', error: 'Token has Expired' };
      }

      const existingUser = await getUserByEmail(existingToken.email);

      if (!existingUser) {
        return { status: 'error', error: 'user not found' };
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      await db.user.update({
        where: { id: existingUser.id },
        data: { hashedPassword },
      });

      await db.token.delete({
        where: { id: existingToken.id },
      });

      return {
        status: 'success',
        data: 'Password updated successfully, please try to logging in',
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

// !CONTACT US
export async function contactUs(token: string | null, formData: FormData) {
  try {
    if (!token) return { status: 'error', error: 'Missing Token' };

    const captchaData = await verifyCaptchaToken(token);
    if (!captchaData) {
      return { status: 'error', error: 'captcha failed' };
    }

    if (!captchaData.success || captchaData.score < 0.5) {
      return {
        status: 'error',
        error: 'captcha failed',
      };
    }

    return {
      status: 'success',
      data: 'Message successfully sent!',
      errors: !captchaData.success ? captchaData['error-codes'] : null,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      error: 'captcha failed',
    };
  }
}
