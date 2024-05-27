import getCurrentUser from '@/actions/get-user';

import cloudinary from '@/lib/cloudinary';
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

// post with multiple images....( not yet solved!)
// export async function POST(req: Request) {
//   const currentUser = await getCurrentUser();
//   if (!currentUser) return NextResponse.error();
//   // const body = await req.json();
//   // const cat = body.category.value;

//   try {
//     const formData = await req.formData();
//     const img = formData.getAll('img').filter((image) => {
//       return image !== '';
//     });
//     const topic = await db.topic.findUnique({
//       where: {
//         slug: formData.get('category')?.toString(),
//       },
//     });
//     if (!topic?.id) throw new Error('No topic found');
//     const id = topic.id;

//     const newPost = {
//       img,
//       category: formData.get('category'),
//       title: formData.get('title'),
//       author: formData.get('author'),
//       brief: formData.get('brief'),
//       avatar: currentUser.image,
//       top: false,
//       topicId: id,
//       trending: false,
//       userId: currentUser.id,
//     } as any;
//     Object.keys(img).forEach((e: any) =>
//       console.log(`key=${e}  value=${img[e]}`)
//     );

//     for (let key in img) {
//       if (img.hasOwnProperty(key)) {
//         const value = img[key];
//         console.log(key, value);
//       }
//     }

//     let imageUploadPromises = [];

//     for (const image of img) {
//       if (image instanceof File) {
//         const imageBuffer = await image.arrayBuffer();
//         const imageArray = Array.from(new Uint8Array(imageBuffer));
//         const imageData = Buffer.from(imageArray);

//         const imageBase64 = imageData.toString('base64');

//         const result = await cloudinary.uploader.upload(
//           `data:image/png;base64,${imageBase64}`,
//           { folder: 'agenliga' }
//         );
//         imageUploadPromises.push(result.secure_url);
//         const uploadedImages = await Promise.all(imageUploadPromises);
//         newPost.img = uploadedImages;
//       }
//     }

//     const createdPost = await db.post.create({
//       data: newPost,
//     });
//     // return new Response(JSON.stringify(createdPost), {
//     //   status: 200,
//     // });
//     if (!createdPost) throw new Error('post error !');
//     return Response.redirect(
//       `${process.env.NEXTAUTH_URL}/posts/${createdPost.id}`
//     );
//   } catch (err) {
//     return new Response('Something Went Wrong', {
//       status: 500,
//     });
//   }
// }

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  // const body = await req.json();
  // const cat = body.category.value;

  try {
    const formData = await req.formData();
    const img = formData.get('img');
    const topic = await db.topic.findUnique({
      where: {
        slug: formData.get('category')?.toString(),
      },
    });
    if (!topic?.id) throw new Error('No topic found');
    const id = topic.id;

    const newPost = {
      img,
      category: formData.get('category'),
      title: formData.get('title'),
      author: formData.get('author'),
      brief: formData.get('brief'),
      avatar: currentUser.image,
      top: false,
      topicId: id,
      trending: false,
      userId: currentUser.id,
    } as any;
    // Object.keys(img).forEach((e: any) =>
    //   console.log(`key=${e}  value=${img[e]}`)
    // );

    // for (let key in img) {
    //   if (img.hasOwnProperty(key)) {
    //     const value = img[key];
    //     console.log(key, value);
    //   }
    // }

    const image = formData.get('img');

    let imageUploadPromises = [];

    if (image instanceof File) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      const imageBase64 = imageData.toString('base64');

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: 'agenliga' }
      );
      imageUploadPromises.push(result.secure_url);
      const uploadedImages = await Promise.all(imageUploadPromises);
      newPost.img = uploadedImages[0];
    }

    const createdPost = await db.post.create({
      data: newPost,
    });
    // return new Response(JSON.stringify(createdPost), {
    //   status: 200,
    // });
    if (!createdPost) throw new Error('post error !');
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/posts/${createdPost.id}`
    );
  } catch (err) {
    return new Response('Something Went Wrong', {
      status: 500,
    });
  }
}
