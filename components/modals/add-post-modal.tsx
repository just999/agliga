'use client';

import Modal from './modal';
import useModal from '@/hooks/use-modal';

import { FieldValues, useForm } from 'react-hook-form';

import { useSportCategories, useTopics } from '@/hooks/use-topics';
import { Button } from '../ui/button';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { CategoryProps, InitialPostProps, ValueIconProps } from '@/types/types';
import { initialFormState } from './post-modal';

import { useParams } from 'next/navigation';
import { useGetPost } from '@/hooks/use-get-post';

import SelectInput from '../ui/select-input';
import Input from '../ui/input';
import { HeadingLogo } from '../ui';

type AddPostModalProps = {};

const AddPostModal = () => {
  const [text, setText] = useState<InitialPostProps>(initialFormState);
  const params = useParams();

  const id = params.id?.toString();

  const { modalType, isOpen, onClose } = useModal();
  const { getTopics } = useTopics();
  const { getSportCategories } = useSportCategories();

  const { item, error } = useGetPost(id ? id : undefined);
  let initialPost;
  if (modalType === 'post') {
    initialPost = {
      title: '',
      img: '',
      category: '',
      author: '',
      brief: '',
    };
  } else if (modalType === 'edit') {
    initialPost = {
      title: text.title,
      img: text.img,
      category: text.category,
      author: text.author,
      brief: text.brief,
    };
  }

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: initialPost,
  });

  const topics = getSportCategories();

  const topicOptions = useMemo(
    () =>
      topics.map((topic) => ({
        value: topic.value,
        icon: topic.icon,
      })),
    [topics]
  );
  // const cat: CategoryProps[] = topics.filter(
  //   (to) => to.value === item.category
  // ) || {
  //   icon: '',
  //   value: '',
  // };

  useEffect(() => {
    if (modalType === 'edit' && item && !error) {
      const cat: CategoryProps[] = topics.filter(
        (to) => to.value === item.category
      ) || {
        icon: '',
        value: '',
      };

      const data = {
        title: item.title,
        img: item.img,
        category: cat[0].value,
        author: item.author,
        brief: item.brief,
      };
      setText(data);

      setValue('title', item.title);
      setValue('img', item.img);
      setValue('category', cat[0]);
      setValue('author', item.author);
      setValue('brief', item.brief);
    }
  }, [
    error,
    item,
    item.brief,
    item.category,
    item.author,
    item.img,
    item.title,
    modalType,
    setValue,
    topics,
  ]);

  const title = watch('title');
  const img = watch('img');
  const category = watch('category');
  const author = watch('author');
  const brief = watch('brief');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  // const handleChange = <
  //   T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  // >(
  //   e: React.ChangeEvent<T>
  // ): void => {
  //   const { name, value } = e.target;

  //   if (e.target instanceof HTMLInputElement && e.target.type === 'text') {
  //     if (name.includes('.')) {
  //       const [outerKey, innerKey] = name.split('.');
  //       setText((prev: any) => ({
  //         ...prev,
  //         [outerKey]: {
  //           ...prev[outerKey],
  //           [innerKey]: value,
  //         },
  //       }));
  //     }
  //     setText((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   } else if (e.target instanceof HTMLSelectElement) {
  //     setText((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   } else if (
  //     e.target instanceof HTMLTextAreaElement &&
  //     e.target.type === 'textarea'
  //   ) {
  //     setText((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   } else if (
  //     e.target instanceof HTMLInputElement &&
  //     e.target.type === 'file'
  //   ) {
  //     const { files } = e.target;
  //     if (!files || !files.length || !text.img) return;

  //     let allSelectedFiles: File[] = [];
  //     let filesForUpload: File[] = [];

  //     const MAX = 4;

  //     allSelectedFiles = [...allSelectedFiles, ...files];
  //     let filenames = new Set();
  //     filesForUpload = allSelectedFiles.filter((f) => {
  //       let existingFiles = filenames.has(f.name);
  //       filenames.add(f.name);
  //       return !existingFiles;
  //     });

  //     filesForUpload = filesForUpload.slice(0, MAX);
  //     // let updatedImages: string[] = [];
  //     const filesArray = Array.from(filesForUpload);

  //     if (!text.img) return;

  //     if (files.length > MAX) {
  //       toast.error('You can only select up to ${MAX} files.');
  //       return;
  //     }
  //     const updatedImages = [...text.img];
  //     // const filesArray = Array.from(files);

  //     for (let i = 0; i < filesArray.length; i++) {
  //       const file = filesArray[i];
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         if (e.target && e.target.result) {
  //           const imageURL = e.target.result as string;
  //           updatedImages.push(imageURL);
  //           setText((prev) => ({
  //             ...prev,
  //             img: updatedImages,
  //           }));
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // };

  const handleCloseClearForm = () => {
    onClose();
    setText(initialFormState);
  };

  // const removeImagePrev = (img: string) => {
  //   if (!text.img) throw new Error('error');

  //   const filteredImages = text.img.filter((image) => image !== img);
  //   setText((prev) => ({
  //     ...prev,
  //     img: filteredImages,
  //   }));
  // };

  // const clear = () => {
  //   if (imgRef.current) {
  //     imgRef.current.value = '';
  //   }
  //   setText((prev) => ({
  //     ...prev,
  //     img: [],
  //   }));
  // };

  const bodyContent = (
    <form
      action={modalType === 'post' ? `/api/posts` : `/api/posts/${id}`}
      method={modalType === 'post' ? `POST` : 'PUT'}
      encType='multipart/form-data'>
      <div className='flex flex-col justify-center gap-1'>
        <HeadingLogo
          title={modalType === 'post' ? 'New Post' : 'Edit Post'}
          subtitle={modalType === 'post' ? 'Create Post' : 'Update your Post'}
        />

        <Input
          id='title'
          // name='title'
          type='text'
          label='title'
          register={register}
          // {...register('title', { onChange: handleChange })}
          placeholder=''
          errors={errors}
          defaultValue={text.title}
          // handleChange={handleChange}
          required
        />
        {errors.title && (
          <span className='text-sm text-red-500 '>
            <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
              Kolom title Wajib di isi...
            </span>
          </span>
        )}
        {/* <Images
          control={control}
          register={register}
          setText={(data) => setText(data)}
          text={text}
        /> */}

        {/* <select
          id='category'
          name='category'
          defaultValue={text.category}
          onChange={handleChange}
          className='peer w-full   font-light bg-stone-100 border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed'
        >
          <option value='' disabled className='text-sm '>
            -- Select property type --
          </option>
          {topics.map(({ value, icon: Icon }, i) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select> */}

        <SelectInput
          label='Category'
          isMulti={false}
          id='category'
          register={register}
          required
          value={watch('category')}
          onChange={(value) => setCustomValue('category', value)}
          // placeholder='Categories'
          options={() => topicOptions}
          errors={errors}
        />

        <Input
          id='author'
          type='text'
          // name='author'
          label='Author'
          // {...register('author', { onChange: handleChange })}
          placeholder=''
          register={register}
          errors={errors}
          defaultValue={text.author || ''}
          // handleChange={handleChange}
          required
        />
        {errors.author && (
          <span className='text-sm text-red-500 '>
            <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
              Kolom author Wajib di isi...
            </span>
          </span>
        )}

        <Input
          label='Description'
          // name='brief'
          // {...register('brief', { onChange: handleChange })}
          as='textarea'
          register={register}
          errors={errors}
          id='brief'
          rows={4}
          cols={20}
          defaultValue={text.brief || ''}
          placeholder=''
          className='border rounded w-full py-2 px-3 mb-2'
          // handleChange={handleChange}
          required
        />
        {errors.brief && (
          <span className='text-sm text-red-500 '>
            <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
              Kolom description Wajib di isi...
            </span>
          </span>
        )}

        <div>
          <Button
            variant='primary'
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
            type='submit'>
            Add Post
          </Button>
        </div>
      </div>
    </form>
  );

  return (
    <Modal
      isOpen={isOpen && (modalType === 'edit' || modalType === 'post')}
      onClose={handleCloseClearForm}
      // onSubmit={handleSubmit(onSubmit)}
      title={modalType === 'post' ? 'Add-Post' : 'Edit-Post'}
      actionLabel='Continue'
      disabled={false}
      body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default AddPostModal;
