import getCurrentUser from '@/actions/get-user';
import { currentUser } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
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
  // const body = await req.json();
  // if (!body) NextResponse.error();

  const id = params.id;
  const formData = await req.formData();
  // const img = formData.getAll('img').filter((image) => {
  //   return image !== '';
  // });
  const img = formData.get('img') as File;
  const topic = await db.topic.findUnique({
    where: {
      slug: formData.get('category')?.toString(),
    },
  });
  if (!topic?.id) throw new Error('No topic found');

  const topicId = topic.id;

  const updatePost = {
    // img: img,
    category: formData.get('category'),
    title: formData.get('title'),
    author: formData.get('author'),
    brief: formData.get('brief'),
    avatar: currentUser.image,
    top: false,
    topicId: topicId,
    trending: false,
    userId: currentUser.id,
  } as any;
  const post = await db.post.findFirst({
    where: {
      id: id,
    },
  });

  if (post?.img?.startsWith('htt')) {
    if (Array.isArray(post.img)) {
      for (const imgUrl of post.img) {
        const publicId = imgUrl.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId, (err: any, res: any) => {});
      }
    }
    let imgUrl = post.img;
    const publicId = imgUrl.split('/').slice(-2).join('/').split('.')[0];
    await cloudinary.uploader.destroy(publicId, (err: any, res: any) => {});
  }

  // if (!post) return NextResponse.error();
  // const updatedImg = post.img.filter((image) => !img.includes(image));
  let imageUploadPromises = [];
  if (img instanceof File) {
    const imageBuffer = await img.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    const imageBase64 = imageData.toString('base64');

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      { folder: 'agenliga' }
    );
    imageUploadPromises.push(result.secure_url);
    const uploadedImages = await Promise.all(imageUploadPromises);

    updatePost.img = uploadedImages[0];
    revalidatePath('/');
  }

  // if (currentUser.id !== id) {
  //   return NextResponse.error();
  // }

  try {
    const postItem = await db.post.update({
      where: { id: id },
      data: updatePost,
    });
    if (!postItem)
      return new Response(
        JSON.stringify({ message: 'No Item Found for this id' }),
        {
          status: 404,
        }
      );

    // return NextResponse.json({ message: 'update success!' });
    // return NextResponse.json(postItem, { status: 200 });

    return new Response(JSON.stringify(postItem), {
      status: 200,
    });

    // return Response.redirect(`${process.env.NEXTAUTH_URL}/posts/${id}`);
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

  const id = params.id;

  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  try {
    const post = await db.post.findUnique({
      where: {
        id: id,
      },
    });

    if (!post) return new Response('No Post found', { status: 404 });

    if (post.userId !== currentUser.id)
      return new Response('U are not authorized to delete this post', {
        status: 401,
      });

    // let deletedPost;
    // if (post.img.length > 0)
    //   for (const imgUrl of post.img) {
    //     const publicId = imgUrl.split('/').slice(-2).join('/').split('.')[0];
    //     await cloudinary.uploader.destroy(publicId, (err: any, res: any) => {});
    //   }
    if (post?.img?.startsWith('htt')) {
      if (Array.isArray(post.img)) {
        for (const imgUrl of post.img) {
          const publicId = imgUrl.split('/').slice(-2).join('/').split('.')[0];
          await cloudinary.uploader.destroy(
            publicId,
            (err: any, res: any) => {}
          );
        }
      }
      let imgUrl = post.img;
      const publicId = imgUrl.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(publicId, (err: any, res: any) => {});
    }

    const deletedPost = await db.post.delete({
      where: {
        id: params.id,
      },
    });
    // const postItem = await db.post.findUnique({
    //   where: {
    //     id: params.id,
    //   },
    // });

    // if (!postItem) return new NextResponse('Invalid ID', { status: 400 });

    // const deletedPost = await db.post.delete({
    //   where: {
    //     id: params.id,
    //   },
    // });
    // if (!postItem)
    //   return new Response(
    //     JSON.stringify({ message: 'No Item Found for this id' }),
    //     {
    //       status: 404,
    //     }
    //   );

    // return NextResponse.json(deletedPost);

    return new Response(JSON.stringify(deletedPost), {
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
