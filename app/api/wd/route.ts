import getCurrentUser from '@/actions/get-user';
import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    // if (!currentUser) return NextResponse.error();
    const body = await req.json();
    const { email, bank, accountNumber, name, wdAmount, game, gameUserId } =
      body;

    const id = new ObjectId();

    if (!id) throw new Error('error');
    const randomId = id.toString();

    const wd = await db.wd.create({
      data: {
        email,
        bank,
        accountNumber,
        name,
        wdAmount,
        gameUserId,
        game,
        userId: currentUser?.id ? currentUser.id : randomId,
      },
    });

    return NextResponse.json(wd);
  } catch (err) {
    console.log(err);
  }
}
