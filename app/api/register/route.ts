import { db } from '@/lib/db';
import { games } from '@/lib/helper';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name, password, bank, phone, game, accountNumber } = body;
  console.log('🚀 ~ POST ~ body:', body);
  const hashedPassword = await bcrypt.hash(password, 12);
  let value: string[] = [];
  game.forEach((item: any) => {
    const gameValue = item.value;
    console.log('🚀 ~ game.forEach ~ gameValue:', gameValue);

    value.push(gameValue);
  });
  console.log('🚀 ~ POST ~ value:', value);
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
