'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { IconType } from 'react-icons';

import { BsPlusCircleDotted } from 'react-icons/bs';

import { cn } from '@/lib/utils';
import { FcUndo } from 'react-icons/fc';
import useModal from '@/hooks/use-modal';
import { DepoProps } from '@/types';
import { useUserRole } from '@/hooks/use-user-role';

type Status = {
  value: string;
  icon: IconType;
};

type DepoWdStatusActions = {
  statuses: Status[];
  name?: string;
  data: DepoProps;
};

export function DepoWdStatusActions({
  statuses,
  name,
  data,
}: DepoWdStatusActions) {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  );

  const role = useUserRole();
  const { modalType, onOpen } = useModal();

  const handleUnselect = () => {
    setSelectedStatus(null);
    setOpen(false);
  };
  const depoWdProcess = name === 'depo' ? 'depo-process' : 'wd-process';
  return (
    <div className='flex items-center space-x-4'>
      {role === 'admin' && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='ghost'
              className={cn(
                'm-0 p-0 mx-2 h-8 justify-start hover:shadow-lg hover:bg-indigo-50',
                selectedStatus && 'bg-slate-200 border-b-2 border-gray-400'
              )}
            >
              {selectedStatus ? (
                <span className='flex flex-row items-center text-base justify-start text-nowrap gap-2 hover:bg-violet-100'>
                  <selectedStatus.icon className='text-amber-600' />
                  <span
                    className={cn(
                      'text-base',
                      selectedStatus.value === 'gagal' ||
                        selectedStatus.value === 'error'
                        ? 'text-rose-600 font-bold'
                        : selectedStatus.value === 'in progress'
                        ? 'text-sky-600 font-bold'
                        : selectedStatus.value === 'success'
                        ? 'text-emerald-700 font-bold'
                        : 'text-orange-700 font-bold '
                    )}
                  >
                    {selectedStatus.value}
                  </span>
                </span>
              ) : (
                <span className='flex flex-row m-0 p-0  gap-2 items-center text-xs'>
                  {data.status === 'new' ? (
                    <span className='flex gap-2 m-0 p-0 text-xs font-bold text-stone-400  hover:text-black'>
                      <BsPlusCircleDotted /> process{' '}
                      {name === 'depo' ? 'depo?' : name === 'wd' ? 'wd?' : ''}
                    </span>
                  ) : (
                    <span>sudah di process</span>
                  )}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='p-0' side='right' align='start'>
            <Command>
              <CommandInput placeholder='Change status...' />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {statuses.map(({ value, icon: Icon }) => (
                    <CommandItem
                      key={value}
                      value={value}
                      className='flex flex-row gap-2 cursor-pointer'
                      onSelect={(clickedValue) => {
                        const matchedStatus =
                          statuses.find(
                            (status) => status.value === clickedValue
                          ) || null;
                        setSelectedStatus((prevSelectedStatus) =>
                          prevSelectedStatus?.value === clickedValue
                            ? null
                            : matchedStatus
                        );
                        const title =
                          name === 'depo' ? 'Process Depo' : 'Process WD';
                        onOpen(
                          depoWdProcess,
                          data.id,
                          title,
                          undefined,
                          clickedValue
                        );
                        setOpen(false);
                        handleUnselect();
                      }}
                    >
                      <Icon />
                      <span>{value}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
                {selectedStatus && (
                  <CommandGroup>
                    <CommandItem
                      onSelect={handleUnselect}
                      className='flex flex-row gap-2 cursor-pointer'
                    >
                      <FcUndo />
                      <span>Unselect</span>
                    </CommandItem>
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
