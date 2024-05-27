// import { useSession } from 'next-auth/react';

// import { NextRequest, NextResponse } from 'next/server';
// import { auth } from './auth';

// export default async function middleware(request: NextRequest) {
//   // Your middleware logic here
//   const user = await auth();
//   // Example: Conditional logic based on pathname
//   if (!user || user === undefined) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   return NextResponse.next(); // Pass the request on by default
// }

// export const config = {
//   matcher: ['/trips', '/reservations', '/properties', '/favorites'],
// };

import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from '@/routes';

const { auth } = NextAuth(authConfig);

export function middleware(request: any, response: any) {
  // Allow CORS for specific origins (replace with your frontend origin)
  const allowedOrigins = ['https://ae38-175-100-33-86.ngrok-free.app'];

  const origin = request.headers.origin;

  if (allowedOrigins.includes(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE'
    );
    response.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
  }
}
export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  // Public routes definition (assuming you want these routes to be accessible without authentication)

  // ... rest of your middleware logic (if any)
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
