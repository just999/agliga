'use client';

import { useSession } from 'next-auth/react';
import { PostProps } from '@/types/types';
import VerticalDropdown from '../ui/vertical-dropdown';
import { Slider } from '@prisma/client';

import { cn } from '@/lib/utils';

type EditDeletePostButtonProps = {
  item?: PostProps;
  img?: Slider;
  className?: string;
  className2?: string;
};

const EditDeletePostButton = ({
  item,
  img,
  className,
  className2,
}: EditDeletePostButtonProps) => {
  const { data, status } = useSession();
  const userRole = data?.user.curUser.role;

  return (
    <span
      className={cn(
        'flex flex-row w-full justify-between items-center mb-5',
        className
      )}
    >
      <h1 className='text-2xl font-bold '>{item?.title}</h1>
      {status === 'authenticated' && userRole === 'admin' && (
        <VerticalDropdown
          item={item}
          img={img}
          className2={className2}
          className={className}
        />
        // <div className='flex justify-center gap-4 items-center '>
        //   <Button
        //     variant='outline'
        //     size='sm'
        //     type='button'
        //     onClick={() => onOpen('delete', item.id)}
        //     className='text-neutral-400 hover:text-black hover:font-bold hover:bg-red-400/20 hover:shadow-lg bg-slate-100 '
        //   >
        //     <BsTrash />
        //   </Button>
        //   <Button
        //     onClick={() => onOpen('edit', item.id)}
        //     variant='outline'
        //     size='sm'
        //     type='button'
        //     className='text-neutral-400 hover:text-black hover:font-bold hover:bg-sky-400/20 hover:shadow-lg  bg-slate-100  '
        //   >
        //     <BsPen />
        //   </Button>
        // </div>
      )}
    </span>
  );
};

export default EditDeletePostButton;
