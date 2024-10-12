import { NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';

export async function POST(request: Request) {
  const body = await request.json();
  const { message, sender } = body;

  // Here you can add server-side logic, like storing the message in a database

  await pusherServer.trigger('presence-customer-support', 'new-message', {
    id: Date.now().toString(),
    text: message,
    sender: sender,
  });

  return NextResponse.json({ success: true });
}
