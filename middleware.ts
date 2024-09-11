// // import { useSession } from 'next-auth/react';

// // import { NextRequest, NextResponse } from 'next/server';
// // import { auth } from './auth';

// // export default async function middleware(request: NextRequest) {
// //   // Your middleware logic here
// //   const user = await auth();
// //   // Example: Conditional logic based on pathname
// //   if (!user || user === undefined) {
// //     return NextResponse.redirect(new URL('/', request.url));
// //   }

// //   return NextResponse.next(); // Pass the request on by default
// // }

// // export const config = {
// //   matcher: ['/trips', '/reservations', '/properties', '/favorites'],
// // };

// import { NextResponse } from 'next/server';
// import NextAuth from 'next-auth';
// import authConfig from './auth.config';
// import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from '@/routes';

// const { auth } = NextAuth(authConfig);

// export async function middleware(request: any, response: any) {
//   const session = await auth();
//   // Allow CORS for specific origins (replace with your frontend origin)
//   const allowedOrigins = ['https://agenliga.cloud'];

//   // const origin = request.headers.origin;

//   const res = NextResponse.next();
//   // add the CORS headers to the response
//   res.headers.append('Access-Control-Allow-Credentials', 'true');
//   res.headers.append('Access-Control-Allow-Origin', '*'); // replace this your actual origin
//   res.headers.append(
//     'Access-Control-Allow-Methods',
//     'GET,DELETE,PATCH,POST,PUT'
//   );
//   res.headers.append(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   );

//   return res;

//   // if (allowedOrigins.includes(origin)) {
//   //   response.setHeader('Access-Control-Allow-Origin', origin);
//   //   response.setHeader(
//   //     'Access-Control-Allow-Methods',
//   //     'GET, POST, PUT, DELETE'
//   //   );
//   //   response.setHeader(
//   //     'Access-Control-Allow-Headers',
//   //     'Content-Type, Authorization'
//   //   );
//   // }
// }

// export default auth((req) => {
//   const { nextUrl } = req;
//   const isAuthenticated = !!req.auth;
//   const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

//   // Public routes definition (assuming you want these routes to be accessible without authentication)

//   // ... rest of your middleware logic (if any)
// });

// export const config = {
//   matcher: [
//     '/((?!.+\\.[\\w]+$|_next).*)',
//     '/',
//     '/(api|trpc)(.*)',
//     '/api/:path*',
//   ],
// };
import { NextResponse } from 'next/server';

import { authRoutes, publicRoutes } from './routes';
import { auth } from './auth';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublic = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProfileComplete = req.auth?.user.profileComplete;
  const isAdmin = req.auth?.user.role === 'admin';

  const isAdminRoute = nextUrl.pathname.startsWith('/admin');

  if (isPublic) {
    return NextResponse.next();
  }

  if (isAdminRoute) {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', nextUrl));
    }
    return NextResponse.next();
  }

  if (!isPublic && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  if (
    isLoggedIn &&
    !isProfileComplete &&
    nextUrl.pathname !== '/complete-profile'
  ) {
    return NextResponse.redirect(new URL('/complete-profile', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
