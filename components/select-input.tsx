'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import makeAnimated from 'react-select/animated';

import Select, { StylesConfig } from 'react-select';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

export type SelectInputValue = {
  icon: string;
  value: string;
};
type SelectInputProps = {
  id: string;
  label?: string;
  isMulti: boolean;
  register: UseFormRegister<FieldValues>;
  value?: SelectInputValue;
  defaultValue?: SelectInputValue;
  errors: FieldErrors;
  formatPrice?: boolean;
  required?: boolean;
  placeholder?: string;
  options: () => void;
  onChange: (value: SelectInputValue) => void;
};

const SelectInput = ({
  id,
  label,
  value,
  defaultValue,
  isMulti,
  required,
  onChange,
  register,
  formatPrice,
  placeholder,
  options,
  errors,
}: SelectInputProps) => {
  let color: string;
  let fontColor: string;
  let fontWeight: string;
  let dropShadow: string;
  let isFocus: string;
  let focusFontWeight: string;

  const customStyles: StylesConfig<SelectInputValue, false> = {
    control: (provided) => ({
      ...provided,
      backgroundColor: errors[id]
        ? 'border-rose-500 focus:border-rose-500 bg-rose-900/30!important'
        : 'border-neutral-300 focus:border-black',
      cursor: 'pointer',
    }),
    option: (provided, state) => {
      color = state.isSelected ? '#e2e8f0' : '#ffffff';
      fontColor = state.isSelected ? '#09090b' : '#71717a';
      fontWeight = state.isSelected ? '700' : '400';
      // dropShadow = state.isSelected
      //   ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px;'
      //   : 'rgba(149, 157, 165, 0.2) 0px 8px 24px';
      isFocus = state.isFocused ? '#e5e7eb' : '#fff';
      focusFontWeight = state.isFocused ? '700' : '';
      return {
        ...provided,
        backgroundColor: state.isFocused ? isFocus : color,
        color: fontColor,
        fontWeight: fontWeight,
        boxShadow: dropShadow,
      };
    },
    placeholder: (provided, state) => ({
      ...provided,
      fontSize: '14px',
      backgroundColor: state.isFocused ? isFocus : color,
      color: errors[id] ? 'text-green-400' : 'text-indigo-600',
      fontWeight: value && fontWeight,
      // boxShadow: dropShadow,
    }),
  };

  const animatedComponents = makeAnimated();
  return (
    <div
      className={cn(
        'flex flex-col gap-8 relative',
        errors[id]
          ? 'text-rose-500 focus:text-red-600'
          : 'text-neutral-300 focus:border-black'
      )}
    >
      {formatPrice && (
        <BiDollar
          size={24}
          className='text-neutral-700 absolute top-5 left-2'
        />
      )}

      <Select
        styles={customStyles}
        placeholder={placeholder}
        isClearable
        {...register(id, { required })}
        className={cn(
          'peer w-full font-light bg-stone-100 border rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed',
          errors[id] ? 'border-rose-500 bg-rose-100/30' : 'border-neutral-300',
          errors[id] ? 'focus:border-rose-500' : 'focus:border-black'
        )}
        options={options() as any}
        components={animatedComponents}
        isMulti={placeholder === 'Banks' || id === 'bankPT' ? false : true}
        value={value}
        defaultValue={defaultValue}
        onChange={(value) => onChange(value as SelectInputValue)}
        formatOptionLabel={(option: SelectInputValue) => (
          <div
            className={cn(
              ' cursor-pointer text-gray-800  hover:text-black hover:font-normal',
              placeholder === 'Bank'
                ? 'flex flex-row items-center gap-3 text-xs '
                : 'flex flex-row items-center gap-3 text-xs w-full h-auto my-auto',
              errors[id]
                ? 'border-rose-500 bg-rose-100/30'
                : 'border-neutral-300',
              errors[id] ? 'focus:border-rose-500' : 'focus:border-black'
              // value && 'text-gray-700'
            )}
          >
            <div
              className={cn(
                'flex flex-row justify-center items-center hover:text-black   ',
                placeholder === 'Banks' || id === ('bankPT' || 'teamHome')
                  ? 'w-9 h-6'
                  : 'w-6 h-6 p-0 m-0 my-auto relative'
              )}
            >
              {id === ('category' || 'teamHome' || 'teamAway') ? (
                <span className='w-10 h-10 text-2xl flex flex-row items-center text-stone-900 '>
                  <option.icon />
                </span>
              ) : (
                <Image
                  src={option.icon}
                  alt={option.value}
                  width={id === 'bank' || 'bankPT' || 'teamHome' ? 50 : 30}
                  height={id === 'bank' || 'bankPT' || 'teamHome' ? 30 : 20}
                  priority
                  sizes='(min-width: 10px) 100vw, (max-width: 30px) 50vw, 33vw'
                  className={cn(
                    'object-cover w-full border-solid border rounded  border-gray-200 drop-shadow-lg'
                  )}
                />
              )}
            </div>
            <div className='cursor-pointer text-slate-600 text-xs font-semibold'>
              {option.value}

              {/* <span className='text-neutral-500 ml-1 '></span> */}
            </div>
          </div>
        )}
        classNames={{
          control: () =>
            `px-3 py-1 border ${
              errors[id]
                ? 'border-rose-500 focus:border-rose-500 bg-rose-900/30!important'
                : 'border-neutral-300 focus:border-black'
            }`,
          input: () =>
            `text-sm ${
              errors[id]
                ? 'border-rose-500 focus:border-rose-500 bg-rose-900/30!important'
                : 'border-neutral-300 focus:border-black'
            }`,
          option: ({ isFocused, isSelected }) =>
            cn(
              isFocused &&
                `hover:cursor-pointer 
                  hover:bg-slate-100 hover:text-stone-900 
                  px-3 py-2 rounded`,
              isSelected && 'bg-slate-300',
              errors[id]
                ? 'border-rose-500 focus:border-rose-500 bg-rose-100/30'
                : 'border-neutral-300 focus:border-black'
            ),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: '#D1D5DB',
            primary25: '#000',
          },
        })}
      />
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.0 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500",
            formatPrice ? 'left-9' : 'left-4',
            errors[id] ? 'text-red-500' : 'text-gray-400'
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default SelectInput;
