import getCurrentUser from '@/actions/get-user';
import { currentUser } from '@/lib/auth';

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
    date,
    euroTeamAway,
    euroTeamHome,
    group,
    homeScore,
    status,
    awayScore,
  } = body;
  if (!body) NextResponse.error();
  const isoDate = date + ':00.000Z';

  const id = params.id;

  try {
    const scheduleItem = await db.euro.update({
      where: { id: id },
      data: {
        date: isoDate,
        euroTeamAway,
        euroTeamHome,
        group,
        status,
        homeScore,
        awayScore,
        userId: currentUser.id,
      },
    });

    if (!scheduleItem)
      return new Response(
        JSON.stringify({ message: 'No Item Found for this id' }),
        {
          status: 404,
        }
      );

    // return NextResponse.json(scheduleItem);

    return new Response(JSON.stringify(scheduleItem), {
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
    const eu = await db.euro.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!eu) return new NextResponse('Invalid ID', { status: 400 });

    const deletedEuro = await db.euro.delete({
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
