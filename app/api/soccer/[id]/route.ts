import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) throw new Error('No id found');

    const schedule = await db.schedule.findFirst({
      where: { id: params.id },
    });
    if (!schedule) NextResponse.error();

    return NextResponse.json(schedule, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 404,
    });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const { run, date, teamAway, score, teamHome, analysis } = body;
  if (!body) NextResponse.error();

  const id = params.id;
  const isoDate = date + ':00.000Z';

  try {
    const scheduleItem = await db.schedule.update({
      where: { id: params.id },
      data: {
        run,
        date: isoDate,
        teamAway,
        score,
        teamHome,
        analysis,
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
  // const data = await req.json();
  // if (!data) NextResponse.error();

  try {
    const scheduleItem = await db.schedule.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!scheduleItem) return new NextResponse('Invalid ID', { status: 400 });

    const deletedSchedule = await db.schedule.delete({
      where: {
        id: params.id,
      },
    });
    // if (!scheduleItem)
    //   return new Response(
    //     JSON.stringify({ message: 'No Item Found for this id' }),
    //     {
    //       status: 404,
    //     }
    //   );

    return NextResponse.json(deletedSchedule);

    // return new Response(JSON.stringify(scheduleItem), {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   status: 200,
    // });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}
