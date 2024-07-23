import getCurrentUser from '@/actions/get-user';
import { fetchUserById } from '@/lib/queries/users';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser === undefined) return NextResponse.error();

    const body = await req.json();
    if (!body) NextResponse.error();
    const id = params.id;
    if (!id) throw new Error('No id found!');
    const user = await fetchUserById(id);
    if (!user) throw new Error('No user found');
    return new Response(JSON.stringify({ message: 'Success' }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}
