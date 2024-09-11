'use server';

import { db } from '@/lib/db';
import { getAuthAdminId, getAuthUserId, getUserRole } from './auth-actions';
import { Depo, Photo } from '@prisma/client';

import {
  memberDepositStatusSchema,
  MemberDepositStatusSchema,
} from '@/schemas';
import { ActionResult } from '@/types';
import { cache } from 'react';
import cloudinary from '@/lib/cloudinary';

export async function getUnapprovedPhotos() {
  try {
    const role = await getUserRole();

    if (role !== 'admin') throw new Error('Not Authorized');

    return db.photo.findMany({
      where: {
        isApproved: false,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function approvePhoto(photoId: string) {
  try {
    const role = await getUserRole();
    if (role !== 'admin') throw new Error('Unauthorized');

    const photo = await db.photo.findUnique({
      where: { id: photoId },
      include: { user: true },
    });

    if (!photo || !photo.user) throw new Error('Can not approve this image');
    const { user } = photo;

    const userUpdate = user && user.image === null ? { image: photo.url } : {};

    // const userUpdate = user.image === null ? { image: photo.url } : {};

    if (Object.keys(userUpdate).length > 0) {
      await db.user.update({
        where: { id: user.id },
        data: userUpdate,
      });
    }

    return db.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...userUpdate,
        photos: {
          update: {
            where: { id: photo.id },
            data: {
              isApproved: true,
            },
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function rejectPhoto(photo: Photo) {
  try {
    const role = await getUserRole();
    if (role !== 'admin') throw new Error('Unauthorized');

    if (photo.publicId) {
      await cloudinary.uploader.destroy(photo.publicId);
    }

    return db.photo.delete({
      where: { id: photo.id },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getAdmins({
  pageNumber = '1',
  pageSize = '3',
  orderBy = 'updated',
  withPhoto = 'true',
}) {
  try {
    const userId = await getAuthUserId();

    const count = await db.user.count({
      where: {
        role: 'admin',
        NOT: {
          id: userId,
        },
      },
    });

    const admins = await db.user.findMany({
      where: {
        role: 'admin',
        NOT: {
          id: userId,
        },
      },
    });

    if (!admins) throw new Error('no admin found');

    return { items: admins, totalCount: count };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function approveMemberDeposit(
  data: MemberDepositStatusSchema,
  targetDepoId: string
): Promise<ActionResult<Depo>> {
  try {
    const adminId = await getAuthAdminId();
    if (!adminId) throw new Error('unauthorized!');
    const validated = memberDepositStatusSchema.safeParse(data);
    if (!validated.success)
      return { status: 'error', error: validated.error.errors };

    const { status } = validated.data;

    if (status) return { status: 'error', error: 'status has been modified!' };

    const depo = await db.depo.update({
      where: {
        id: targetDepoId,
      },
      data: { status },
    });

    return { status: 'success', data: depo };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const getAllAdmins = cache(async () => {
  try {
    const userId = await getAuthUserId();
    return db.user.findMany({
      where: {
        role: 'admin',
        NOT: {
          id: userId,
        },
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
});
