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

import { Button } from '../ui/button';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

import { InitialPostProps } from '@/types';
import useModal from '@/hooks/use-modal';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

import usePostsStore from '@/store/use-posts-store';
import { FcAddImage, FcEmptyTrash, FcEditImage } from 'react-icons/fc';

type ImagesProps = {
  control: Control;
  text?: InitialPostProps;
  setText?: (data: any) => void;
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
  const { modalType, img, id } = useModal();
  const { item } = usePostsStore();
  useEffect(() => {
    if (item.img) {
      setPreview(item.img);
    }
    if (text?.img === '' || modalType === null) {
      setPreview('');
    }
  }, [item.img, modalType, text]);

  useEffect(() => {
    if (modalType === 'edit-slider' && img) {
      setPreview(img.images);
    }
  }, [img, modalType]);

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
        console.log('🚀 ~ handleAddImages ~ file:', file);
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            const imageURL = e.target.result as string;
            setPreview(imageURL);
            if (setValue) setValue('img', file);
          }
        };
        reader.readAsDataURL(file);
        if (setText)
          setText((prev: InitialPostProps) => ({
            ...prev,
            img: file,
          }));
      }
    }
  };
  // console.log('🚀 ~ preview:', preview);

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
      <div className='flex flex-row gap-4 items-center justify-start h-full my-auto '>
        <Avatar className='rounded-none w-auto h-20 my-auto shadow-xl  '>
          <AvatarImage
            src={preview}
            className='w-auto h-18 rounded-lg aspect-auto'
            alt='@shadcn'
          />
          <AvatarFallback className='text-stone-400 text-xs px-4'>
            Post image{' '}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-4 w-1/2 '>
          <div className='w-full left-2 '>
            {(modalType === 'edit-slider' || modalType === 'add-slider') && (
              <Button
                variant='ghost'
                size='sm'
                type='button'
                onClick={onAddImages}
                className='bg-sky-50 border text-slate-400 border-sky-200 border-solid rounded-full  w-1/4 h-6 cursor-pointer'
              >
                {modalType === 'add-slider' ? (
                  <span>
                    <FcAddImage size={18} />
                  </span>
                ) : (
                  <FcEditImage />
                )}
                <span className='text-[10px] pl-2 '>
                  {modalType === 'add-slider' ? 'add image' : 'Edit'}
                </span>
              </Button>
            )}
          </div>
          <div>
            {(modalType === 'post' || modalType === 'edit') && (
              <Button
                variant='ghost'
                size='sm'
                type='button'
                onClick={onAddImages}
                className='bg-sky-50 border text-slate-400 border-sky-200 border-solid rounded-full  w-1/4 h-6 cursor-pointer'
              >
                <MdOutlineAddPhotoAlternate size={14} />{' '}
                <span className='text-[10px] px-2 '>
                  {modalType === 'post' ? 'add' : 'edit'}
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Images;
