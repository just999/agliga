import { db } from '@/lib/db';
import { games } from '@/lib/helper';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name, password, bank, phone, game, accountNumber } = body;
  const hashedPassword = await bcrypt.hash(password, 12);
  let value;
  game.forEach((item: any) => {
    value = item.value;
  });
  const user = await db.user.create({
    data: {
      email,
      name,
      hashedPassword,
      bank: bank.value,
      game: value,
      phone,
      accountNumber,
    },
  });

  return NextResponse.json(user);
}
