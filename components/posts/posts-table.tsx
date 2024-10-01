'use client';

import { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

// import posts from '@/data/posts';
import { rankItem } from '@tanstack/match-sorter-utils';
import Link from 'next/link';
import { Button } from '../ui/button';
import { BookOpenText, Pencil } from 'lucide-react';
import { Post, User } from '@prisma/client';
import { cn, formatShortDateTime } from '@/lib/utils';
import ClientOnly from '@/lib/client-only';

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

type PostsTableProps = {
  limit?: number;
  title?: string;
  user?: User;
  posts: Post[];
};

const PostsTable = ({ limit, title, user, posts }: PostsTableProps) => {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const role = user?.role;
  const filteredPosts = limit ? sortedPosts.slice(0, limit) : sortedPosts;
  const columns: ColumnDef<Post>[] = useMemo(
    () => [
      {
        accessorKey: 'title',
        header: 'Title',
      },
      {
        accessorKey: 'author',
        header: 'Author',
        cell: ({ row }) => (
          <div className='hidden md:table-cell '>{row.original.author}</div>
        ),
      },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row }) => (
          <div className='text-right hidden md:table-cell '>
            {formatShortDateTime(row.original.date)}
          </div>
        ),
      },
      {
        accessorKey: 'action',
        header: 'View',
        cell: ({ row }) => {
          const userAdminLink =
            role === 'admin'
              ? `/dashboard/admin/posts/${row.original.id}`
              : `/dashboard/posts/${row.original.id}`;

          const handleEditPost = () => {
            console.log('edit post');
          };
          return (
            <Link
              href={userAdminLink}
              className='text-right hidden md:table-cell '>
              <Button className='bg-sky-500 hover:bg-sky-500/70 text-white font-bold px-4 rounded text-xs flex gap-2 group items-center shadow-xl text-shadow'>
                {role === 'admin' ? (
                  <span
                    className='text-white flex gap-2 items-center group-hover:text-black'
                    onClick={handleEditPost}>
                    <Pencil size={16} className='svg' /> Edit
                  </span>
                ) : (
                  <span className='text-white flex gap-2 items-center group-hover:text-gray-600 '>
                    <BookOpenText size={16} className={cn('svg')} /> Open
                  </span>
                )}
              </Button>
              {/* <pre>{JSON.stringify(row.original, null, 2)}</pre> */}
            </Link>
          );
        },
      },
    ],
    [role]
  );

  const table = useReactTable({
    data: filteredPosts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: { fuzzy: fuzzyFilter },
  });

  return (
    <ClientOnly>
      <div className='mt-10 px-2 pb-20'>
        <h3 className='text-2xl mb-4 font-semibold'>
          {title ? title : 'Posts'}
        </h3>
        <Table>
          <TableCaption>{title}</TableCaption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='p-1 '>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  No. Data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>{' '}
    </ClientOnly>
  );
};

export default PostsTable;
