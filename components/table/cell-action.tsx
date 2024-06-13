'use client';

import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
// import { ScheduleColumn } from './columns';
import toast from 'react-hot-toast';
import { Schedule } from '@prisma/client';
import useModal from '@/hooks/use-modal';
import { useSession } from 'next-auth/react';

type CellActionProps = {
  data: Schedule;
};

const CellAction = ({ data }: CellActionProps) => {
  // const onCopy = (id: string) => {
  //   navigator.clipboard.writeText(id);
  //   toast.success('Billboard Id copied to clipboard');
  // };

  const { onOpen } = useModal();

  const title = 'Delete Schedule';

  const { data: session, status } = useSession();
  const role = session?.user.curUser.role;
  return (
    <DropdownMenu>
      {role === 'admin' && (
        <>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-4 w-4 p-0 '>
              <span className='sr-only '>Open Menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel className='text-[10px] '></DropdownMenuLabel>
            {/* <DropdownMenuItem
          onClick={() => onCopy(data.id)}
          className='text-[10px] cursor-pointer '
        >
          <Copy className='mr-4 h-4 w-4 ' />
          Copy Id
        </DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={() => onOpen('editSoccer', data.id)}
              className='text-xs text-slate-500 hover:text-black cursor-pointer '
            >
              <Edit className='mr-4 h-4 w-4 ' />
              Update
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpen('deleteSchedule', data.id, title)}
              className='text-xs text-slate-500 hover:text-black cursor-pointer '
            >
              <Trash className='mr-4 h-4 w-4 ' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </>
      )}
    </DropdownMenu>
  );
};

export default CellAction;
