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
import { register } from 'module';

type ImagesProps = {
  control: Control;
  text: InitialPostProps;
  setText: (data: any) => void;
  register: UseFormRegister<FieldValues>;
  watch?: UseFormWatch<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
};

const Images = ({
  control,
  register,
  text,
  setText,
  watch,
  setValue,
}: ImagesProps) => {
  const [preview, setPreview] = useState<string>('');
  const { ref: registerRef, ...rest } = register('img');
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { modalType } = useModal();

  const { item } = usePostsStore();
  useEffect(() => {
    if (item.img) {
      setPreview(item.img);
    }
  }, [item.img]);

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'img',
  //   keyName: 'imgId',
  // });
  // const joinedStrings = fields.map(({ imgId, ...rest }) =>
  //   Object.values(rest).join('')
  // );
  let watchRes;
  if (watch) {
    watchRes = watch('img');
  }

  // const controlledFields = fields.map((field, index) => {
  //   return {
  //     ...field,
  //     ...watchRes[index],
  //   };
  // });
  // const joinedStrings = fields.map(({ imgId, ...rest }) =>
  // );

  // useEffect(() => {
  //   if (modalType === 'edit') {
  //     setPreview(text.img);
  //   }
  // }, [modalType, text.img]);

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

      // if (hiddenFileInput.current && e.target.files) {
      //   const imgFiles = e.target.files;
      //   const uploadedFiles = Array.from(imgFiles);
      //   const files = uploadedFiles.map((file) => ({
      //     file,
      //   }));
      // append(files);

      // let allSelectedFiles: File[] = [];
      // let filesForUpload: File[] = [];

      // const MAX = 4;

      // allSelectedFiles = [...allSelectedFiles, ...imgFiles];
      // let filenames = new Set();

      // filesForUpload = allSelectedFiles.filter((f) => {
      //   let existingFiles = filenames.has(f.name);
      //   filenames.add(f.name);
      //   return !existingFiles;
      // });

      // filesForUpload = filesForUpload.slice(0, MAX);

      // hiddenFileInput.current.value = '';

      // let numOfFiles = 0;

      // allSelectedFiles = [...allSelectedFiles, ...files];
      // let filenames = new Set();
      // filesForUpload = allSelectedFiles.filter((f) => {
      //   let existingFiles = filenames.has(f.name);
      //   filenames.add(f.name);
      //   return !existingFiles;
      // });
      // filesForUpload = filesForUpload.slice(0, MAX);
      // // let updatedImages: string[] = [];
      // // const filesArray = Array.from(filesForUpload);

      // if (!text.img) return;

      // // const MAX = 4;
      // if (numOfFiles + files.length > MAX) {
      //   // toast.error(`You can only select up to ${MAX} files.`);
      //   alert('You can only upload at most 4 files!');
      //   return;
      // }

      // numOfFiles += files.length;

      // let updatedImages = [...text.img];
      // const filesArray = Array.from(imgFiles);
      // // if (filesArray.length > MAX) clear();
      // // const filesArray = Array.from(imgFiles);
      // for (let i = 0; i < filesArray.length; i++) {
      //   const file = filesArray[i];
      //   const reader = new FileReader();
      //   reader.onload = (e) => {
      //     if (e.target && e.target.result) {
      //       const imageURL = e.target.result as string;
      //       updatedImages.push(imageURL);
      //       // setPreview((prev) => ({
      //       //   ...prev,
      //       //   preview: updatedImages,
      //       // }));
      //       // setText((prev: any) => ({
      //       //   ...prev,
      //       //   img: updatedImages,
      //       // }));

      //       setPreview(preview.concat(imageURL));
      //     }
      //   };
      //   reader.readAsDataURL(file);
      // }
    }
  };

  // useEffect(() => {
  //   if (modalType === 'edit') {
  //     let res;
  //     const getImages = async () => {
  //       res = await getBase64FromUrl(joinedStrings[0]);
  //     };
  //     getImages();
  //   }
  // }, [joinedStrings, modalType]);

  const clear = () => {
    if (imgRef.current) {
      imgRef.current.value = '';
    }
    setText((prev: any) => ({
      ...prev,
      imagesPrev: [],
    }));
  };

  // const uploadButtonLabel = preview ? 'Change image' : 'Upload image';
  return (
    <>
      <input
        type='file'
        {...rest}
        ref={(e) => {
          registerRef(e);
          hiddenFileInput.current = e;
        }}
        value=''
        {...register}
        onChange={handleAddImages}
        className='hidden'
      />

      <Avatar className='rounded-none w-20 h-20 my-auto '>
        <AvatarImage
          src={preview}
          className='w-18 h-18 rounded-lg'
          alt='@shadcn'
        />
        <AvatarFallback>Post image </AvatarFallback>
      </Avatar>

      {modalType === 'edit' && (
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
        <div>
          {/* <Label>Images</Label> */}

          {/* {modalType === 'post' &&
            fields.map((field: { imgId: string; file?: File }, index) => (
              <div key={field.imgId}>
                <Controller
                  control={control}
                  name={`img.${index}`}
                  render={() => (
                    <div className=' text-center grid grid-cols-12 '>
                      <div className='flex flex-row w-full items-center gap-4 pb-2  col-span-10 bg-emerald-400'>
                        {field.file?.name && (
                          <Avatar className='rounded-none w-auto h-10 flex flex-row gap-2 items-center'>
                            <span> {index + 1}. </span>
                            <AvatarImage
                              src={URL.createObjectURL(field.file)}
                              alt={field.file?.name}
                              className='rounded-lg'
                            />
                            <AvatarFallback>
                              {field.file?.name &&
                                trimFilename(field.file.name, 7)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <pre>{JSON.stringify(index, null, 2)}</pre>
                        <span>
                          {field.file?.name &&
                            trimFilename(field.file?.name, 10)}
                        </span>
                      </div>

                      <div className='col-span-2 bg-slate-300 w-full'>
                        <Button
                          variant='ghost'
                          size='sm'
                          aria-label='Remove'
                          onClick={() => remove(index)}
                          className='flex flex-col justify-center items-center w-full '
                        >
                          <FcFullTrash size={28} />
                          <span className='text-[8px] '>hapus</span>
                        </Button>
                      </div>
                    </div>
                  )}
                />
              </div>
            ))} */}
          {/* {modalType === 'edit' &&
            fields.map(({ imgId, ...rest }, index) => (
              <div key={imgId}>
                <Controller
                  control={control}
                  name={`img.${index}`}
                  render={() => (
                    <div className=' text-center grid grid-cols-12 '>
                      <div className='flex flex-row w-full items-center gap-4 pb-2  col-span-10 bg-emerald-400'>
                        {Object.values(rest).join('') && (
                          <Avatar className='rounded-none w-auto h-10 flex flex-row gap-2 items-center'>
                            <span> </span>
                            <AvatarImage
                              src={Object.values(rest).join('')}
                              alt='post image'
                              className='rounded-lg'
                            />
                            <AvatarFallback>
                              {field.file?.name &&
                                trimFilename(field.file.name, 7)}
                              <pre>{JSON.stringify(rest, null, 2)}</pre>
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <pre>{JSON.stringify(index, null, 2)}</pre>
                        <span>
                          {field.file?.name &&
                            trimFilename(field.file?.name, 10)}
                          img.{index}
                        </span>
                      </div>

                      <div className='col-span-2 bg-slate-300 w-full'>
                        <Button
                          variant='ghost'
                          size='sm'
                          aria-label='Remove'
                          onClick={() => remove(index)}
                          className='flex flex-col justify-center items-center w-full '
                        >
                          <FcFullTrash size={28} />
                          <span className='text-[8px] '>hapus</span>
                        </Button>
                      </div>
                    </div>
                  )}
                />
              </div>
            ))} */}
        </div>
        {modalType === 'post' && (
          <Button
            variant='ghost'
            size='sm'
            type='button'
            onClick={onAddImages}
            className='bg-sky-50 border border-sky-200 border-solid rounded-full w-6 h-6'
          >
            <MdOutlineAddPhotoAlternate />
          </Button>
        )}
      </div>
    </>
  );
};

export default Images;
