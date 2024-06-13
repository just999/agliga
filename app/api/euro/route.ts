import { db } from '@/lib/db';

import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
// import { Schedule } from '@prisma/client';
import getCurrentUser from '@/actions/get-user';

import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the cors middleware
  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  // Rest of the API logic
}

export async function POST(req: Request) {
  try {
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
    let isoDate = date + ':00.000Z';

    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin')
      return NextResponse.error();

    const id = new ObjectId();

    if (!id) throw new Error('error');
    const schedule = await db.euro.create({
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
