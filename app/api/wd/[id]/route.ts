import getCurrentUser from '@/actions/get-user';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== 'admin') return NextResponse.error();
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
  if (!body) NextResponse.error();
  // const isoDate = date + ':00.000Z';

  const id = params.id;

  try {
    const wd = await db.wd.update({
      where: { id: id },
      data: {
        email,
        bank,
        accountNumber,
        name,
        wdAmount,
        game,
        gameUserId,
        status,
        adminId: currentUser.id,
      },
    });

    if (!wd)
      return new Response(
        JSON.stringify({ message: 'No Item Found for this id' }),
        {
          status: 404,
        }
      );

    // return NextResponse.json(scheduleItem);
    return new Response(JSON.stringify(wd), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
    // return new Response(JSON.stringify({ message: 'Success' }), {
    //   status: 200,
    // });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const id = params.id;
  // const formData = await req.formData();
  // const images = formData.get('images');
  // const updatedSliderImage = {
  //   images,
  //   userId: currentUser.id,
  // } as any;

  try {
    const eu = await db.depo.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!eu) return new NextResponse('Invalid ID', { status: 400 });

    const deletedEuro = await db.depo.delete({
      where: {
        id: params.id,
      },
    });
    // return NextResponse.json({ message: 'update success!' });

    revalidatePath('/euro');
    return new Response(JSON.stringify(deletedEuro), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}
