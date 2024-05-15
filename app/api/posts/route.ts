import getCurrentUser from '@/actions/get-user';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await db.post.findMany();
    if (!posts) throw new Error('Something went wrong');

    return NextResponse.json(posts, {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();
  const body = await req.json();

  const name = body.category.value;

  const topic = await db.topic.findUnique({
    where: {
      slug: name,
    },
  });
  if (!topic?.id) throw new Error('No topic found');
  const id = topic.id;
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
  if (!body) throw new Error('No Post');

  try {
    const post = await db.post.create({
      data: {
        img,
        category: body.category.value,
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
    // return new Response(JSON.stringify(data), {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   status: 201,
    // });

    // return NextResponse.json(data, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   status: 201,
    // });

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    });
  }
}
