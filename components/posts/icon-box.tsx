'use client';

import { cn } from '@/lib/utils';
import { IconType } from 'react-icons';

type IconBoxProps = {
  icon: IconType | string;
  size?: number | string | undefined;
  className?: string;
  color: string;
};

const IconBox = ({ icon: Icon, size, className, color }: IconBoxProps) => {
  return (
    <Icon
      size={size}
      className={cn(
        `text-[${color}]  grayscale hover:grayscale-0 transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-150 hover:bg-slate-100 duration-300`,
        className
      )}
      style={{ color }}
    />
  );
};

export default IconBox;
