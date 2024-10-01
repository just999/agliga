'use client';

import useFormTypes from '@/hooks/use-form-types';
import { PostProps, SafeUser, SliderFormProps } from '@/types/types';
import { Slider } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@radix-ui/react-dropdown-menu';
import { Button } from './button';
import { MoreVerticalIcon } from 'lucide-react';
import { BsPen, BsTrash } from 'react-icons/bs';

import { TbNewSection } from 'react-icons/tb';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';

type DropdownVerticalProps = {
  item?: PostProps;
  value?: string | undefined;
  period?: string | null;
  currentUser?: SafeUser;
  title?: string;
  img?: Slider;
  className?: string;
  className2?: string;
};

const DropdownVertical = ({
  item,
  period,
  value,
  currentUser,
  title,
  img,
  className,
  className2,
}: DropdownVerticalProps) => {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : item?.id;

  const { formType, isOn, setOn, setImg } = useFormTypes((state) => ({
    formType: state.formType,
    isOn: state.isOn,
    setOn: state.setOn,
    setImg: state.setImg,
  }));

  const handleEditSlider = (img: SliderFormProps) => {
    setOn('edit-slider');
    setImg('edit-slider', img);
  };

  const handleDeleteSlider = (img: SliderFormProps) => {
    setOn('delete-slider');
    setImg('delete-slider', img);
  };

  const handlePeriod = (value: string) => {
    setOn('new-fixture', (period = value));
    // setGroup('new-fixture', isOpen === false, period);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn(className, 'z-99')}>
        <Button
          variant='ghost'
          className={cn('h-4 p-0  focus:outline-none ', className2)}>
          <span className='sr-only '>Open menu</span>
          <MoreVerticalIcon className='h-4 w-4 text-white/60 hover:text-white/80 svg' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-full flex flex-col bg-slate-200 bg-white/30 backdrop-blur justify-between  text-xs text-center  rounded-lg  mx-2 my-1 z-999'>
        {/* <DropdownMenuLabel></DropdownMenuLabel> */}
        <DropdownMenuItem className='w-full focus:outline-none'>
          <div className='flex flex-row justify-between w-full gap-2 px-2 py-1'>
            {item?.id && (
              <BsTrash
                className='text-neutral-400 h-4 w-4 m-0 p-0 cursor-pointer hover:text-red-600 hover:font-bold hover:shadow-lg svg'
                onClick={() =>
                  setOn('delete-post', item?.id, (title = 'Delete post'))
                }
              />
            )}
            {img?.id && (
              <BsTrash
                size={20}
                className='text-gray-700 h-4 w-4 m-0 p-0 cursor-pointer hover:text-red-500 hover:font-bold hover:shadow-lg svg'
                onClick={() => handleDeleteSlider(img)}
              />
            )}

            {item?.id && (
              <BsPen
                className='text-neutral-400  hover:font-bold h-5 w-5 m-0 cursor-pointer hover:text-orange-500  hover:shadow-lg'
                onClick={() =>
                  setOn('edit-post', item?.id, (title = 'Edit post'))
                }
              />
            )}
            {img?.id && (
              <BsPen
                size={20}
                className='text-gray-700  hover:font-bold h-4 w-4 m-0 cursor-pointer hover:text-emerald-600  hover:shadow-lg svg'
                onClick={() => handleEditSlider(img)}
              />
            )}
            {/* </Button> */}
            {value && value && (
              <TbNewSection onClick={() => handlePeriod(value)} />
            )}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownVertical;
