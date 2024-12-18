'use client';

import { Key, useState } from 'react';

import { getMessageThread } from '@/actions/message-actions';
import { Button, Card } from '@/components/shadcn/ui';
import Heading from '@/components/shadcn/ui/heading';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn/ui/table';
import { useMessages } from '@/hooks/use-messages';
import { cn } from '@/lib/utils';
import { MessageDto } from '@/types';
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

interface DataWithId {
  id: Key;
}

type MessageTableProps = {
  initialMessages: MessageDto[];
  nextCursor?: string;
  className?: string;
};

const MessageTable = <TData extends DataWithId, TValue>({
  initialMessages,
  nextCursor,
  className,
}: MessageTableProps) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const {
    isOutbox,
    messageColumns: columns,
    deleteMessage,
    selectRow,
    isDeleting,
    messages,
    loadMore,
    loadingMore,
    hasMore,
  } = useMessages(initialMessages, nextCursor);

  const table = useReactTable({
    data: messages as unknown as TData[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: 'fuzzy',
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
    state: {
      globalFilter,
      sorting,
      columnFilters,
    },
  });

  const handleSelectRow = async (e: any, data: any) => {
    const res = await getMessageThread(data.senderId);
    selectRow(e, data.id);
  };

  return (
    <>
      <Card className='flex flex-col h-fit'>
        <Heading
          title='Messages'
          description='history messages'
          className='w-full text-center text-shadow'
        />
        <Table className='bg-amber-50 border-none overflow-hidden'>
          <TableHeader className='bg-amber-50 '>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, i) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        ' text-xs text-stone-500 h-8  text-center px-2 bg-stone-50 border border-solid border-zinc-200'
                      )}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div>{/* <Filter column={header.column} /> */}</div>
                          ) : null}
                        </>
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
                  onClick={(e) => handleSelectRow(e, row.original)}
                  data-state={row.getIsSelected() && 'selected'}
                  className='h-6 bg-amber-50 even:bg-orange-50 odd:bg-amber-200/30'
                >
                  {row.getVisibleCells().map((cell: any) => {
                    // let activeCell;
                    // if (
                    //   cell.column.id === 'active' &&
                    //   cell.row.original.active === true
                    // ) {
                    //   activeCell = '!bg-emerald-200 rounded-sm px-2';
                    // } else if (
                    //   cell.column.id === 'active' &&
                    //   cell.row.original.active === false
                    // ) {
                    //   activeCell = '!bg-rose-200 rounded-sm px-2';
                    // }
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          'p-0 text-start px-2 lg:text-sm even:bg-indigo-50 w-auto cursor-pointer',
                          className
                        )}
                        style={{ height: '18px' }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}

                        {/* <pre>{JSON.stringify(cell.getContext(), null, 2)}</pre> */}
                      </TableCell>
                    );
                  })}
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

          <TableFooter>
            {table.getFooterGroups().map((footerGroup) => (
              <TableRow key={footerGroup.id} className='w-fit text-wrap'>
                {footerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        </Table>
        {/* <div className='sticky bottom-0 pb-3 text-right '>
          <Button color='secondary' disabled={!hasMore} onClick={loadMore}>
            {loadingMore ? <Spinner /> : ''}
            {hasMore ? 'Load more' : 'No more messages'}
          </Button>
        </div> */}
        <div className='flex items-center justify-end space-x-2 py-4 px-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </Card>
    </>
  );
};

export default MessageTable;
