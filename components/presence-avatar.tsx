'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/ui';
import { cn } from '@/lib/utils';
import { userData } from '@/store/use-active-user-store';
import { usePresenceStore } from '@/store/use-presence-store';
import { SafeAdminChat } from '@/types/types';
import { AnonymousUser, User } from '@prisma/client';

import UserAvatar from './user-avatar';

type PresenceAvatarProps = {
  user?: User | SafeAdminChat;
  userId?: string;
  src?: string | null;
  className?: string;
  dotClassName?: string;
  avatarClass?: string;
  anonymousUser?: User;
};

const PresenceAvatar = ({
  user,
  userId,
  src,
  className,
  anonymousUser,
  dotClassName,
  avatarClass,
}: PresenceAvatarProps) => {
  const { usersId } = usePresenceStore((state) => ({
    usersId: state.usersId,
  }));
  const isOnline = userId && usersId.indexOf(userId) !== -1;

  return (
    <div className='relative inline-block'>
      {/* <Avatar
        src={src || '/img/user.svg'}
        alt='User avatar'
        className={cn('h-8 w-8 object-cover rounded-full shadow-xl', className)}
      /> */}
      {/* <Avatar className='w-auto h-10 flex items-center'>
        {src && (
          <AvatarImage
            src={src || '/img/user.svg'}
            className={cn(
              'h-8 w-8 object-cover rounded-full shadow-xl',
              className
            )}
          />
        )}
        <AvatarFallback className='bg-pink-300 dark:bg-pink-800'>
          {user?.name?.substring(0, 3)}
        </AvatarFallback>
      </Avatar> */}

      <UserAvatar
        user={user}
        src={src}
        alt={user?.name}
        avatarClass={cn('w-8 h-8', avatarClass)}
        className={className}
      />

      <span
        className={cn(
          'absolute bottom-1 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-sky-600',
          !isOnline && 'hidden',
          dotClassName
        )}
      />
    </div>
  );
};

export default PresenceAvatar;
