import getCurrentUser from '@/actions/get-user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser === undefined) return NextResponse.error();

    const body = await req.json();

    if (!body) NextResponse.error();
    const id = params.id;

    const { name, bank, accountNumber, game, phone } = body;

    let gameValue;
    game.forEach((item: any) => {
      gameValue = item.value;
    });

    const updatedProfile = await db.user.update({
      where: { id: currentUser.id },
      data: {
        name,
        bank: bank.value,
        accountNumber,
        game: gameValue,
        phone,
      },
    });

    return new Response(JSON.stringify(updatedProfile), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}
