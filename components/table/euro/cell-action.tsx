'use client';

import { group } from 'console';

import { Button } from '@/components/shadcn/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu';
import useModal from '@/hooks/use-modal';
import { FixtureProps } from '@/types/types';
import { Schedule } from '@prisma/client';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
// import { ScheduleColumn } from './columns';
import toast from 'react-hot-toast';

type RoundCellActionProps = {
  data: any;
};

const CellAction = ({ data }: RoundCellActionProps) => {
  const { modalType, onOpen, setGroup, isOpen } = useModal();
  const { data: session, status } = useSession();
  const role = session?.user.curUser.role;

  const round = data?.round;
  const id = data.id;

  const handleEditEuro = () => {
    const group = undefined;
    if (data?.round) {
      onOpen('edit-euro', id);
      setGroup('edit-euro', isOpen === false, group, round);
    } else if (round) {
      onOpen('edit-euro', id);
      setGroup('edit-euro', isOpen === false, group, round);
    }
  };
  const title = `delete round-16`;

  return (
    <DropdownMenu>
      {role === 'admin' && id && (
        <>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-4 w-4 p-0 cursor-pointer'>
              <span className='sr-only '>Open Menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='backdrop-blur-sm bg-white/20'
          >
            {/* <DropdownMenuLabel className='text-xs '></DropdownMenuLabel> */}
            <DropdownMenuItem
              onClick={() => handleEditEuro()}
              className='text-xs text-slate-500 hover:text-black cursor-pointer hover:bg-emerald-100 '
            >
              <Edit className='mr-4 h-4 w-4' />
              Update
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onOpen('delete-euro', id, title)}
              className='text-xs text-slate-500 hover:text-black hover:bg-emerald-100 cursor-pointer '
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
