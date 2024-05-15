import { db } from '@/lib/db';

import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
// import { Schedule } from '@prisma/client';
import getCurrentUser from '@/actions/get-user';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { run, date, teamAway, teamHome, analysis } = body;
    let isoDate = date + ':00.000Z';
    // const parseDate = new Date(date);

    // const formattedDate = new Date(
    //   parseDate.getTime() + parseDate.getTimezoneOffset() * 60000
    // )
    //   .toISOString()
    //   .slice(0, 19)
    //   .replace('T', ' ');
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin')
      return NextResponse.error();

    const id = new ObjectId();

    if (!id) throw new Error('error');

    const schedule = await db.schedule.create({
      data: {
        run,
        date: isoDate,
        teamAway,
        teamHome,
        analysis,
      },
    });
    return NextResponse.json(schedule);
    // return NextResponse.json('successfully submit soccer');
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const schedules = await db.schedule.findMany();
    if (!schedules) throw new Error('Something went wrong');

    return NextResponse.json(schedules, {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}
