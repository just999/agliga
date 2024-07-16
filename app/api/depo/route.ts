import { db } from '@/lib/db';
// import { Depo } from '@prisma/client';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { IconType } from 'react-icons';
import getCurrentUser from '@/actions/get-user';

interface GameProps {
  value: string;
  icon: IconType | string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      bank,
      accountNumber,
      name,
      depoAmount,
      game,
      gameUserId,
      bankPT,
      status,
    } = body;
    const currentUser = await getCurrentUser();
    // if (!currentUser) return NextResponse.error()
    const id = new ObjectId();

    if (!id) throw new Error('error');
    const randomId = id.toString();

    const depo = await db.depo.create({
      data: {
        email,
        bank,
        accountNumber,
        name,
        depoAmount,
        gameUserId,
        game,
        userId: currentUser?.id ? currentUser.id : randomId,
        bankPT,
        status,
      },
    });
    return NextResponse.json(depo);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
