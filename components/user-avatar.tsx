'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { cn, transformImageUrl } from '@/lib/utils';
import { User } from 'next-auth';

type UserAvatarProps = {
  user?: User;
  src: string | null | undefined;
  alt: string | null | undefined;
  className?: string;
  avatarClass?: string;
};

const UserAvatar = ({ src, alt, className, avatarClass }: UserAvatarProps) => {
  return (
    <Avatar className={cn('w-auto h-[50px] flex items-center', className)}>
      <AvatarImage
        src={transformImageUrl(src) || '/images/cavatar.svg'}
        className={cn('w-12 h-12 rounded-full object-cover', avatarClass)}
      />

      {alt && (
        <AvatarFallback className='w-12 h-12 rounded-full text-white bg-stone-200 dark:bg-stone-600 '>
          {alt.substring(0, 3)}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
