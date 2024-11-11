// // import { FixedSizeList as List } from 'react-window';
// // import React, { useCallback } from 'react';
// // import { useFormContext } from 'react-hook-form';

// // // Define the row component
// // const Row = React.memo(({ index, style, data }) => {
// //   const { items, setValue, getValues, copyWager } = data;
// //   const item = items[index];

// //   // Memoize the input change handler
// //   const handleInputChange = useCallback((
// //     field: 'wager' | 'd1' | 'd2' | 'd3' | 'd4',
// //     e: React.ChangeEvent<HTMLInputElement>
// //   ) => {
// //     setValue(`sin4ds.${index}.${field}`, e.target.value);
// //     // Add your other logic here
// //   }, [index, setValue]);

// //   return (
// //     <div style={style} className="flex gap-2">
// //       <input
// //         value={item.d1}
// //         onChange={(e) => handleInputChange('d1', e)}
// //         className="w-12"
// //       />
// //       <input
// //         value={item.d2}
// //         onChange={(e) => handleInputChange('d2', e)}
// //         className="w-12"
// //       />
// //       <input
// //         value={item.d3}
// //         onChange={(e) => handleInputChange('d3', e)}
// //         className="w-12"
// //       />
// //       <input
// //         value={item.d4}
// //         onChange={(e) => handleInputChange('d4', e)}
// //         className="w-12"
// //       />
// //       <input
// //         value={item.wager}
// //         onChange={(e) => handleInputChange('wager', e)}
// //         className="w-24"
// //       />
// //       <span>{item.game}</span>
// //       <span>{item.dis}</span>
// //       <span>{item.net}</span>
// //     </div>
// //   );
// // });

// // // Main component
// // export const VirtualizedList = () => {
// //   const { setValue, getValues } = useFormContext();
// //   const sin4ds = getValues('sin4ds');
// //   const copyWager = getValues('copyWager');

// //   return (
// //     <List
// //       height={400} // Set this to your desired height
// //       itemCount={sin4ds.length}
// //       itemSize={40} // Height of each row
// //       width="100%"
// //       itemData={{
// //         items: sin4ds,
// //         setValue,
// //         getValues,
// //         copyWager
// //       }}
// //     >
// //       {Row}
// //     </List>
// //   );
// // };

// // // If you need a windowed grid layout instead of a list
// // import { FixedSizeGrid as Grid } from 'react-window';

// // const GridCell = ({ columnIndex, rowIndex, style, data }) => {
// //   // Similar to Row component but for grid layout
// //   // ...
// // };

// // const VirtualizedGrid = () => {
// //   const { setValue, getValues } = useFormContext();
// //   const sin4ds = getValues('sin4ds');

// //   return (
// //     <Grid
// //       columnCount={8} // Number of columns
// //       columnWidth={100} // Width of each column
// //       height={400}
// //       rowCount={Math.ceil(sin4ds.length / 8)} // Number of rows
// //       rowHeight={40}
// //       width={800}
// //       itemData={{
// //         items: sin4ds,
// //         setValue,
// //         getValues
// //       }}
// //     >
// //       {GridCell}
// //     </Grid>
// //   );
// // };

// // // Optional: Add infinite loading if needed
// // import InfiniteLoader from 'react-window-infinite-loader';

// // const InfiniteList = () => {
// //   const { setValue, getValues } = useFormContext();
// //   const sin4ds = getValues('sin4ds');

// //   return (
// //     <InfiniteLoader
// //       isItemLoaded={index => index < sin4ds.length}
// //       itemCount={sin4ds.length}
// //       loadMoreItems={(startIndex, stopIndex) => {
// //         // Load more items if needed
// //       }}
// //     >
// //       {({ onItemsRendered, ref }) => (
// //         <List
// //           ref={ref}
// //           onItemsRendered={onItemsRendered}
// //           // ... other List props
// //         >
// //           {Row}
// //         </List>
// //       )}
// //     </InfiniteLoader>
// //   );
// // };

// 'use client';

// import { useZodForm } from '@/hooks/use-zod-form';
// import { cn, generateAndPadArrayFn, safeParseFloat } from '@/lib/utils';
// import { bseoTableSchema } from '@/schemas/togel-schema';
// import { ArrayOptProps } from '@/types/types';
// import { useState, useCallback, useRef, useEffect, useMemo, ChangeEvent } from 'react';

// // Enums and Types
// enum BigSmallOddEven {
//   Big = 'big',
//   Small = 'small',
//   Odd = 'odd',
//   Even = 'even',
// }

// enum Position {
//   TwoD = '2d',
//   TwoDFront = '2dd',
//   TwoDMiddle = '2dt',
// }

// interface BsOe4dSchema {
//   bseo: BigSmallOddEven;
//   position: Position;
//   game: string;
//   status?: string;
//   wager?: string;
//   dis?: string;
//   net?: string;
//   period?: string;
//   bseoArray?: ArrayOptProps[]; // Added this to match your usage
// }

// // Type guard
// function isBseoKey(value: string): value is BigSmallOddEven {
//   return Object.values(BigSmallOddEven).includes(value as BigSmallOddEven);
// }

// const formBseo: BsOe4dSchema = {
//   bseo: BigSmallOddEven.Big,
//   position: Position.TwoD,
//   game: 'quick 2d',
//   wager: '',
//   dis: '',
//   net: '',
//   period: '001',
//   status: 'processing',
// };

// // Component implementation
// const Quick2d = () => {
//   // States
//   const [bsEo, setBsEo] = useState<BsOe4dSchema[]>([formBseo]);
//   const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
//   const [arrayValues, setArrayValues] = useState<ArrayOptProps[]>([]);

//   // Refs
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
//   const arrayOptionsRef = useRef<ArrayOptProps[]>([]);

//   // Form setup
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     getValues,
//     formState: { errors, isValid, isSubmitting, isDirty },
//   } = useZodForm({
//     schema: bseoTableSchema,
//     mode: 'onChange',
//     defaultValues: {
//       bsEo: [formBseo],
//       copy: false,
//       copyWager: '',
//     },
//   });

//   const bseoVal = watch('bsEo');
//   const { bseo, position: game } = bseoVal[0];

//   // Memoized array options
//   const arrayOptions: ArrayOptProps[] = useMemo(() => {
//     const newBseo = generateAndPadArrayFn(game, bseo);
//     if (newBseo) {
//       setArrayValues(newBseo);
//       arrayOptionsRef.current = newBseo; // Keep ref updated
//     }
//     return newBseo;
//   }, [game, bseo]);

//   // Handlers
//   const handleChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
//       const { name, value } = e.target;
//       setBsEo((prev) => {
//         const newState = [...prev];
//         if (name === `bsEo.${i}.bseo`) {
//           if (isBseoKey(value)) {
//             const selectedArray = arrayOptionsRef.current; // Use ref for latest value
//             newState[i] = {
//               ...newState[i],
//               bseo: value,
//               bseoArray: selectedArray,
//             };
//           }
//         } else {
//           newState[i] = {
//             ...newState[i],
//             [name.split('.')[2]]: value,
//           };
//           setSelectedValues(prev => ({
//             ...prev,
//             [name.split('.')[2]]: value,
//           }));
//         }

//         setValue('bsEo', newState);
//         return newState;
//       });
//     },
//     [setValue]
//   );

//   const handleInputChange = useCallback(
//     (field: string, e: ChangeEvent<HTMLInputElement>, i: number) => {
//       e.preventDefault();
//       e.stopPropagation();

//       const safeValue = safeParseFloat(
//         Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
//       ).toString();

//       e.target.value = safeValue;
//       inputRefs.current[i] = e.target;
//     },
//     []
//   );

//   const handleRadioChange = useCallback(
//     (e: ChangeEvent<HTMLInputElement>, rowIndex: number, key: string) => {
//       const { value } = e.target;
//       setSelectedValues(prev => ({
//         ...prev,
//         [`bsEo.${rowIndex}.${key}`]: value,
//       }));
//     },
//     []
//   );

//   // Submit handler
//   const onSubmit = useCallback((data: { bsEo: BsOe4dSchema[] }) => {
//     const filteredData = data.bsEo.filter(
//       item => item.wager !== '' && item.position !== ''
//     );

//     const renderedNet = filteredData.map(item => ({
//       ...item,
//       dis: (Number(item.wager) * 0.29).toFixed().toString(),
//       net: (Number(item.wager) * 0.71).toFixed().toString(),
//     }));

//     renderedNet.forEach((val, i) => {
//       setValue(`bsEo.${i}.dis`, val.dis);
//       setValue(`bsEo.${i}.net`, val.net);
//     });

//     const totalBet = renderedNet.reduce(
//       (acc, cur) => acc + Number(cur.net) * 50,
//       0
//     );
//     setValue('totalBet', (totalBet).toFixed());
//   }, [setValue]);

//   return (
//     // ... rest of your JSX remains the same
//   );
// };

// export default Quick2d;
import React from 'react';
import {
  Controller,
  FieldErrors,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { FixedSizeList } from 'react-window';

type Props = {
  items: any;
};

type FormValues = {
  test: {
    id: string;
    quantity: number;
  }[];
};

function List({ items }: Props) {
  const { control, handleSubmit, getValues, formState } = useForm<FormValues>({
    defaultValues: {
      test: items,
    },
    shouldUnregister: false,
  });
  const { errors } = formState;

  const { fields, remove } = useFieldArray({ control, name: 'test' });

  return (
    <form onSubmit={handleSubmit((data) => console.info(data))}>
      <FixedSizeList
        width={400}
        height={500}
        itemSize={40}
        itemCount={fields.length}
        itemData={fields}
        itemKey={(i) => fields[i].id}>
        {({ style, index, data }) => {
          const defaultValue = getValues('test')?.[index]?.quantity || 0;

          return (
            <div style={style}>
              <Controller
                render={({ field }) => <input {...field} />}
                rules={{ minLength: { value: 10, message: '10 CHARS' } }}
                name={`test.${index}.quantity`}
                defaultValue={Number(defaultValue)} // Ensure defaultValue is a number
                control={control}
              />
              <button type='button' onClick={() => remove(index)}>
                remove
              </button>
              {errors.test?.[index]?.quantity && (
                <p>
                  {
                    (errors.test[index] as FieldErrors).quantity
                      ?.message as string
                  }
                </p>
              )}
            </div>
          );
        }}
      </FixedSizeList>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default function AppTest() {
  const [items] = React.useState(() =>
    Array.from(Array(1000).keys()).map((i: number) => ({
      id: `${i}`,
      title: `List ${i}`,
      quantity: Math.floor(Math.random() * 10),
    }))
  );

  return (
    <div className='App'>
      <h1>Virtual useFieldArray</h1>
      <List items={items} />
    </div>
  );
}
