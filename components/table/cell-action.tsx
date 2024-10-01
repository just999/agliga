'use client';

import React from 'react';
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
import { FixtureProps } from '@/types/types';

type CellActionProps = {
  data: FixtureProps | any;
};

const CellAction = ({ data }: CellActionProps) => {
  // const onCopy = (id: string) => {
  //   navigator.clipboard.writeText(id);
  //   toast.success('Billboard Id copied to clipboard');
  // };

  const { modalType, onOpen, setGroup, isOpen, id, group } = useModal();
  const { data: session, status } = useSession();
  const role = session?.user.curUser.role;

  if (!data.week) {
    return;
  }

  const week = data.week;

  const period = data.name;
  const newPeriod = period.slice(0, 2) + period.slice(3);
  const newDeleteModalType = `delete-epl${newPeriod}`;
  const newEditModalType = `edit-epl${newPeriod}`;

  const handleEditFixture = () => {
    const id = data.id;

    if (data?.group) {
      onOpen('edit-euro');
      setGroup('edit-euro', isOpen === false, data.group);
    } else if (data.round) {
      onOpen('edit-euro', id);
      setGroup('edit-euro', isOpen === false, data.round);
    } else if (
      week &&
      (newEditModalType === 'edit-epl2122' ||
        newEditModalType === 'edit-epl2223' ||
        newEditModalType === 'edit-epl2324' ||
        newEditModalType === 'edit-epl2425')
    ) {
      onOpen(newEditModalType, id);
      setGroup(newEditModalType, isOpen === false, week.toString(), data.name);
    }
  };
  const title = `${newDeleteModalType}`;

  return (
    <DropdownMenu>
      {role === 'admin' && data.id && (
        <>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-4 w-4 p-0'>
              <span className='sr-only '>Open Menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='backdrop-blur-sm bg-white/20'>
            {/* <DropdownMenuLabel className='text-xs '></DropdownMenuLabel> */}
            {/* <DropdownMenuItem
          onClick={() => onCopy(data.id)}
          className='text-[10px] cursor-pointer '
        >
          <Copy className='mr-4 h-4 w-4 ' />
          Copy Id
        </DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={() => handleEditFixture()}
              className='text-xs text-slate-500 hover:text-black cursor-pointer hover:bg-emerald-100 '>
              <Edit className='mr-4 h-4 w-4' />
              Update
            </DropdownMenuItem>
            {(newDeleteModalType === 'delete-epl2122' ||
              newDeleteModalType === 'delete-epl2223' ||
              newDeleteModalType === 'delete-epl2324' ||
              newDeleteModalType === 'delete-epl2425' ||
              newDeleteModalType === 'delete-fixture') && (
              <DropdownMenuItem
                onClick={() => {
                  onOpen(newDeleteModalType, data.id, title);
                  setGroup(newDeleteModalType, isOpen === false, week, period);
                }}
                className='text-xs text-slate-500 hover:text-black hover:bg-emerald-100 cursor-pointer '>
                <Trash className='mr-4 h-4 w-4 ' />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </>
      )}
    </DropdownMenu>
  );
};

export default CellAction;
