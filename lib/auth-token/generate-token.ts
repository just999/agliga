import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { getVerificationTokenByEmail } from './get-verification-token';
import { db } from '../db';
import { getPasswordResetTokenByEmail } from './password-reset-token';
import { getTwoFactorTokenByEmail } from './get-two-factor-token';
import { TokenType } from '@prisma/client';

// ?GENERATE TWO FACTOR TOKEN
export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

// ?GENERATE PASSWORD RESET TOKEN
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: { email, token, expires },
  });

  return passwordResetToken;
};

// ?GENERATE VERIFICATION TOKEN
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

// ?GET TOKEN BY EMAIL
export async function getTokenByEmail(email: string) {
  try {
    return db.token.findFirst({
      where: { email },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// ?GET TOKEN BY TOKEN
export async function getTokenByToken(token: string) {
  try {
    return db.token.findFirst({
      where: { token },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// ?GENERATE TOKEN
export async function generateToken(email: string, type: TokenType) {
  const arrayBuffer = new Uint8Array(48);
  crypto.getRandomValues(arrayBuffer);
  const token = Array.from(arrayBuffer, (byte) =>
    byte.toString(16).padStart(2, '0')
  ).join('');
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

  const existingToken = await getTokenByEmail(email);
  if (existingToken) {
    await db.token.delete({
      where: { id: existingToken.id },
    });
  }

  return db.token.create({
    data: {
      email,
      token,
      expires,
      type,
    },
  });
}
