'use client';

import { BsTrash, BsPen } from 'react-icons/bs';
import { Button } from '../ui/button';
import useModal from '@/hooks/use-modal';
import { useSession } from 'next-auth/react';
import { PostProps } from '@/types';
import VerticalDropdown from '../ui/vertical-dropdown';

type EditDeletePostButtonProps = {
  item: PostProps;
};

const EditDeletePostButton = ({ item }: EditDeletePostButtonProps) => {
  const { data, status } = useSession();
  const userRole = data?.user.role;
  return (
    <span className='flex flex-row w-full justify-between items-center mb-5 '>
      <h1 className='text-2xl font-bold '>{item.title}</h1>
      {status === 'authenticated' && userRole === 'admin' && (
        <VerticalDropdown item={item} />
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
