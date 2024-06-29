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
    name,
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

  const newPeriod = name?.slice(0, 2) + name.slice(3);
  const newFixture = `ePL${newPeriod}`;

  console.log('🚀 ~ POST ~ newFixture:', newFixture);

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

  try {
    // const scheduleItem = await db.ePL2122.update({
    //   where: { id: id },
    //   data: {
    //     name,
    //     date: isoDate,
    //     week: week.value,
    //     teamHome: teamHome.value,
    //     homePenalty: hp,
    //     homeScore,
    //     homeHTScore,
    //     teamAway: teamAway.value,
    //     awayPenalty: ap,
    //     group,
    //     awayScore,
    //     awayHTScore,
    //     userId: currentUser.id,
    //   },
    // });

    // if (!scheduleItem)
    //   return new Response(
    //     JSON.stringify({ message: 'No Item Found for this id' }),
    //     {
    //       status: 404,
    //     }
    //   );

    // return NextResponse.json(scheduleItem);
    // return new Response(JSON.stringify(scheduleItem), {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   status: 200,
    // });

    let fixture;
    if (newFixture === 'ePL2122') {
      fixture = await db.ePL2122.update({
        where: { id: id },
        data: {
          name,
          date: isoDate,
          week: week.value,
          teamHome: teamHome.value,
          homePenalty: hp,
          homeScore,
          homeHTScore,
          teamAway: teamAway.value,
          awayPenalty: ap,
          group,
          awayScore,
          awayHTScore,
          userId: currentUser.id,
        },
      });
    } else if (newFixture === 'ePL2223') {
      fixture = await db.ePL2223.update({
        where: { id: id },
        data: {
          name,
          date: isoDate,
          week: week.value,
          teamHome: teamHome.value,
          homePenalty: hp,
          homeScore,
          homeHTScore,
          teamAway: teamAway.value,
          awayPenalty: ap,
          group,
          awayScore,
          awayHTScore,
          userId: currentUser.id,
        },
      });
    } else if (newFixture === 'ePL2324') {
      fixture = await db.ePL2324.update({
        where: { id: id },
        data: {
          name,
          date: isoDate,
          week: week.value,
          teamHome: teamHome.value,
          homePenalty: hp,
          homeScore,
          homeHTScore,
          teamAway: teamAway.value,
          awayPenalty: ap,
          group,
          awayScore,
          awayHTScore,
          userId: currentUser.id,
        },
      });
    } else if (newFixture === 'ePL2425') {
      fixture = await db.ePL2425.update({
        where: { id: id },
        data: {
          name,
          date: isoDate,
          week: week.value,
          teamHome: teamHome.value,
          homePenalty: hp,
          homeScore,
          homeHTScore,
          teamAway: teamAway.value,
          awayPenalty: ap,
          group,
          awayScore,
          awayHTScore,
          userId: currentUser.id,
        },
      });
    }
    console.log('🚀 ~ POST ~ fixture:', fixture);
    return new Response(JSON.stringify({ message: 'Success' }), {
      status: 200,
    });
  } catch (err) {
    console.log('🚀 ~ err:', err);
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string; period: string; title: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { id } = params;
  const body = await req.json();
  console.log('🚀 ~ body:', body, id);

  const { period, title } = body;

  const newPeriod = period?.slice(0, 2) + period.slice(3);
  const newFixture = `ePL${newPeriod}`;

  try {
    let fixture;
    if (newFixture === 'ePL2122') {
      fixture = await db.ePL2122.delete({
        where: { id: id },
      });
    } else if (newFixture === 'ePL2223') {
      fixture = await db.ePL2223.delete({
        where: { id: id },
      });
    } else if (newFixture === 'ePL2324') {
      fixture = await db.ePL2324.delete({
        where: { id: id },
      });
    } else if (newFixture === 'ePL2425') {
      fixture = await db.ePL2425.delete({
        where: { id: id },
      });
    }
    console.log('🚀 ~ POST ~ fixture:', fixture);

    // const formData = await req.formData();
    // const images = formData.get('images');
    // const updatedSliderImage = {
    //   images,
    //   userId: currentUser.id,
    // } as any;

    // const fixture = await db.ePL2122.findUnique({
    //   where: {
    //     id: params.id,
    //   },
    // });

    // if (!fixture) return new NextResponse('Invalid ID', { status: 400 });

    // const deletedFixture = await db.ePL2122.delete({
    //   where: {
    //     id: params.id,
    //   },
    // });
    // return NextResponse.json({ message: 'update success!' });

    revalidatePath(`/soccer?period=${period}`);
    return new Response(JSON.stringify(fixture), { status: 200 });
  } catch (err) {
    console.log('🚀 ~ err:', err);

    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}
