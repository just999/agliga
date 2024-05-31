import getCurrentUser from '@/actions/get-user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    const id = params.id;

    const formData = await req.formData();
    const images = formData.get('images');

    const updatedSliderImage = {
      images,
      userId: currentUser.id,
    };
    const img = await db.slider.findFirst({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ message: 'update success!' });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}
