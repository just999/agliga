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
      name,
      date,
      teamAway,
      teamHome,
      week,
      homePenalty,
      awayPenalty,
      homeScore,
      awayScore,
    } = body;
    let isoDate = date + ':00.000Z';

    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin')
      return NextResponse.error();

    const id = new ObjectId();

    // let win: any = '';
    // let los: any = '';
    // if (Number(homeScore) > Number(awayScore)) {
    //   win === euroTeamHome;
    // } else {
    //   los === euroTeamAway;
    // }

    // let hg;
    // if (homeScore & awayScore) {
    //   hg = Number(homeScore) - Number(awayScore);
    // }

    // let ag;
    // if (homeScore & awayScore) {
    //   ag = Number(awayScore) - Number(homeScore);
    // }
    if (!id) throw new Error('error');
    const epl = await db.ePL2324.create({
      data: {
        name,
        date: isoDate,
        teamHome,
        homePenalty,
        awayPenalty,
        homeScore,
        teamAway,
        week,
        awayScore,
        userId: currentUser.id,
      },
    });
    return NextResponse.json(epl);
    // return NextResponse.json('successfully submit soccer');
  } catch (err) {
    console.log(err);
    console.error(err);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const epl = await db.ePL2324.findMany();
    if (!epl) throw new Error('Something went wrong');

    return NextResponse.json(epl, {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}
