import { db } from '@/lib/db';

import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
// import { Schedule } from '@prisma/client';
import getCurrentUser from '@/actions/get-user';
import NextCors from 'nextjs-cors';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the cors middleware
  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  // Rest of the API logic
  res.json({ message: 'Hello NextJs Cors!' });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, week, date, teamAway, teamHome } = body;

    const newPeriod = name?.slice(0, 2) + name.slice(3);
    const newFixture = `ePL${newPeriod}`;
    let isoDate = date + ':00.000Z';

    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin')
      return NextResponse.error();

    const id = new ObjectId();

    if (!id) throw new Error('error');

    let fixture;
    if (newFixture === 'ePL2122') {
      fixture = await db.ePL2122.create({
        data: {
          name,
          week: week.value,
          date: isoDate,
          teamHome: teamHome.value,
          teamAway: teamAway.value,
          userId: currentUser.id,
        },
      });
    } else if (newFixture === 'ePL2223') {
      fixture = await db.ePL2223.create({
        data: {
          name,
          week: week.value,
          date: isoDate,
          teamHome: teamHome.value,
          teamAway: teamAway.value,
          userId: currentUser.id,
        },
      });
    } else if (newFixture === 'ePL2324') {
      fixture = await db.ePL2324.create({
        data: {
          name,
          week: week.value,
          date: isoDate,
          teamHome: teamHome.value,
          teamAway: teamAway.value,
          userId: currentUser.id,
        },
      });
    } else if (newFixture === 'ePL2425') {
      fixture = await db.ePL2425.create({
        data: {
          name,
          week: week.value,
          date: isoDate,
          teamHome: teamHome.value,
          teamAway: teamAway.value,
          userId: currentUser.id,
        },
      });
    }
    // return NextResponse.json(fixture);
    return NextResponse.json('successfully submit soccer');
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
    const schedules = await db.fixture.findMany();
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
