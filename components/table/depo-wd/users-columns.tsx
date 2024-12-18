'use client';

import { Button } from '@/components/shadcn/ui/button';
import ToggleUserActiveButton from '@/components/shadcn/ui/toggle-user-active-button';
import { banks, games, statuses } from '@/lib/helper';
import { cn, noto, numberWithCommas } from '@/lib/utils';
import { Depo, DepoWdProps, WdProps } from '@/types/types';
import { User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { FaUserCheck, FaUserSlash } from 'react-icons/fa';
import Select, { StylesConfig } from 'react-select';

const customStyles: StylesConfig = {
  control: (provided: Record<string, unknown>, state: any) => ({
    ...provided,
    cursor: 'pointer',
    height: 24,
    border: state.isFocused ? '1px solid #ff8b67' : 'none',
    // border: state.isFocused ? '1px solid #ff8b67' : '1px solid #cccccc',
    boxShadow: state.isFocused ? '0px 0px 6px #ff8b67' : 'none',
    // "&": {
    //   border: "1px solid #cccccc",
    //   boxShadow: "none"
    // },
    '&:hover': {
      border: '1px solid #ff8b67',
      boxShadow: '0px 0px 6px #ff8b67',
    },
    // "&:focus": {
    //   border: "1px solid #ff8b67",
    //   boxShadow: "0px 0px 6px #ff8b67"
    // },
    // "&:active": {
    //   border: "1px solid #ff8b67",
    //   boxShadow: "0px 0px 6px #ff8b67"
    // }
  }),
};

export const usersColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'index',
    header: 'No.',
    cell: ({ row }) => (
      <div className='flex flex-row justify-start px-4'>
        <span className={cn('tracking-tighter', noto.className)}>
          {row.index + 1}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Tanggal',
    cell: ({ row }) => (
      <div className='flex flex-row justify-start px-4 gap-2'>
        <span className='font-bold text-slate-400 text-[10px] text-nowrap'>
          {row.original.createdAt?.toLocaleString()}
          {/* <pre>{JSON.stringify(row, null, 3)}</pre> */}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className='flex flex-row px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>
          {row.original.email}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className='flex flex-row px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs text-nowrap'>
          {/* <pre>{JSON.stringify(row, null, 3)}</pre> */}
          {row.original.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'bank',
    header: 'Bank',
    cell: ({ row }) => (
      <div className='px-4'>
        <span className='flex flex-row items-center gap-2 font-bold text-slate-400 text-xs'>
          {banks
            .filter((bank) => bank.value === row.original.bank)
            .map((b) => (
              <div key={b.value}>
                <b.icon className='w-5 h-5' />
              </div>
            ))}
          <span className='text-[10px]'>{row.original.bank}</span>
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'accountNumber',
    header: 'No. rekening',
    cell: ({ row }) => (
      <div className='flex flex-row text-nowrap px-4 gap-2 text-xs'>
        {row.original.accountNumber}
      </div>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'phone no',
    cell: ({ row }) => (
      <div className='flex flex-row justify-between px-4 text-xs gap-2'>
        {
          <span className='text-emerald-700 font-bold text-nowrap'>
            {row.original.phone}
          </span>
        }
      </div>
    ),
  },
  {
    accessorKey: 'game',
    header: 'Game',
    enableColumnFilter: false,
    cell: ({ row }) => {
      const options: any = games.filter((game) =>
        row.original.game.includes(game.value)
      );
      return (
        <Select
          value={options[0]}
          name='game'
          options={options}
          formatOptionLabel={({ value, icon: Icon }: any) => (
            <div className='flex flex-row gap-1 items-center justify-start text-xs w-full'>
              <span className='w-4 h-4 '>
                <Icon className='w-4' />
              </span>
              {value}
            </div>
          )}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          styles={customStyles}
        />
      );

      // <div className='flex flex-row px-4 gap-2'>
      //   <span className='flex gap-4 font-bold text-slate-400 text-xs'>
      //     {/* <pre>{JSON.stringify(row, null, 3)}</pre> */}

      //     {games
      //       .filter((game) => row.original.game?.includes(game.value))
      //       .map( <option key={i} className='flex flex-row items-center'>
      //       <Icon className='w-3 h-auto ' /> <span>{value}</span>
      //     </option> => (
      //         <>
      //           <option key={i} className='flex flex-row items-center'>
      //             <Icon className='w-3 h-auto ' /> <span>{value}</span>
      //           </option>
      //         </>
      //       ))}
      //   </span>
      // </div>;
      // <>
      //   {/* <pre>{JSON.stringify(row, null, 3)}</pre> */}
      //   <select>
      //     {row.original.game.map((g) => (
      //       <option value=''>{g}</option>
      //     ))}
      //   </select>
      // </>
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <div className='flex flex-row px-4 gap-2'>
        <span className='font-bold text-slate-400 text-xs'>
          {row.original.role}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'active',
    cell: ({ row }) => (
      <div
        className={cn(
          'flex flex-row gap-2 hover:opacity-80 transition'
          // row.original.active ? 'bg-emerald-200' : 'bg-rose-200'
        )}
      >
        <span>
          {row.original.active ? (
            <div className='flex flex-row gap-2  text-shadow'>
              <FaUserCheck
                size={20}
                className='fill-green-600  -top-[2px] -right-[2px] '
              />
              <span className='text-emerald-700 font-bold'>active</span>
            </div>
          ) : (
            <div className='flex flex-row gap-2 text-nowrap  text-shadow'>
              <FaUserSlash
                size={20}
                className={
                  row.original.active ? 'fill-green-500' : 'fill-rose-500/80'
                }
              />
              <span className='text-red-600 text-nowrap font-bold'>
                Not-Active
              </span>
            </div>
          )}
        </span>
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <ToggleUserActiveButton
        size={20}
        userId={row.original.id}
        data={row.original}
        className='flex px-2'
      />
    ),
  },
];
