// import { auth } from '@/auth';
// import { pusherServer } from '@/lib/pusher';
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   console.log('Handler invoked');
//   try {
//     const session = await auth();
//     if (!session?.user?.id) {
//       return new Response('Unauthorized', { status: 401 });
//     }

//     const body = await req.formData();
//     const socketId = body.get('socket_id') as string;
//     const channel = body.get('channel_name') as string;
//     const data = {
//       user_id: session.user.id,
//     };

//     const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

//     return NextResponse.json(authResponse);
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }

// import { NextResponse } from 'next/server';
// import { pusherServer } from '@/lib/pusher';
// import { auth } from '@/auth';
// import { getOrCreateAnonymousId } from '@/lib/utils';

// export async function POST(request: Request) {
//   console.log('Handler invoked');
//   try {
//     const contentType = request.headers.get('content-type');
//     let body: any;

//     if (contentType === 'application/json') {
//       // Parse JSON
//       body = await request.json();
//     } else if (contentType === 'application/x-www-form-urlencoded') {
//       // Parse URL-encoded data
//       const formData = await request.formData();
//       body = {};
//       // Convert FormData to a plain object
//       formData.forEach((value, key) => {
//         body[key] = value;
//       });
//     } else {
//       // If content type is unsupported, return an error
//       return NextResponse.json(
//         { error: 'Unsupported content type' },
//         { status: 415 }
//       );
//     }

//     const { socket_id, channel_name } = body;

//     // Continue with your existing logic
//     const session = await auth();
//     let userId = '';
//     let userInfo = {};
//     if (session?.user) {
//       userId = session.user.id;
//       userInfo = { name: session.user.curUser.name };
//     } else {
//       userId = getOrCreateAnonymousId();
//       userInfo = { name: `Anonymous User ${userId}` };
//     }
//     const authResponse = pusherServer.authorizeChannel(
//       socket_id,
//       channel_name,
//       {
//         user_id: userId,
//         user_info: userInfo,
//       }
//     );
//     return NextResponse.json(authResponse);
//   } catch (err) {
//     // Handle other errors
//     console.error(err);
//     return NextResponse.json(
//       { error: 'Internal Server Error' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  console.log('Pusher Auth Handler invoked');
  try {
    const contentType = request.headers.get('content-type');
    let body: any;

    if (contentType === 'application/json') {
      body = await request.json();
    } else if (contentType === 'application/x-www-form-urlencoded') {
      const formData = await request.formData();
      body = Object.fromEntries(formData);
    } else {
      return NextResponse.json(
        { error: 'Unsupported content type' },
        { status: 415 }
      );
    }

    const { socket_id, channel_name } = body;

    const session = await auth();
    let userId = '';
    let userInfo = {};

    if (session?.user) {
      userId = session.user.id;
      userInfo = { name: session.user.curUser.name };
    } else {
      // For unauthenticated users, check if they have a valid anonymous ID in cookies
      const cookieStore = cookies();
      const anonymousId = cookieStore.get('anonymousId')?.value;

      if (!anonymousId) {
        console.log('No anonymous ID found for unauthenticated user');
        return;
      }

      // Verify the anonymous ID exists in the database
      const anonymousUser = await db.user.findFirst({
        where: { nonUserSessionId: anonymousId },
      });

      if (!anonymousUser) {
        console.log('Invalid anonymous ID');
        return;
      }

      userId = anonymousUser.id;
      userInfo = { name: `${anonymousUser.name}` };
    }

    console.log('Authorizing for user:', userId);

    const authResponse = pusherServer.authorizeChannel(
      socket_id,
      channel_name,
      {
        user_id: userId,
        user_info: userInfo,
      }
    );
    return NextResponse.json(authResponse);
  } catch (err) {
    console.error('Error in Pusher auth:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
