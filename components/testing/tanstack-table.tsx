// 'use client';

// import {
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table';
// import TogelContainer from '../ui/togel-container';
// import { useState } from 'react';
// import Data from '@/data/tanstack-data';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '../ui';
// import ClientOnly from '@/lib/client-only';

// const defaultFilterFns = { fuzzy: () => true, contains: () => true };

// const columns = [
//   {
//     accessorKey: 'task',
//     header: 'Task',
//     cell: (props: any) => <p>{props.getValues()}</p>,
//   },
//   {
//     accessorKey: 'status',
//     header: 'Status',
//     cell: (props: any) => <p>{props.getValues()}</p>,
//   },
//   {
//     accessorKey: 'due',
//     header: 'Due',
//     cell: (props: any) => <p>{props.getValues()}</p>,
//   },
//   {
//     accessorKey: 'notes',
//     header: 'Notes',
//     cell: (props: any) => <p>{props.getValues()}</p>,
//   },
// ];

// const TanstackTable = () => {
//   const [data, setData] = useState(Data);
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     filterFns: defaultFilterFns,
//   });
//   return (
//     <ClientOnly>
//       <TogelContainer>
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && 'selected'}>
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id} className='p-0 m-0'>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                       {/* <pre>
//                         {JSON.stringify(cell.column.columnDef, null, 2)}
//                       </pre> */}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   // colSpan={columns.length}
//                   className='h-24 text-center'>
//                   No Results
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//           <TableFooter className='bg-transparent '>
//             {table.getFooterGroups().map((footerGroup) => (
//               <TableRow key={footerGroup.id}>
//                 {footerGroup.headers.map((header) => (
//                   <TableCell key={header.id} className='p-0'>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.footer,
//                           header.getContext()
//                         )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableFooter>
//         </Table>
//       </TogelContainer>
//     </ClientOnly>
//   );
// };

// export default TanstackTable;

'use client';

type TanstackTableProps = {};

const TanstackTable = () => {
  return <div>TanstackTable</div>;
};

export default TanstackTable;
