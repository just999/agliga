'use server';

import { ActionResult, MessageDto } from '@/types';

import { getAuthUserId } from './auth-actions';
import { db } from '@/lib/db';
import { pusherServer } from '@/lib/pusher';
import { createChatId } from '@/lib/utils';
import { mapMessageToMessageDto } from '@/lib/mappings';
import { revalidateTag, revalidatePath } from 'next/cache';
import { messageSchema, MessageSchema } from '@/schemas';

// import { cache } from 'react';

export async function createMessage(
  recipientUserId: string,
  data: MessageSchema
): Promise<ActionResult<MessageDto>> {
  try {
    const userId = await getAuthUserId();

    // if (!userId) return { status: 'error', error: 'no user id' };

    const validated = messageSchema.safeParse(data);
    if (!validated.success)
      return { status: 'error', error: validated.error.errors };
    const { text } = validated.data;

    const message = await db.message.create({
      data: {
        text,
        recipientId: recipientUserId,
        senderId: userId,
      },
      select: messageSelect,
    });

    const messageDto = mapMessageToMessageDto(message);

    await pusherServer.trigger(
      createChatId(userId, recipientUserId),
      'message:new',
      messageDto
    );
    await pusherServer.trigger(
      `private-${recipientUserId}`,
      'message:new',
      messageDto
    );

    return { status: 'success', data: messageDto };
  } catch (err) {
    console.log(err);
    return { status: 'error', error: 'Something went wrong' };
  }
}

export async function getMessageThread(recipientId: string) {
  try {
    const userId = await getAuthUserId();
    if (userId === recipientId) return;
    const messages = await db.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId,
            senderDeleted: false,
          },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: {
        created: 'asc',
      },
      select: messageSelect,
    });

    let readCount = 0;

    if (messages.length > 0) {
      const readMessageIds = messages
        .filter(
          (m) =>
            m.dateRead === null &&
            m.recipient?.id === userId &&
            m.sender?.id === recipientId
        )
        .map((m) => m.id);
      await db.message.updateMany({
        where: {
          id: { in: readMessageIds },
        },
        data: { dateRead: new Date() },
      });

      readCount = readMessageIds.length;

      await pusherServer.trigger(
        createChatId(recipientId, userId),
        'messages:read',
        readMessageIds
      );
    }

    const messagesToReturn = messages.map((message) =>
      mapMessageToMessageDto(message)
    );

    return { messages: messagesToReturn, readCount };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getMessagesByContainer(
  container?: string | null,
  cursor?: string,
  limit = 100
) {
  try {
    const userId = await getAuthUserId();

    const conditions = {
      [container === 'outbox' ? 'senderId' : 'recipientId']: userId,
      ...(container === 'outbox'
        ? { senderDeleted: false }
        : { recipientDeleted: false }),
    };

    const messages = await db.message.findMany({
      where: {
        ...conditions,
        ...(cursor ? { created: { lte: new Date(cursor) } } : {}),
      },
      orderBy: {
        created: 'desc',
      },
      select: messageSelect,
      take: limit + 1,
    });
    let nextCursor: string | undefined;

    if (messages.length > limit) {
      const nextItem = messages.pop();
      nextCursor = nextItem?.created.toISOString();
    } else {
      nextCursor = undefined;
    }

    const messagesToReturn = messages.map((message) =>
      mapMessageToMessageDto(message)
    );

    return { messages: messagesToReturn, nextCursor };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function deleteMessage(messageId: string, isOutBox: boolean) {
  const selector = isOutBox ? 'senderDeleted' : 'recipientDeleted';

  try {
    const userId = await getAuthUserId();

    if (!messageId) return { status: 'error', error: 'no message id found' };

    await db.message.update({
      where: {
        id: messageId,
      },
      data: {
        [selector]: true,
      },
    });

    const messagesToDelete = await db.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
          {
            recipientId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
        ],
      },
    });

    if (messagesToDelete.length > 0) {
      const deletedMessages = await db.message.deleteMany({
        where: {
          OR: messagesToDelete.map((m) => ({ id: m.id })),
        },
      });
      return { status: 'success', data: deletedMessages };
    }
    // return NextResponse.json(
    //   { message: 'successfully deleted message' },
    //   { status: 200 }
    // );
    // revalidatePath('/dashboard/admin/messages', 'page');
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getUnreadMessageCount() {
  try {
    const userId = await getAuthUserId();

    // Fetch all messages for this user
    const res = await db.message.findMany({
      where: {
        recipientId: userId,
        recipientDeleted: false,
      },
    });

    // Filter messages that are unread and not deleted
    const unreadMessageCount = res.filter(
      (message) => message.dateRead === null && !message.recipientDeleted
    ).length;

    return unreadMessageCount;
  } catch (err) {
    console.error('Error fetching unread message count:', err);
    throw err;
  }
}

// export async function getUnreadMessageCount() {
//   try {
//     const userId = await getAuthUserId();

//     if (!userId) {
//       console.error('User ID is undefined or null');
//       return 0; // Handle the case where there's no valid user ID
//     }

//     console.log('Fetching unread message count for user:', userId);

//     const unreadMessageCount = await db.message.count({
//       where: {
//         recipientId: userId,
//         dateRead: undefined,
//         recipientDeleted: false,
//       },
//     });

//     console.log('Unread message count:', unreadMessageCount);

//     return unreadMessageCount;
//   } catch (err) {
//     console.error('Error fetching unread message count:', err);
//     throw err;
//   }
// }

export async function getCountUnreadMessages() {
  try {
    const userId = await getAuthUserId();
    return db.message.count({
      where: {
        recipientId: userId,
        dateRead: null,
        recipientDeleted: false,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const getMessages = async () => {
  try {
    const messages = await db.message.findMany({
      orderBy: {
        created: 'asc',
      },
    });
    return messages;
  } catch (err) {
    console.error('Error fetching messages', err);
    throw err;
  }
};
export const getUnreadMessagesBySenderId = async (senderId: string) => {
  try {
    const mess = await db.message.findMany({
      where: {
        senderId,
      },
    });
    if (!mess) return { status: 'error', error: 'no message found!' };
    const unreadMess = mess.filter(
      (m) => m.dateRead === null && m.recipientDeleted === false
    );
    const unreadMessCount = mess.filter(
      (m) => m.dateRead === null && m.recipientDeleted === false
    ).length;

    return { senderId, unreadMess, unreadMessCount };
  } catch (err) {
    console.error('Error fetching messages', err);
    throw err;
  }
};

const messageSelect = {
  id: true,
  text: true,
  created: true,
  dateRead: true,
  senderId: true,
  recipientId: true,
  recipientDeleted: true,
  sender: {
    select: {
      id: true,
      name: true,
      image: true,
    },
  },
  recipient: {
    select: {
      id: true,
      name: true,
      image: true,
    },
  },
};
