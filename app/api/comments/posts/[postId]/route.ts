import { db } from '@/lib/db';

import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params;
    if (!postId) throw new Error('No id found');

    const comments = await db.comment.findMany({
      where: { postId: params.postId },
    });
    if (!comments) NextResponse.error();

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 404,
    });
  }
}
