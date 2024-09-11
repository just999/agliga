'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import { cn } from '@/lib/utils';

import { DepoProps, ValueIconProps } from '@/types/types';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';

import { useEffect, useState } from 'react';
import { BsArrowDown } from 'react-icons/bs';
import { FcUndo } from 'react-icons/fc';

type DepoWdDropdownBankSelectProps = {
  banks?: ValueIconProps[] | any[];
  // name?: string;
  data?: DepoProps;
  value?: string;
  onChange: (clickedValue: string) => void;
  column?: string;
  className?: string;
};

const DepoWdDropdownBankSelect = ({
  banks,
  // name,
  data,
  value,
  onChange,
  column,
  className,
}: DepoWdDropdownBankSelectProps) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<ValueIconProps | null>(
    null
  );
  const handleUnselect = () => {
    setSelectedValue(null);
    setOpen(false);
    onChange(null || '');
  };
  // let selectedData;
  // if (column === 'bank') {
  //   selectedData = banks?.filter((bank) => bank.value === selectedValue?.value);
  // } else if (column === 'status') {
  //   selectedData = statuses?.filter(
  //     (status) => status.value === selectedValue?.value
  //   );
  // } else if (column === 'game') {
  //   selectedData = games.filter((game) => game.value === selectedValue?.value);
  // }

  const selectedData = banks?.filter(
    (bank) => bank.value === selectedValue?.value
  );
  return (
    <div className={cn('flex items-center space-x-2 h-6', className)}>
      {/* <p className='text-sm text-muted-foreground'>Bank</p> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            // onClick={() => console.log(selectedValue?.value)}
            variant='ghost'
            className={cn(
              'w-full h-6 justify-start text-xs p-0 m-0',
              column && selectedValue
                ? 'bg-rose-100 px-2 gap-2 shadow-xl border-y-2 border-solid border-sky-600 rounded-none'
                : 'bg-sky-100 px-2 gap-2'
              // ? 'bg-purple-100 gap-2 shadow-xl'
              // : 'bg-sky-100 px-2 gap-2 '
            )}
          >
            {selectedValue && column ? (
              <span>
                {selectedData?.map((v, i) => (
                  <div
                    key={i}
                    className='flex flex-row items-center gap-2 px-2'
                  >
                    <v.icon
                      size={18}
                      className={cn(
                        v.styles,
                        v.value === 'gagal' && 'text-pink-600',
                        v.value === 'in progress' && 'text-blue-700'
                      )}
                    />
                    <span
                      className={cn(
                        v.styles,
                        v.value === 'gagal' && 'text-pink-600',
                        v.value === 'in progress' && 'text-blue-700'
                      )}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </span>
            ) : (
              <span className='flex flex-row px-2 gap-2 items-center cursor-pointer '>
                <BsArrowDown />
                <span>pilih {column} </span>
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-0' align='start' style={{ zIndex: 9999 }}>
          <Command>
            <CommandInput
              placeholder={`pilih ${column}...`}
              className='text-xs h-8'
            />
            <CommandList className='overflow-y-auto max-h-[400px] bg-emerald-200'>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {banks?.map(({ value, icon: Icon }) => (
                  <CommandItem
                    key={value}
                    value={value}
                    className='flex flex-row gap-2 cursor-pointer'
                    onSelect={(clickedValue) => {
                      const matchedValue =
                        banks.find((bank) => bank.value === clickedValue) ||
                        null;
                      setSelectedValue((prev) =>
                        prev?.value === clickedValue ? null : matchedValue
                      );
                      setOpen(false);
                      onChange(clickedValue);
                    }}
                  >
                    <Icon />
                    <span className='text-xs font-bold '>{value}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              {selectedValue && (
                <CommandGroup>
                  <CommandItem
                    onSelect={handleUnselect}
                    className='flex flex-row gap-2 cursor-pointer'
                  >
                    <FcUndo />
                    <span>Reset</span>
                  </CommandItem>
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DepoWdDropdownBankSelect;
