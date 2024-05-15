import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './lib/db';
import { getUserById } from './actions/get-user';

const test = process.env.AUTH_SECRET;
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {},
  callbacks: {
    async session({ token, session }) {
      // console.log({ token, session });

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.curUser && session.user) {
        session.user.curUser = token.curUser;
      }
      return session;
    },
    async jwt({ token, user, profile }) {
      // console.log({ token });

      if (!token.sub) return token;
      token.customField = 'test';

      const curUser = await getUserById(token.sub);
      if (!curUser) return token;

      // token.role = curUser.role;
      token.curUser = curUser;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
