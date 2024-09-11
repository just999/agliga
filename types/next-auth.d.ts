import { Role } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';

import { UserProps } from './types';

export type ExtendedUser = DefaultSession['User'] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
  interface User {
    curUser?: UserProps;
    profileComplete?: boolean;
    role: Role;
  }

  interface Session {
    user: {
      curUser: UserProps;
      profileComplete: boolean;
      role: Role;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    curUser: UserProps;
    profileComplete: boolean;
    role: Role;
  }
}
