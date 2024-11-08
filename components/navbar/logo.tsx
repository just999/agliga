'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CSSProperties } from 'react';

type LogoProps = {
  className: string;
  styles?: CSSProperties;
};

const Logo = ({ className, styles }: LogoProps) => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push('/')}
      src='/images/al.svg'
      alt='logo'
      height={40}
      width={80}
      sizes='(max-width: 60px) 5vw, 10vw'
      priority
      className={cn(
        'hidden object-cover w-32 h-auto md:block sm:block xs:block cursor-pointer  transition',
        className
      )}
      style={styles}
    />
  );
};

export default Logo;
