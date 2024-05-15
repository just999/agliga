import { db } from '@/lib/db';

import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { postId: string; slug: string } }
) {
  try {
    const { postId, slug } = params;
    if (!postId || !slug) throw new Error('No id found');

    const comments = await db.comment.findFirst({
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
