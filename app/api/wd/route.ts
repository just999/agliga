import getCurrentUser from '@/actions/get-user';
import { db } from '@/lib/db';
import { fetchWdByUserId } from '@/lib/queries/depo-wd';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    // if (!currentUser) return NextResponse.error();
    const body = await req.json();
    const {
      email,
      bank,
      accountNumber,
      name,
      wdAmount,
      game,
      gameUserId,
      status,
    } = body;

    const id = new ObjectId();

    if (!id) throw new Error('error');
    const randomId = id.toString();

    const userId = currentUser?.id;
    if (!userId) throw new Error('User id not found');
    const checkUnProcessDepoWd = await fetchWdByUserId(userId);
    const unProcessDepoWd = checkUnProcessDepoWd?.find(
      (depo) => depo.status === 'new'
    );
    if (unProcessDepoWd?.status === 'new') {
      return new Response(
        JSON.stringify({
          message: `Maaf, Anda masih ada form Wd senilai Rp.${unProcessDepoWd.wdAmount} yg belum di Process, harap hubungi customer service kami`,
        }),
        { status: 403 }
      );
    }

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
        status,
      },
    });

    // return NextResponse.json(wd);
    return new Response(JSON.stringify(wd), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
}
