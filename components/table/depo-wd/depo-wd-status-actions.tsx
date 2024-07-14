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

type Status = {
  value: string;
  icon: IconType;
};

type DepoWdStatusActions = {
  statuses: Status[];
};

export function DepoWdStatusActions({ statuses }: DepoWdStatusActions) {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  );

  return (
    <div className='flex items-center space-x-4'>
      {/* <p className='text-sm text-muted-foreground'>Status</p> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='ghost'
            className={cn(
              'w-[150px] justify-start hover:shadow-lg hover:bg-indigo-50',
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
                  {' '}
                  {/* <pre>{JSON.stringify(selectedStatus, null, 2)}</pre> */}
                  {selectedStatus.value}
                </span>
              </span>
            ) : (
              <span className='flex flex-row gap-2 items-center text-xs'>
                <BsPlusCircleDotted /> Process
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
                    className={cn('flex flex-row gap-2 cursor-pointer')}
                    onSelect={(val) => {
                      setSelectedStatus(
                        statuses.find((priority) => priority.value === val) ||
                          null
                      );
                      setOpen(false);
                    }}
                  >
                    <Icon />
                    <span>{value}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
