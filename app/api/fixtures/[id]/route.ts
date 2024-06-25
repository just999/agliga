import getCurrentUser from '@/actions/get-user';
import { db } from '@/lib/db';
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
    week,
    teamAway,
    teamHome,
    homePenalty,
    awayPenalty,
    group,
    homeScore,
    awayScore,
    homeHTScore,
    awayHTScore,
  } = body;
  if (!body) NextResponse.error();
  const isoDate = date + ':00.000Z';

  const id = params.id;
  let ap: string[] = [];
  awayPenalty.forEach((va: any) => {
    const item = va.value;
    ap.push(item);
  });

  let hp: string[] = [];
  homePenalty.forEach((va: any) => {
    const item = va.value;
    hp.push(item);
  });
  let score;
  if (homeScore || awayScore === '') {
    score === null;
  }

  try {
    const scheduleItem = await db.fixture.update({
      where: { id: id },
      data: {
        date: isoDate,
        week: week.value,
        teamHome: teamHome.value,
        homePenalty: hp,
        homeScore: homeScore === '' ? null : homeScore,
        homeHTScore: homeHTScore === '' ? null : homeHTScore,
        teamAway: teamAway.value,
        awayPenalty: ap,
        group,
        awayScore: awayScore === '' ? null : awayScore,
        awayHTScore: awayHTScore === '' ? null : awayHTScore,
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
