import getCurrentUser from '@/actions/get-user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) throw new Error('No id found');

    const post = await db.post.findFirst({
      where: { id: params.id },
    });
    if (!post) NextResponse.error();

    return NextResponse.json(post, { status: 200 });
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
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();
  const body = await req.json();
  if (!body) NextResponse.error();

  const id = params.id;

  const topic = await db.topic.findUnique({
    where: {
      slug: body.category,
    },
  });
  if (!topic?.id) throw new Error('No topic found');

  const {
    img,
    category,
    title,
    brief,
    avatar,
    author,
    top,
    topicId,
    trending,
  } = body;
  try {
    const postItem = await db.post.update({
      where: { id: id },
      data: {
        img,
        category: body.category,
        title,
        brief,
        avatar,
        author,
        top,
        topicId: topic.id,
        trending,
        userId: currentUser.id,
      },
    });
    if (!postItem)
      return new Response(
        JSON.stringify({ message: 'No Item Found for this id' }),
        {
          status: 404,
        }
      );

    // return NextResponse.json(postItem);

    return new Response(JSON.stringify(postItem), {
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
    const postItem = await db.post.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!postItem) return new NextResponse('Invalid ID', { status: 400 });

    const deletedPost = await db.post.delete({
      where: {
        id: params.id,
      },
    });
    // if (!postItem)
    //   return new Response(
    //     JSON.stringify({ message: 'No Item Found for this id' }),
    //     {
    //       status: 404,
    //     }
    //   );

    return NextResponse.json(deletedPost);

    // return new Response(JSON.stringify(postItem), {
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
