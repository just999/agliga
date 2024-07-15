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

type Status = {
  value: string;
  icon: IconType;
};

type DepoWdStatusActions = {
  statuses: Status[];
  name?: string;
};

export function DepoWdStatusActions({ statuses, name }: DepoWdStatusActions) {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  );

  const handleUnselect = () => {
    setSelectedStatus(null);
    setOpen(false);
  };
  return (
    <div className='flex items-center space-x-4'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='ghost'
            className={cn(
              'w-[150px] m-0 p-0 mx-2 h-8 justify-start hover:shadow-lg hover:bg-indigo-50',
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
                <Button
                  variant='ghost'
                  className='flex gap-2 m-0 p-0 text-xs font-bold text-stone-400  hover:text-black'
                >
                  <BsPlusCircleDotted /> process{' '}
                  {name === 'depo' ? 'depo?' : 'wd?'}
                </Button>
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

                      setOpen(false);
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
    </div>
  );
}
