'use server';

import { db } from '@/lib/db';
import { getAuthAdminId, getAuthUserId, getUserRole } from './auth-actions';
import { ActionResult, GetUserParams, PaginatedResponse } from '@/types';
import { NextResponse } from 'next/server';
import { Photo, User } from '@prisma/client';
import cloudinary from '@/lib/cloudinary';
import { cache } from 'react';
import { getAdmins } from './admin-actions';
import { fetchCurrentUserLikeIds } from './like-actions';
import { auth } from '@/auth';
import { ObjectId } from 'mongodb';
import { userRole } from '@/lib/auth';
import {
  editUserProfileSchema,
  EditUserProfileSchema,
  updateAvatarSchema,
  UpdateAvatarSchema,
} from '@/schemas';
import getCurrentUser from './get-user';
import { profile } from 'console';
import { url } from 'inspector';
import { revalidatePath } from 'next/cache';

// ?GET USERS WITH QUERY STRING
export async function getUsers({
  // ageRange = '18,100',
  // gender = 'male,female',
  orderBy = 'updated',
  pageNumber = '1',
  pageSize = '12',
  withPhoto = 'true',
}: GetUserParams): Promise<PaginatedResponse<User>> {
  const userId = await getAuthUserId();

  // const [minAge, maxAge] = ageRange.split(',');

  const currentDate = new Date();

  // const minDob = addYears(currentDate, -maxAge - 1);

  // const maxDob = addYears(currentDate, -minAge);

  // const selectedGender = gender.split(',');

  const page = parseInt(pageNumber);
  const limit = parseInt(pageSize);

  const skip = (page - 1) * limit;

  try {
    const count = await db.user.count({
      where: {
        NOT: {
          id: userId,
        },
      },
    });

    // const users = await db.user.findMany({
    //   where: {
    //     AND: [
    //       { dateOfBirth: { gte: minDob } },
    //       { dateOfBirth: { lte: maxDob } },
    //       { gender: { in: selectedGender } },
    //       ...(withPhoto === 'true' ? [{ image: { not: null } }] : []),
    //     ],
    //     NOT: {
    //       userId,
    //     },
    //   },
    //   orderBy: { [orderBy]: 'desc' },
    //   skip,
    //   take: limit,
    // });

    const users = (await db.user.findMany()) as any;

    return {
      items: users,
      totalCount: count,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// ?GET ALL USER By IT'S ROLE AS USER
export async function getAllUser() {
  try {
    return await db.user.findMany({
      where: {
        role: 'user',
      },
    });
  } catch (err) {
    console.error(err);
  }
}

// ?GET USER BY USER ID
export async function getUserByUserId(userId: string) {
  if (!ObjectId.isValid(userId)) {
    throw new Error('Invalid Object id');
  }
  try {
    return await db.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (err) {
    console.error('Database error:', err);
    throw err; // Consider rethrowing to handle this higher up the call stack
  }
}

// ?GET ADMIN BY USER ID
export async function getAdminUserId(adminId: string) {
  try {
    return await db.user.findUnique({
      where: {
        id: adminId,
        role: 'admin',
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// ?ADD IMAGE BY USER ID
export async function addImage(url: string, publicId: string) {
  try {
    const userId = await getAuthUserId();

    return db.user.update({
      where: { id: userId },
      data: {
        photos: {
          create: [{ url, publicId }],
        },
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// ?SET USER MAIN IMAGE
export async function setMainImage(photo: Photo) {
  if (!photo.isApproved)
    throw new Error('Only approved photos can be set to main image');
  try {
    const userId = await getAuthUserId();

    await db.user.update({
      where: {
        id: userId,
      },
      data: { image: photo.url },
    });

    return db.user.update({
      where: { id: userId },
      data: { image: photo.url },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// ?DELETE IMAGE BY USER ID
export async function deleteImage(photo: Photo) {
  try {
    const userId = await getAuthUserId();
    // if (!userId) {
    //   throw new Error('No User id found!');
    // }
    if (photo.publicId) {
      await cloudinary.uploader.destroy(photo.publicId);
    }

    return db.user.update({
      where: { id: userId },
      data: {
        photos: {
          delete: { id: photo.id },
        },
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// ?GET PHOTO BY USER ID
export async function getPhotosByUserId(userId: string) {
  const currentUserId = await getAuthUserId();

  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      photos: {
        where: currentUserId === userId ? {} : { isApproved: true },
      },
    },
  });

  if (!user) return null;

  return user.photos as Photo[];
}

// ?GET USER INFO FOR NAVIGATION MENU TO GET NAME & IMAGE ONLY
export async function getUserInfoForNav() {
  try {
    const userId = await getAuthUserId();

    return db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        image: true,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// ?GET ALL USER BY EXCEPT IT'S OWN
export const fetchUsers = async () => {
  const userId = await getAuthUserId();

  try {
    return await db.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
      },
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });
  } catch (err) {
    console.error('Error getting euro', err);
    return null;
  }
};

// ?GET USER BY ID
export const getUserById = async (id: string) => {
  try {
    if (!id) return;
    const user = await db.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  } catch (err) {
    console.error('Error getting euro', err);
    return null;
  }
};

// ?GET USER BY EMAIL
export const getUserByEmail = cache(async (email: string) => {
  try {
    if (!email) throw new Error('No email');
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (err) {
    console.error('Error getting euro', err);
    return null;
  }
});

// ?GET ADMIN-USER ACCORDING TO ROLES
export const getAdminUserByRole = async (searchParams: GetUserParams) => {
  try {
    const userId = await getAuthUserId();
    const adminId = await getAuthAdminId();
    const users = (await getAllUser()) || [];

    const role = await getUserRole();

    const { items: admins, totalCount } = await getAdmins(searchParams);

    const adminUsers = role === 'admin' ? users : admins;

    return { adminUsers, userId, adminId };
  } catch (err) {
    console.error('Error fetching admin or user', err);
    return null;
  }
};

// ?GET ADMIN-USER AND LIKE IDS
export const adminUserAndLikeIds = async () => {
  const adminChatId = '66b5e94e1df1aa252cef500f';
  const admin = await getAdminUserId(adminChatId);
  const likeIds = await fetchCurrentUserLikeIds();
  const users = await fetchUsers();

  const role = await userRole();

  const adminArray = admin ? [admin] : [];
  const adminUser = role === 'admin' ? users : adminArray;

  return NextResponse.json({ adminUser, likeIds });
};

// ?EDIT USER PROFILE BY USER
export const editUserProfile = async (
  data: EditUserProfileSchema
): Promise<ActionResult<User>> => {
  try {
    const userId = await getAuthUserId();

    const validated = editUserProfileSchema.safeParse(data);

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors };
    }

    const { name, bank, accountNumber, game, phone } = validated.data;

    let gameValue: string[] = [];
    if (Array.isArray(game))
      game.forEach((item) => {
        gameValue.push(item.value);
      });

    const profile = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        bank: bank.value,
        accountNumber,
        game: gameValue,
        phone,
      },
    });

    return {
      status: 'success',
      data: profile,
    };
  } catch (err) {
    console.error(err);
    return { status: 'error', error: 'Something went wrong' };
  }
};

// ?EDIT IMAGE AVATAR BY USER
export async function updateUserAvatar(data: FormData) {
  try {
    const userId = await getAuthUserId();

    const user = await getCurrentUser();
    if (!user) {
      return { status: 'error', error: 'you are not authorized' };
    }
    const image = data.get('image');

    // !ALTERNATE WAY MORE ELEGANT WAY TO SOLVE THE PROBLEMS

    if (user.image?.startsWith('http')) {
      const publicId = user.image.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(publicId, (err: any, res: any) => {});
    }

    if (!(image instanceof File))
      return { status: 'error', error: 'Invalid image file' };

    const imageBuffer = await image.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);
    const imageBase64 = imageData.toString('base64');

    const res = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      { folder: 'agenliga' }
    );

    const newAvatarImage = {
      image: res.secure_url,
    };

    // const validated = updateAvatarSchema.safeParse(data);

    // if (!validated.success)
    //   return { status: 'error', error: validated.error.errors };

    // const { image } = validated.data;

    // const updatedAvatar = {
    //   image,
    // } as any;

    // if (user.image?.startsWith('http')) {
    //   const publicId = user.image.split('/').slice(-2).join('/').split('.')[0];
    //   await cloudinary.uploader.destroy(publicId, (err: any, res: any) => {});
    // }

    // let imgUploadPromises = [];
    // if (image && image instanceof File) {
    //   const imgBuffer = await image.arrayBuffer();
    //   const imgData = Buffer.from(new Uint8Array(imgBuffer));
    //   const imgBase64 = imgData.toString('base64');

    //   const res = await cloudinary.uploader.upload(
    //     `data:image/png;base64,${imgBase64}`,
    //     { folder: 'agenliga' }
    //   );

    //   imgUploadPromises.push(res.secure_url);
    //   const uploadedImages = await Promise.all(imgUploadPromises);
    //   updatedAvatar.image = uploadedImages;

    //   revalidatePath('/dashboard/members/profile');
    // }

    const avatar = await db.user.update({
      where: {
        id: user.id,
      },
      data: newAvatarImage,
    });

    // const avatar = db.user.update({
    //   where: { id: userId },
    //   data: {
    //     image: updatedAvatar.image[0],
    //   },
    // });
    revalidatePath('/dashboard/members/profile');
    return { status: 'success', data: avatar };
  } catch (err) {
    console.error(err);
    return { status: 'error', error: 'something went wrong', err };
  }
}
