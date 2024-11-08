// 'use client';

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui';
// import { useZodForm } from '@/hooks/use-zod-form';
// import ClientOnly from '@/lib/client-only';
// import {
//   ColokBebasTableSchema,
//   colokBebasTableSchema,
// } from '@/schemas/togel-schema';
// import {
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table';
// import { useCallback, useState } from 'react';
// import { useColokBebasColumns } from './colok-bebas-columns';

// type ColokBebasProps = {
//   data: ColokBebasTableSchema[];
// };

// export const formCl = {
//   d1: '',
//   game: '',
//   wager: '',
//   dis: '',
//   net: '',
//   period: '001',
//   status: 'processing',
// };

// const createEmptyRow = () => formCl;

// const initialData = Array(2)
//   .fill(null)
//   .map(() => createEmptyRow());

// let render = 0;
// const ColokBebasTable = ({ data }: ColokBebasProps) => {
//   console.log('🚀 ~ ColokBebasTable ~ data:', data);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [cl, setCl] = useState<ColokBebasTableSchema[]>([]);
//   const {
//     register,
//     handleSubmit,
//     setError,
//     control,
//     setFocus,
//     setValue,
//     watch,
//     formState: { errors, isValid, isSubmitting, isDirty, isLoading },
//     getValues,
//   } = useZodForm({
//     schema: colokBebasTableSchema,
//     mode: 'onChange',
//     defaultValues: {
//       cl,
//     },
//   });

//   const handleInputChange = useCallback(
//     (field: string, value: string, i: number) => {
//       if (value.length === 1) {
//         const fields: Array<keyof (typeof cl)[0]> = ['d1', 'wager'];
//         const currentIndex = fields.indexOf(field as keyof (typeof cl)[0]);
//         const nextField = fields[currentIndex + 1];
//         if (nextField) {
//           setFocus(`cl.${i}.${nextField}`);
//         }
//       }
//     },
//     [setFocus]
//   );

//   const { clColumns } = useColokBebasColumns(
//     register,
//     control,
//     watch,
//     setFocus,
//     getValues,
//     setValue,
//     handleInputChange
//   );

//   const defaultFilterFns = {
//     fuzzy: () => true,
//     contains: () => true,
//   };

//   const onSubmit = (data: any) => {
//     console.log('🚀 ~ onSubmit ~ data:', data);
//   };

//   const table = useReactTable({
//     data,
//     columns: clColumns,
//     getCoreRowModel: getCoreRowModel(),
//     filterFns: defaultFilterFns,
//   });

//   render++;
//   return (
//     <ClientOnly>
//       <div className='font-semibold text-xs'>render: {render}</div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead
//                       key={header.id}
//                       className='p-0 m-0 h-8 text-xs font-bold text-center'>
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
//                   colSpan={clColumns.length}
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

//         {showSuccessMessage && (
//           <div className='bg-green-200 text-green-800 p-4 rounded-md mt-4'>
//             Form submitted successfully!
//           </div>
//         )}
//         {errors.root && errors.root.serverError && (
//           <p className='text-center text-red-700 w-full mx-auto text-xs bg-rose-100 shadow-md rounded-md text-shadow'>
//             {errors.root.serverError.message as string}
//           </p>
//         )}
//       </form>
//     </ClientOnly>
//   );
// };

// export default ColokBebasTable;

'use client';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { useZodForm } from '@/hooks/use-zod-form';
import {
  colokBebasTableSchema,
  ColokBebasTableSchema,
} from '@/schemas/togel-schema';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useColokBebasColumns } from './colok-bebas-columns';

type ColokBebasTableProps<TData, TValue> = {
  // columns: ColumnDef<TData, TValue>[];
  // data: TData[];
};

const defaultFilterFns = {
  fuzzy: () => true,
  contains: () => true,
};

const formCb = {
  d1: '',
  game: 'colok-bebas',
  wager: '',
  dis: '',
  net: '',
  period: '001',
  status: 'processing',
};

const createEmptyRow = () => formCb;

const initialData = [...Array(10)].fill(null).map(() => createEmptyRow());

const ColokBebasTable = <TData, TValue>({}: // columns,
// data,
ColokBebasTableProps<TData, TValue>) => {
  const [cb, setCb] = useState<ColokBebasTableSchema[]>(() => initialData);

  const {
    register,
    handleSubmit,
    setError,
    control,
    setFocus,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitting, isDirty, isLoading },
    getValues,
  } = useZodForm({
    schema: colokBebasTableSchema,
    mode: 'onChange',
    defaultValues: {
      cb,
    },
  });

  const colokBebas = watch('cb');

  const cbRef = useRef(colokBebas);

  useEffect(() => {
    colokBebas.forEach((_, index) => {
      setValue(`cb.${index}.d1`, index.toString());
    });
  }, [colokBebas, setValue]);

  const handleInputChange = useCallback(
    (field: string, value: string, i: number) => {
      if (value.length === 1) {
        const fields: Array<keyof (typeof cb)[0]> = ['d1', 'wager'];
        const currentIndex = fields.indexOf(field as keyof (typeof cb)[0]);
        const nextField = fields[currentIndex + 1];
        if (nextField) {
          setFocus(`cb.${i}.${nextField}`);
        }
      }
    },
    [setFocus]
  );

  const { cbColumns } = useColokBebasColumns(
    register,
    control,
    watch,
    setFocus,
    getValues,
    setValue,
    handleInputChange
  );

  const onSubmit = (data: any) => {
    const filteredData = data.cb.filter((dat: any) => dat.wager !== '');

    const renderedNet = filteredData.map((item: any) => ({
      ...item,
      dis: (Number(item.wager) * (5 / 100)).toFixed().toString(),
      net: (Number(item.wager) * (95 / 100)).toFixed().toString(),
    }));
    console.log('🚀 ~ renderedNet ~ renderedNet:', renderedNet);
  };

  const table = useReactTable({
    data: colokBebas,
    columns: cbColumns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: defaultFilterFns,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className='p-0 m-0 h-8 text-xs font-bold text-center'>
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
                data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className='p-0 m-0'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {/* <pre>
                        {JSON.stringify(cell.column.columnDef, null, 2)}
                      </pre> */}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={cbColumns.length}
                className='h-24 text-center'>
                No Results
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter className='bg-transparent '>
          {table.getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <TableCell key={header.id} className='p-0'>
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
      <div className='w-full text-right py-2 pr-4 '>
        <Button
          size='sm'
          type='submit'
          disabled={!isValid}
          className='py-1 px-2 '>
          Submit
        </Button>
      </div>
      {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
    </form>
  );
};

export default ColokBebasTable;
