'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { InputCustom } from './inputCustom';
import { Button } from './button';
import { useEffect, useState } from 'react';

import useRunToggleStore from '@/store/use-table-store';
import RunTable from './run-table';
import { cn } from '@/lib/utils';

import useModal from '@/hooks/use-modal';

import {
  BsArrowDownSquare,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
} from 'react-icons/bs';
import EuroCard from '../table/euro/euro-card';
// import { useGetEuros } from '@/hooks/use-get-schedule';

// import { Skeleton } from './skeleton';
import { Euro24 } from '../assets/games/euro24';
// import { EuroWithIconProps } from '@/types';

import { useSession } from 'next-auth/react';

import { FcParallelTasks } from 'react-icons/fc';
import FixtureTable from '../table/euro/fixture/fixture-table';
import Heading from './heading';
import { EuroWithIconProps, FixtureProps } from '@/types';
import { EPL } from '../assets/sports';
import { Badge } from './badge';
import { EPLPeriod } from '@/lib/helper';
import Periods from '../soccer/periods';
import { useSearchParams } from 'next/navigation';
import { TbNewSection } from 'react-icons/tb';
import { GrEdit } from 'react-icons/gr';
import useFixturesStore from '@/store/use-fixture-store';

type GroupArrayProps = {
  date: string;
  games: EuroWithIconProps[];
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  eu?: FixtureProps[] | any[];
  searchKey?: string;
  className?: string;
  group?: any;
  mergedData?: any;
  footerClassName?: string;
  euroClassName?: string;
  euroTableClassName?: string;
  euCardClassName?: string;
  tableCellClassName?: string;
  trashClassName?: string;
  groupArrays?: GroupArrayProps[];
  period?: string;
}

export function DataTable<TData, TValue>({
  columns,
  eu,
  className,
  group,
  footerClassName,
  euroClassName,
  euroTableClassName,
  euCardClassName,
  tableCellClassName,
  trashClassName,
  groupArrays,
  period,
}: // mergedData,
DataTableProps<TData, TValue>) {
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState('');
  const [isToggle, setIsToggle] = useState(false);
  const [isToggleFixture, setIsToggleFixture] = useState(false);

  // const { items } = useGetEuros();

  const { data: session } = useSession();

  const role = session?.user.curUser.role;
  const table = useReactTable({
    data: eu as TData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // state: {
    //   columnFilters,
    // },
    state: {
      globalFilter: filtering,
      sorting,
    },
    onGlobalFilterChange: setFiltering,
  });

  const {
    items,
    item,
    isLoading,
    error,
    setItem,
    setItems,
    setError,
    setIsLoading,
  } = useFixturesStore();
  const { toggle, setIsOpen } = useRunToggleStore();
  const { modalType, onOpen, setGroup, isOpen } = useModal();

  const handleOpenGroup = (group?: string) => {
    if (group) {
      onOpen('new-euro');
      setGroup('new-euro', isOpen === false, group);
    }
  };

  // if (!items || items.length === 0) return <Skeleton />;

  const handleNewFixture = () => {
    onOpen('new-fixture');
    setGroup('new-fixture', isOpen === false, period);
  };

  // const handleEditFixture = () => {
  //   onOpen('edit-fixture');
  //   setGroup('edit-euro', isOpen === false, period, period);
  // };

  const year1 = period?.slice(0, 2);
  const year2 = period?.slice(3, 5);
  return (
    <div className='rounded-xl mx-auto w-3/4'>
      <div
        className={cn(
          'flex flex-row items-center py-2 bg-orange-50/60 border border-solid border-orange-100 rounded-lg',
          className
        )}
      >
        <InputCustom
          placeholder='Search...'
          value={filtering}
          // value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
          onChange={(event) => setFiltering(event.target.value)}
          className='max-w-sm text-stone-700 mx-2 bg-zinc-50'
        />
        {period && (
          <div className='w-full flex flex-row justify-around'>
            <Heading
              title={`English Premier League ${period}`}
              className=' text-zinc-500  text-lg nowrap 2xs:text-[8px] xs:text-xs sm:text-sm 2xl:text-xl '
            />
            <div className='flex flex-row justify-end gap-4 w-1/2 '>
              <div className='break-keep'>
                <Button
                  className='w-6 h-6'
                  variant='outline'
                  size='sm'
                  type='button'
                  onClick={() => handleNewFixture()}
                >
                  <TbNewSection />
                </Button>
              </div>
              {/* <div>
                  <Button
                    className='w-6 h-6'
                    variant='outline'
                    size='sm'
                    type='button'
                    onClick={() => handleEditFixture()}
                  >
                    <GrEdit />
                  </Button>
                </div> */}
            </div>
          </div>
        )}
      </div>

      <div className='flex flex-row gap-8'>
        <div>
          <RunTable
            toggle={() => toggle}
            setIsOpen={() => setIsOpen}
            className={cn(className)}
          />
          <div>
            <div className='rounded-md shadow-xl'>
              <Table className='bg-amber-50 border-none '>
                <TableHeader className='bg-amber-50 '>
                  <TableRow
                    className={cn(
                      'rounded-full h-8 border-none',
                      euroTableClassName
                    )}
                  >
                    <TableHead className='flex flex-row font-semibold justify-center ml-2 bg-emerald-300 rounded-l-lg  h-8 hover:bg-green-300 hover:font-semibold hover:text-gray-800 shadow-xl text-md text-gray-400 cursor-pointer'>
                      <Euro24 />
                      <Button
                        variant='ghost'
                        size='sm'
                        className={cn(
                          'p-0 h-7',
                          role !== 'admin'
                            ? 'text-black font-semibold bg-emerald-300'
                            : 'hover:font-semibold hover:text-gray-800 hover:bg-green-300'
                        )}
                        onClick={() => handleOpenGroup(group)}
                        disabled={role === 'admin' ? false : true}
                      >
                        Group {group}
                      </Button>
                    </TableHead>

                    <TableHead className='bg-amber-100 rounded-r-lg px-4 font-semibold h-8 hover:bg-orange-100/70 hover:text-gray-800 hover:font-bold shadow-xl cursor-pointer text-md text-gray-400 '>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='px-0 h-7'
                        onClick={() => {
                          if (group) {
                            setGroup('new-euro', isOpen === true, group);
                          }

                          setIsToggle((prev) => !prev);
                        }}
                      >
                        {/* <pre>{JSON.stringify(euroGroup, null, 2)}</pre> */}
                        <BsArrowDownSquare size={18} className='mx-auto ' />
                      </Button>
                    </TableHead>
                    <TableHead className='bg-amber-100 rounded-r-lg px-4 font-semibold h-8 hover:bg-orange-100/70 hover:text-gray-800 hover:font-bold shadow-xl cursor-pointer text-md text-gray-400 '>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='px-0 h-7'
                        onClick={() => {
                          if (group) {
                            setGroup('new-euro', isOpen === true, group);
                          }

                          setIsToggleFixture((prev) => !prev);
                        }}
                      >
                        {/* <pre>{JSON.stringify(euroGroup, null, 2)}</pre> */}
                        <FcParallelTasks size={18} className='mx-auto ' />
                      </Button>
                    </TableHead>
                  </TableRow>

                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            key={header.id}
                            className=' text-xs text-stone-500 h-8 p-0  text-center px-2 bg-stone-100'
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                        className='h-8 bg-amber-50 even:bg-orange-50 odd:bg-amber-200/30'
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className={cn(
                              'p-0 text-center lg:text-sm even:bg-indigo-50/40',
                              tableCellClassName
                            )}
                            style={{ height: '18px' }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                            {/* <pre className='flex flex-col '>
                        {JSON.stringify(cell, null, 2)}
                      </pre> */}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className='h-12 text-center'
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {isToggle && (
                <div className='flex flex-col mx-auto gap-0 py-2 rounded-lg justify-center'>
                  {groupArrays?.map((item: any) => (
                    <EuroCard
                      key={item.games[0].id}
                      eu={item}
                      className='bg-sky-100 mt-2'
                      groupClassName='w-full text-center  py-1 '
                      footerClassName={footerClassName}
                      euroClassName={euroClassName}
                      euCardClassName={euCardClassName}
                      trashClassName={trashClassName}
                    />
                  ))}

                  {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
                </div>
              )}
              {isToggleFixture && (
                <div className='flex flex-col mx-auto gap-0 py-2 rounded-lg justify-center'>
                  <FixtureTable />

                  {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
                </div>
              )}
            </div>
            <div
              className={cn(
                'flex items-center justify-end space-x-2 py-4 pr-4',
                className
              )}
            >
              <Button
                variant='ghost'
                size='sm'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className={cn(
                  'w-1/6 bg-amber-100 mx-6 text-stone-900 hover:bg-amber-200 hover:text-black hover:font-semibold hover:drop-shadow-xl shadow-lg text-xs',
                  !table.getCanNextPage() && 'text-zinc-600'
                )}
              >
                <BsChevronDoubleLeft /> Prev
              </Button>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className={cn(
                  'w-1/6 bg-amber-100 mx-6 text-stone-900 hover:bg-amber-200 hover:text-black hover:font-semibold hover:drop-shadow-xl shadow-lg text-xs',
                  !table.getCanPreviousPage() && 'text-zinc-600'
                )}
              >
                Next
                <BsChevronDoubleRight />
              </Button>
            </div>
          </div>
        </div>
        <div className={cn(' rounded-lg mt-2', className)}>
          <div className=' w-full border rounded-lg mx-auto pb-2'>
            <EPL />
            {/* {EPLPeriod.map((per) => (
              <Badge
                variant='outline'
                className='cursor-pointer py-1 px-4 hover:bg-stone-100 hover:shadow-xl '
              >
                <per.icon className='w-4 h-4' />{' '}
                <span className='pl-2 '> {per.value}</span>
              </Badge>
            ))} */}
            <div className='px-4 text-center w-full text-md font-bold py-2 mb-4  text-[#340239] bg-purple-50 shadow-md'>
              20{year1} - 20{year2}{' '}
            </div>
            <Periods />
          </div>
        </div>
      </div>
    </div>
  );
}
