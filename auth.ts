import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './lib/db';
import { getUserById } from './actions/get-user';
import { getTwoFactorConfirmationByUserId } from './lib/auth-token/get-two-factor-confirmation';
import { Role } from '@prisma/client';
import { UserProps } from './types/types';
import { Adapter } from 'next-auth/adapters';

const test = process.env.AUTH_SECRET;
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {},
  callbacks: {
    // async signIn({ user, account }) {
    //   console.log({ user, account });
    //   // Alow OAuth without email verification
    //   if (account?.provider !== 'credentials') return true;

    //   const existingUser = await getUserById(user.id);

    //   if (!existingUser?.emailVerified) return false;

    //   if (existingUser.isTwoFactorEnabled) {
    //     const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
    //       existingUser.id
    //     );

    //     // console.log({ twoFactorConfirmation });

    //     if (!twoFactorConfirmation) return false;

    //     await db.twoFactorConfirmation.delete({
    //       where: { id: twoFactorConfirmation.id },
    //     });
    //   }
    //   return true;
    // },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.profileComplete = token.profileComplete as boolean;
        session.user.role = token.role as Role;
      }

      if (token.curUser && session.user) {
        session.user.curUser = token.curUser as UserProps;
      }
      return session;
    },
    async jwt({ user, token, profile }) {
      const curUser = await getUserById(token.sub);
      if (!curUser) return token;

      if (user) {
        token.profileComplete = user.profileComplete;
        token.role = user.role;
      }
      token.curUser = curUser;
      token.name = curUser.name;
      token.picture = curUser.image;
      return token;
    },
  },
  adapter: PrismaAdapter(db) as unknown as Adapter,
  session: { strategy: 'jwt' },
  ...authConfig,
});
