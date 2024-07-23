import getCurrentUser from '@/actions/get-user';
import { db } from '@/lib/db';
import { fetchUserById } from '@/lib/queries/users';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (
      !currentUser ||
      currentUser === undefined ||
      currentUser.role !== 'admin'
    )
      return NextResponse.error();

    const body = await req.json();

    if (!body) NextResponse.error();
    const id = params.id;
    if (!id) throw new Error('No id found!');
    const user = await fetchUserById(id);
    if (!user) throw new Error('No user found');
    const newUser = await db.user.update({
      where: {
        id: id,
      },
      data: {
        active: !user.active,
        editorId: currentUser.id,
      },
    });

    // return new Response(JSON.stringify({ message: 'Success' }), {
    //   status: 200,
    // });

    revalidatePath('/admin');
    return new Response(JSON.stringify(newUser), {
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
