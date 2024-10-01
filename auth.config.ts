import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import Credentials from 'next-auth/providers/credentials';
import bcrypt, { compare } from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import { db } from './lib/db';
import { loginSchema } from './schemas';
import { getUserByEmail } from './actions/get-user';

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Github({
      clientId: process.env.ITS_GITHUB_ID,
      clientSecret: process.env.ITS_GITHUB_SECRET,
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        // if (!credentials?.email || !credentials?.password) {
        //   throw new Error('Invalid credentials');
        // }
        // const user = await db.user.findUnique({
        //   where: {
        //     email: credentials.email as string,
        //   },
        // });
        // if (!user || !user?.hashedPassword) {
        //   throw new Error('Invalid credentials');
        // }

        // const isCorrectPassword = await bcrypt.compare(
        //   credentials.password as string,
        //   user.hashedPassword
        // );

        // if (!isCorrectPassword) {
        //   throw new Error('Invalid credentials');
        // }

        // return user;

        const validated = loginSchema.safeParse(credentials);

        if (validated.success) {
          const { email, password } = validated.data;

          const user = await getUserByEmail(email);

          if (
            !user ||
            !user.hashedPassword ||
            !(await compare(password, user.hashedPassword))
          )
            return null;

          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
