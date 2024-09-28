'use client';

import { PostProps } from '@/types/types';
import { Slider } from '@prisma/client';
import { useSession } from 'next-auth/react';
import DropdownVertical from './dropdown-vertical';
import { cn } from '@/lib/utils';
import VerticalDropdown from './vertical-dropdown';

type EditDeleteButtonProps = {
  item?: PostProps;
  img?: Slider;
  className?: string;
  className2?: string;
};

const EditDeleteButton = ({
  item,
  img,
  className,
  className2,
}: EditDeleteButtonProps) => {
  const { data: session, status } = useSession();
  const userRole = session?.user.role;

  return (
    <span
      className={cn(
        'flex flex-row w-full justify-between items-center mb-5',
        className
      )}>
      <h1 className='text-2xl font-bold '>{item?.title}</h1>
      {status === 'authenticated' && userRole === 'admin' && (
        <DropdownVertical
          item={item}
          img={img}
          className2={className2}
          className={className}
        />
      )}
    </span>
  );
};

export default EditDeleteButton;
