'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import {
  FcAddImage,
  FcFullTrash,
  FcPhotoReel,
  FcPicture,
} from 'react-icons/fc';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

import { getBase64FromUrl, trimFilename } from '@/lib/utils';
import { InitialPostProps, initialPostStateProps, PostProps } from '@/types';
import useModal from '@/hooks/use-modal';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import usePostsStore from '@/store/use-posts-store';

type ImagesProps = {
  control: Control;
  text: InitialPostProps;
  setText: (data: any) => void;
  register: UseFormRegister<FieldValues>;
  watch?: UseFormWatch<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  clear?: () => void;
  slider?: string[];
  setSlider?: () => void;
  required?: boolean;
};

const Images = ({
  control,
  register,
  text,
  required,
  setText,
  watch,
  clear,
  setValue,
}: ImagesProps) => {
  const [preview, setPreview] = useState<string>('');
  const { ref: registerRef, ...rest } = register('img');
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const { modalType } = useModal();
  console.log('🚀 ~ modalType:', modalType);

  const { item } = usePostsStore();
  useEffect(() => {
    if (item.img) {
      setPreview(item.img);
    }
    if (text.img === '') {
      setPreview('');
    }
  }, [item.img, text]);

  let watchRes;
  if (watch) {
    watchRes = watch('img');
  }

  const onAddImages = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            const imageURL = e.target.result as string;
            setPreview(imageURL);
            if (setValue) setValue('img', file);
          }
        };
        reader.readAsDataURL(file);
        setText((prev: any) => ({
          ...prev,
          img: file,
        }));
      }
    }
  };

  return (
    <>
      <input
        type='file'
        {...rest}
        ref={(e) => {
          registerRef(e);
          hiddenFileInput.current = e;
        }}
        {...register}
        onChange={handleAddImages}
        className='hidden'
        required={required}
      />
      <div className='flex flex-row gap-2 items-center h-full my-auto '>
        <Avatar className='rounded-none w-auto h-20 my-auto shadow-xl '>
          <AvatarImage
            src={preview}
            className='w-auto h-18 rounded-lg aspect-auto'
            alt='@shadcn'
          />
          <AvatarFallback className='text-stone-400 text-xs'>
            Post image{' '}
          </AvatarFallback>
        </Avatar>

        {modalType === 'slider' && (
          <Button
            variant='ghost'
            className='text-xs flex flex-row gap-2'
            onClick={onAddImages}
          >
            {' '}
            <FcPhotoReel size={18} /> Edit
          </Button>
        )}
        <div>
          {modalType === 'post' && (
            <Button
              variant='ghost'
              size='sm'
              type='button'
              onClick={onAddImages}
              className='bg-sky-50 border text-slate-400 border-sky-200 border-solid rounded-full w-6 h-6'
            >
              <MdOutlineAddPhotoAlternate />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Images;
