import { db } from '@/lib/db';
// import { Depo } from '@prisma/client';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { IconType } from 'react-icons';
import getCurrentUser from '@/actions/get-user';
import { fetchDepoByUserId } from '@/lib/queries/depo-wd';

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

    const userId = currentUser?.id;
    if (!userId) throw new Error('User id not found');
    const checkUnProcessDepoWd = await fetchDepoByUserId(userId);
    const unProcessDepoWd = checkUnProcessDepoWd?.find(
      (depo) => depo.status === 'new'
    );
    if (unProcessDepoWd?.status === 'new') {
      return new Response(
        JSON.stringify({
          message:
            'Maaf, sepertinya Anda masih ada Depo yg belum di Process, harap hubungi customer service kami',
        }),
        { status: 403 }
      );
    }

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
    // return NextResponse.json(depo);
    return new Response(JSON.stringify(depo), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
    // return NextResponse.json(
    //   { message: 'Internal Server Error' },
    //   { status: 500 }
    // );
  }
}
