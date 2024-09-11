'use client';
import React, { Fragment, useState } from 'react';

interface BankOptionsProps {
  value: string;
  icon?: () => JSX.Element;
}

interface Option {
  label?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  options: BankOptionsProps[];
}

const SelectCustom: React.FC<Option> = ({
  options,
  onChange,
  label,
  ...rest
}) => {
  const [selectedValue, setSelectedValue] = useState(options[0]?.value || '');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className='select-' {...rest}>
      {label && <label htmlFor='select'>{label}</label>}
      <select
        id='select'
        value={selectedValue}
        onChange={handleChange}
        className='w-full h-50'>
        {options.map((option, i) => (
          <Fragment key={option.value}>
            <option key={i} value={option.value}>
              {/* <Image src={} alt='bank' fill className='object-cover ' /> */}

              {option.value}
            </option>
            {option.icon && <option.icon />}
          </Fragment>
        ))}
      </select>
    </div>
  );
};

export default SelectCustom;

// import React, { useState, useRef, useEffect } from 'react';
// import { cn } from '@/lib/utils';
// import { UseFormRegister, FieldErrors } from 'react-hook-form';

// interface SelectInputProps {
//   id: string;
//   label: string;
//   options: string[];
//   defaultValue?: string;
//   onChange: (value: string) => void;
//   register: UseFormRegister<any>;
//   errors?: FieldErrors;
// }

// const SelectInput: React.FC<SelectInputProps> = ({
//   id,
//   label,
//   options,
//   defaultValue = '',
//   onChange,
//   register,
//   errors,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedValue, setSelectedValue] = useState(defaultValue);
//   const selectRef = useRef<HTMLSelectElement | null>(null);

//   const handleClickOutside = (event: MouseEvent) => {
//     if (
//       selectRef.current &&
//       !selectRef.current.contains(event.target as Element)
//     ) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     register(selectRef.current, {
//       required: errors?.[id] ? errors?.[id].message : '',
//     });
//     return () => unregister(id);
//   }, [register, unregister, id, errors]);

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedValue(event.target.value);
//     onChange(event.target.value);
//   };

//   const handleToggleOpen = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className='w-full relative'>
//       <label
//         htmlFor={id}
//         className={cn(
//           'absolute text-sm duration-150 transform -translate-y-3 top-4 origin-[0]',
//           errors?.[id] ? 'text-red-500' : 'text-gray-400',
//           selectedValue
//             ? 'scale-75 -translate-y-4 peer-focus:scale-75 peer-focus:-translate-y-4'
//             : 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0'
//         )}
//       >
//         {label}
//       </label>

//       <div className='flex items-center border-2 rounded-md focus:outline-none hover:border-black transition'>
//         <select
//           ref={selectRef}
//           id={id}
//           value={selectedValue}
//           onChange={handleSelectChange}
//           className='w-full p-3 pl-4 font-light bg-white text-left disabled:opacity-70 disabled:cursor-not-allowed'
//           disabled={errors?.[id]}
//           // {...register(id, {
//           //   required: errors?.[id] ? errors?.[id].message : '',
//           // })}
//         >
//           {options.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//         <svg
//           className='ml-2 transition transform duration-200'
//           width='12'
//           height='12'
//           viewBox='0 0 20 20'
//           fill='currentColor'
//           onClick={handleToggleOpen}
//           aria-label='Toggle options'
//         >
//           <path
//             fillRule='evenodd'
//             d='M5.293 7.293a1 1 0 011.414 0L10 10.293l4.293-4.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414-1.414L5.293 7.293z'
//             clipRule='evenodd'
//           />
//         </svg>
//       </div>

//       {/* Error Message */}
//       {errors?.[id] && (
//         <div className='text-red-500 text-sm mt-1'>{errors[id].message}</div>
//       )}
//     </div>
//   );
// };

// export default SelectInput;
