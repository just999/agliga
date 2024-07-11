'use client';

import { cn, noto, poppins } from '@/lib/utils';

import makeAnimated from 'react-select/animated';

import Select, { StylesConfig } from 'react-select';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';
import { categories } from '@/lib/helper';

export type SelectInputValue = {
  icon: string;
  value: string;
  desc?: string;
  style?: string;
};
type SelectInputProps = {
  optionClassName?: string;
  optionIconClassName?: string;
  optionPenaltyClassName?: string;
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
  optionClassName,
  optionIconClassName,
  optionPenaltyClassName,
}: SelectInputProps) => {
  let color: string;
  let fontColor: string;
  let fontWeight: string;
  let dropShadow: string;
  let isFocus: string;
  let focusFontWeight: string;

  const customStyles: StylesConfig<SelectInputValue> = {
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
      isFocus = state.isFocused ? '#e5e7eb' : '#ffffff';
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
    }),
  };
  const animatedComponents = makeAnimated();

  let multi;
  if (id === 'bankPt' || 'category' || 'bank') {
    multi = false;
  } else {
    multi = true;
  }
  return (
    <div
      className={cn(
        'flex flex-col gap-8 relative w-full',
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
        isMulti={isMulti}
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
              errors[id] ? 'focus:border-rose-500' : 'focus:border-black',
              optionPenaltyClassName
              // value && 'text-gray-700'
            )}
          >
            <div
              className={cn(
                'flex flex-row justify-between items-center hover:text-black',
                id === 'bank' ||
                  id === 'bankPT' ||
                  id === 'teamHome' ||
                  id === 'teamAway'
                  ? 'w-6 h-6'
                  : 'w-6 h-6 p-0 m-0 my-auto relative'
              )}
            >
              {
                // id === 'category' ||
                // id === 'bank' ||
                // id === 'bankPT' ||
                // id === 'game' ||
                // id === 'run' ||
                // id === 'teamHome' ||
                id === 'euroTeamHome' || id === 'euroTeamAway' ? (
                  <span
                    className={cn(
                      'w-10 h-10 text-2xl rounded-lg flex flex-row items-center text-stone-900'
                    )}
                  >
                    <span className={cn(optionIconClassName)}>
                      {option.icon}
                    </span>
                  </span>
                ) : (
                  <span
                    className={cn(
                      'w-10 h-10 text-2xl rounded-lg flex flex-row items-center text-stone-900',
                      optionIconClassName
                    )}
                  >
                    <span
                      className={cn(
                        option.style,
                        'bg-emerald-200/20 px-0 py-1'
                      )}
                    >
                      {categories
                        .filter((cat) => cat.label === option.value)
                        .map((c, i) => (
                          <c.icon key={i} className='w-7 h-7' />
                        ))}
                      <option.icon />
                      {/* <pre>{JSON.stringify(option, null, 2)}</pre> */}
                    </span>
                  </span>
                )
              }
            </div>
            <div
              className={cn(
                'cursor-pointer text-sm text-slate-600',
                optionClassName
              )}
            >
              {option &&
              (id === 'euroTeamHome' ||
                id === 'euroTeamAway' ||
                id === 'teamHome' ||
                id === 'teamAway' ||
                // id === 'bank' ||
                id === 'bankPT' ||
                id === 'week')
                ? option.value
                : option.desc}
              {/* <pre>{JSON.stringify(option.value, null, 2)}</pre> */}
              <span
                className={cn(
                  'text-neutral-500 ml-1 text-sm',
                  poppins.className
                )}
              >
                {option.value}{' '}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () =>
            `px-0 py-1 text-amber-700 font-semibold ${
              errors[id]
                ? 'border-rose-500 focus:border-rose-500 bg-rose-900/30!important'
                : 'border-neutral-300 focus:border-black'
            }`,
          input: () =>
            `text-sm  ${
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
