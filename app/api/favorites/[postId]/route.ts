import getCurrentUser from '@/actions/get-user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { postId } = params;

  if (!postId || typeof postId !== 'string') throw new Error('Invalid postId');

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(postId);

  const user = await db.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { postId } = params;

  if (!postId || typeof postId !== 'string') throw new Error('Invalid postId');

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== postId);

  const user = await db.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
