'use client';

import { usePresenceStore } from '@/store/use-presence-store';
import { GoDot, GoDotFill } from 'react-icons/go';
import { User } from '@prisma/client';
import { cn } from '@/lib/utils';

type PresenceDotProps = {
  user: User | null;
  className?: string;
  sizeGoDot?: number;
  sizeGoDotFill?: number;
};

const PresenceDot = ({
  user,
  className,
  sizeGoDot,
  sizeGoDotFill,
}: PresenceDotProps) => {
  const { usersId } = usePresenceStore((state) => ({
    usersId: state.usersId,
  }));

  const isOnline = user && usersId.indexOf(user.id) !== -1;

  if (!isOnline) return null;

  return (
    <span className={cn(className)}>
      <GoDot
        size={sizeGoDot || 36}
        className='fill-emerald-500 absolute top-[2px] right-[2px]'
      />
      <GoDotFill
        size={sizeGoDotFill || 32}
        className='fill-emerald-600 animate-ping '
      />
    </span>
  );
};

export default PresenceDot;
