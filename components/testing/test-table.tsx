// // 'use client';

// // import { Button } from '@/components/ui/button';
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from '@/components/ui/table';

// // import { useFieldArray, useForm } from 'react-hook-form';
// // import {
// //   createColumnHelper,
// //   flexRender,
// //   getCoreRowModel,
// //   useReactTable,
// // } from '@tanstack/react-table';
// // import { PlusCircle, Trash2 } from 'lucide-react';
// // import { z } from 'zod';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { InputCustom } from '../ui';

// // // Define the form schema
// // const formSchema = z.object({
// //   items: z.array(
// //     z.object({
// //       name: z.string().min(1, 'Name is required'),
// //       quantity: z.string().min(1, 'Quantity is required'),
// //       price: z.string().min(1, 'Price is required'),
// //     })
// //   ),
// // });

// // const defaultFilterFns = {
// //   fuzzy: () => true,
// //   contains: () => true,
// // };

// // type FormValues = z.infer<typeof formSchema>;

// // // Define the item type
// // type Item = {
// //   name: string;
// //   quantity: string;
// //   price: string;
// // };

// // const defaultItem: Item = {
// //   name: '',
// //   quantity: '',
// //   price: '',
// // };

// // export default function TestTable() {
// //   // Set up form with react-hook-form
// //   const form = useForm<FormValues>({
// //     resolver: zodResolver(formSchema),
// //     defaultValues: {
// //       items: [defaultItem],
// //     },
// //   });

// //   // Set up field array
// //   const { fields, append, remove } = useFieldArray({
// //     control: form.control,
// //     name: 'items',
// //   });

// //   // Column helper for tanstack table
// //   const columnHelper = createColumnHelper<Item>();

// //   // Define table columns
// //   const columns = [
// //     columnHelper.accessor('name', {
// //       header: 'Name',
// //       cell: ({ row: { index } }) => (
// //         <InputCustom
// //           {...form.register(`items.${index}.name`)}
// //           placeholder='Item name'
// //           className='min-w-[200px]'
// //         />
// //       ),
// //     }),
// //     columnHelper.accessor('quantity', {
// //       header: 'Quantity',
// //       cell: ({ row: { index } }) => (
// //         <InputCustom
// //           {...form.register(`items.${index}.quantity`)}
// //           type='number'
// //           placeholder='Quantity'
// //           className='w-[100px]'
// //         />
// //       ),
// //     }),
// //     columnHelper.accessor('price', {
// //       header: 'Price',
// //       cell: ({ row }) => (
// //         <div>
// //           <InputCustom
// //             {...form.register(`items.${row.index}.price`)}
// //             type='number'
// //             step='0.01'
// //             placeholder='Price'
// //             className='w-[120px]'
// //           />
// //           <pre>{JSON.stringify(row, null, 2)}</pre>
// //         </div>
// //       ),
// //     }),
// //     columnHelper.display({
// //       id: 'actions',
// //       cell: ({ row: { index } }) => (
// //         <Button
// //           type='button'
// //           variant='ghost'
// //           size='icon'
// //           onClick={() => remove(index)}
// //           disabled={fields.length === 1}>
// //           <Trash2 className='h-4 w-4' />
// //         </Button>
// //       ),
// //     }),
// //   ];

// //   // Set up tanstack table
// //   const table = useReactTable({
// //     data: fields,
// //     columns,
// //     getCoreRowModel: getCoreRowModel(),
// //     filterFns: defaultFilterFns,
// //   });

// //   // Handle form submission
// //   const onSubmit = (data: FormValues) => {
// //     console.log(data);
// //     // Handle your form submission here
// //   };

// //   return (
// //     <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
// //       <div className='rounded-md border'>
// //         <Table>
// //           <TableHeader>
// //             {table.getHeaderGroups().map((headerGroup) => (
// //               <TableRow key={headerGroup.id}>
// //                 {headerGroup.headers.map((header) => (
// //                   <TableHead key={header.id}>
// //                     {flexRender(
// //                       header.column.columnDef.header,
// //                       header.getContext()
// //                     )}
// //                   </TableHead>
// //                 ))}
// //               </TableRow>
// //             ))}
// //           </TableHeader>
// //           <TableBody>
// //             {table.getRowModel().rows.map((row) => (
// //               <TableRow key={row.id}>
// //                 {row.getVisibleCells().map((cell) => (
// //                   <TableCell key={cell.id}>
// //                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
// //                   </TableCell>
// //                 ))}
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </div>

// //       <div className='flex justify-between'>
// //         <Button
// //           type='button'
// //           variant='outline'
// //           size='sm'
// //           onClick={() => append(defaultItem)}>
// //           <PlusCircle className='mr-2 h-4 w-4' />
// //           Add Item
// //         </Button>
// //         <Button type='submit'>Save Changes</Button>
// //       </div>

// //       {/* Display form errors if any */}
// //       {Object.keys(form.formState.errors).length > 0 && (
// //         <pre className='text-red-500'>
// //           {JSON.stringify(form.formState.errors, null, 2)}
// //         </pre>
// //       )}

// //       {/* Display form values for debugging */}
// //       <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
// //     </form>
// //   );
// // }

// 'use client';

// import { Button } from '@/components/ui/button';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';

// import { useFieldArray, useForm } from 'react-hook-form';
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table';
// import { PlusCircle, Trash2 } from 'lucide-react';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { InputCustom } from '../ui';

// const formSchema = z.object({
//   items: z.array(
//     z.object({
//       name: z.string().min(1, 'Name is required'),
//       quantity: z.string().min(1, 'Quantity is required'),
//       price: z.string().min(1, 'Price is required'),
//     })
//   ),
// });

// const defaultFilterFns = {
//   fuzzy: () => true,
//   contains: () => true,
// };

// type FormValues = z.infer<typeof formSchema>;

// type Item = {
//   name: string;
//   quantity: string;
//   price: string;
// };

// const defaultItem: Item = {
//   name: '',
//   quantity: '',
//   price: '',
// };

// export default function TestingTable() {
//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       items: [defaultItem],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: 'items',
//   });

//   // Watch the items array for real-time updates
//   const watchedItems = form.watch('items') || [];

//   const columnHelper = createColumnHelper<Item>();

//   const columns = [
//     columnHelper.accessor('name', {
//       header: 'Name',
//       cell: ({ row: { index } }) => (
//         <InputCustom
//           {...form.register(`items.${index}.name`)}
//           placeholder='Item name'
//           className='min-w-[200px]'
//         />
//       ),
//     }),
//     columnHelper.accessor('quantity', {
//       header: 'Quantity',
//       cell: ({ row: { index } }) => (
//         <InputCustom
//           {...form.register(`items.${index}.quantity`)}
//           type='number'
//           placeholder='Quantity'
//           className='w-[100px]'
//         />
//       ),
//     }),
//     columnHelper.accessor('price', {
//       header: 'Price',
//       cell: ({ row }) => (
//         <div>
//           <InputCustom
//             {...form.register(`items.${row.index}.price`)}
//             type='number'
//             step='0.01'
//             placeholder='Price'
//             className='w-[120px]'
//           />
//           <pre>{JSON.stringify(row, null, 2)}</pre>
//         </div>
//       ),
//     }),
//     columnHelper.display({
//       id: 'actions',
//       cell: ({ row: { index } }) => (
//         <Button
//           type='button'
//           variant='ghost'
//           size='icon'
//           onClick={() => remove(index)}
//           disabled={fields.length === 1}>
//           <Trash2 className='h-4 w-4' />
//         </Button>
//       ),
//     }),
//   ];

//   // Use watchedItems instead of fields for the table data
//   const table = useReactTable({
//     data: watchedItems,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     filterFns: defaultFilterFns,
//   });

//   const onSubmit = (data: FormValues) => {
//     console.log(data);
//   };

//   return (
//     <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
//       <div className='rounded-md border'>
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows.map((row) => (
//               <TableRow key={row.id}>
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell key={cell.id}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       <div className='flex justify-between'>
//         <Button
//           type='button'
//           variant='outline'
//           size='sm'
//           onClick={() => append(defaultItem)}>
//           <PlusCircle className='mr-2 h-4 w-4' />
//           Add Item
//         </Button>
//         <Button type='submit'>Save Changes</Button>
//       </div>

//       {/* Optional: Show form values for debugging */}
//       <pre>{JSON.stringify(watchedItems, null, 2)}</pre>
//     </form>
//   );
// }
