import { db } from '../db';

export const getVerificationTokenByToken = async (token: string) => {
  // console.log({ tokenVerification: token });
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    // console.log({verificationToken});

    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch (err) {
    return null;
  }
};
