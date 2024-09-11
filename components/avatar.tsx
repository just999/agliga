'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

type AvatarProps = {
  src: string | null | undefined;
  alt?: string;
  className?: string;
};

const Avatar = ({ src, alt, className }: AvatarProps) => {
  return (
    <Image
      src={src || '/images/cavatar.svg'}
      alt={alt ? alt : 'avatar'}
      height={30}
      width={30}
      className={cn('rounded-full', className)}
      priority
    />
  );
};

export default Avatar;
