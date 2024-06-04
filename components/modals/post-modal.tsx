'use client';

import { useParams, useRouter } from 'next/navigation';
import Modal from './modal';

import { useEffect, useRef, useState } from 'react';
import Heading from '../heading';
import Input from '../ui/input';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';

import axios from 'axios';
import toast from 'react-hot-toast';
import { useGetPost } from '@/hooks/use-get-post';

import useModal from '@/hooks/use-modal';

import useTopics from '@/hooks/use-topics';
import SelectInput from '../select-input';

import { IconType } from 'react-icons';
import { InitialPostProps } from '@/types';

import { Button } from '../ui/button';

import { useImageStore } from '@/store/use-image-store';
import { FcFullTrash } from 'react-icons/fc';
import { cn, trimFilename } from '@/lib/utils';

import { PlusIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Label } from '../ui/label';
import Images from '../candidate-form/images';
import ImagePreview from '../image-preview';
import usePostsStore from '@/store/use-posts-store';

type ImageChangeHandler = (files: FileList) => void;

type SelectInputValue = {
  icon?: IconType | string; // Now icon is optional
  value: string;
};

const catInit = {
  value: '',
  icon: '',
};

export const initialFormState = {
  title: '',
  img: '',
  category: '',
  author: '',
  brief: '',
};

const PostModal = () => {
  const [text, setText] = useState<InitialPostProps>(initialFormState);
  const params = useParams();

  const id = params.id?.toString();
  const { getTopics } = useTopics();

  const [isLoading, setIsLoading] = useState(false);

  const { modalType, onOpen, isOpen, onClose } = useModal();
  const router = useRouter();
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

  const { setItem } = usePostsStore();

  useEffect(() => {
    if (item) setItem(item);
  }, [item, setItem]);

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

  const topics = getTopics();
  const topicOptions = topics.map((topic) => ({
    value: topic.value,
    icon: topic.icon,
  }));

  useEffect(() => {
    if (modalType === 'edit' && item && !error) {
      const data = {
        title: item.title,
        img: item.img,
        category: item.category,
        author: item.author,
        brief: item.brief,
      };
      setText(data);

      const cat: any = topics.filter((to) => to.value === item.category) || {
        icon: '',
        value: '',
      };

      setValue('title', item.title);
      setValue('img', text.img);
      setValue('category', cat[0]);
      setValue('author', item.author);
      setValue('brief', item.brief);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // let allSelectedFiles: File[] = [];
  // let filesForUpload: File[] = [];
  // const MAX_FILES_COUNT = 4;
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
  //     const { files } = e.target;
  //     if (!files || !files.length) return;

  //     allSelectedFiles = [...allSelectedFiles, ...files];
  //     let filenames = new Set();
  //     filesForUpload = allSelectedFiles.filter((f) => {
  //       let existingFiles = filenames.has(f.name);
  //       filenames.add(f.name);
  //       return !existingFiles;
  //     });
  //     filesForUpload = filesForUpload.slice(0, MAX_FILES_COUNT);
  //     // let updatedImages: string[] = [];
  //     // const filesArray = Array.from(filesForUpload);

  //     if (!text.img) return;

  //     // const MAX_FILES_COUNT = 4;

  //     if (files.length > MAX_FILES_COUNT) {
  //       toast.error(`You can only select up to ${MAX_FILES_COUNT} files.`);
  //       clear();
  //       return;
  //     }

  //     const updatedImages: string[] = [...text.img];
  //     const filesArray = Array.from(files);
  //     if (filesArray.length > MAX_FILES_COUNT) clear();

  //     for (
  //       let i = 0;
  //       i < filesArray.length && updatedImages.length < MAX_FILES_COUNT;
  //       i++
  //     ) {
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

  //           setImagesPrev((prev: any) => {
  //             return [...prev, imageURL];
  //           });
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // };

  const cat: any = topics.filter((to) => to.value === item.category) || {
    icon: '',
    value: '',
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const formData = new FormData();
    if (text.img) formData.append('img', text.img);
    formData.append('title', data.title);
    formData.append('category', category.value);
    formData.append('author', data.author);
    formData.append('brief', data.brief);

    if (modalType === 'post') {
      data = {
        title,
        img,
        category,
        author,
        brief,
      };
      try {
        axios
          .post('/api/posts', formData, {
            headers: {
              'Content-Type': 'multiPart/form-data',
            },
          })
          .then((res) => {
            toast.success('Post created');
            router.refresh();
            reset();
            onClose();
          })
          .catch((err) => {
            toast.error('Something went wrong', err);
          })
          .finally(() => setIsLoading(false));
      } catch (err) {
        // setText({ ...text, validate: 'error' });
        console.error(err);
      }
    } else if (modalType === 'edit') {
      data = {
        title,
        img,
        category: category.value,
        author,
        brief,
      };
      try {
        axios
          .put(`/api/posts/${id}`, formData, {
            headers: {
              'Content-Type': 'multiPart/form-data',
            },
          })
          .then(() => {
            toast.success('Post successfully edited');
            router.refresh();
            reset();
            onClose();
          })
          .catch((err) => {
            toast.error('Something went wrong', err);
          })
          .finally(() => setIsLoading(false));
      } catch (err) {
        // setText({ ...text, validate: 'error' });
        console.error(err);
      }
    }
  };
  const handleCloseClearForm = () => {
    initialPost = {
      title: '',
      img: '',
      category: '',
      author: '',
      brief: '',
    };
    onClose();
    setText(initialFormState);
    clear();
    reset();
  };

  const clear = () => {
    setText((prev) => ({
      ...prev,
      imagesPrev: '',
    }));
  };

  // console.log('imagesPrev', imagesPrev, text.img);

  // const onAddImages = () => {
  //   if (hiddenFileInput.current) {
  //     hiddenFileInput.current.click();
  //   }
  // };

  // const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (hiddenFileInput.current && e.target.files) {
  //     const uploadedFiles = Array.from(e.target.files);
  //     const files = uploadedFiles.map((file) => ({
  //       file,
  //     }));
  //     append(files);

  //     hiddenFileInput.current.value = '';

  //     let updatedImages = [...imagesPrev];
  //     for (let i = 0; i < uploadedFiles.length; i++) {
  //       const file = uploadedFiles[i];

  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         if (e.target && e.target.result) {
  //           const imageURL = e.target.result as string;
  //           updatedImages.push(imageURL);

  //           setImagesPrev((prev) => ({
  //             ...prev,
  //             imagesPrev: updatedImages,
  //           }));

  //           // setImagesPrev(imagesPrev.concat(imageURL));
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // };

  const bodyContent = (
    <div className='flex flex-col justify-center gap-1'>
      <Heading
        title={modalType === 'post' ? 'New Post' : 'Edit Post'}
        subtitle={
          modalType === 'post' ? 'Lets create Post' : 'Update your Post'
        }
      />
      <Input
        id='title'
        type='text'
        label='Title'
        disabled={isLoading}
        register={register}
        errors={errors}
        defaultValue={text.title}
        required
      />
      {errors.title && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom title Wajib di isi...
          </span>
        </span>
      )}

      <div className='mb-4'>
        {/* <input type='file' multiple {...register('imagePrev')} {...rest} />
        {imagesPrev &&
          imagesPrev.map((img) => (
            <ImagePreview
              key={img}
              image={img}
              images={imagesPrev}
              onRemove={() => console.log(img)}
            />
          ))} */}
        {/* 
        
        <input
          type='file'
          {...rest}
          ref={hiddenFileInput}
          multiple
          {...register}
          onChange={handleAddImages}
        />

        <div>
          <div>
            <Label>Images</Label>

            {fields &&
              fields.map((field: { imgId: string; file?: File }, index) => (
                <div key={field.imgId}>
                  <Controller
                    control={control}
                    name={`img.${index}`}
                    render={() => (
                      <div className=' text-center grid grid-cols-12 '>
                        <div className='flex flex-row w-full items-center gap-4 pb-2  col-span-10 bg-emerald-400'>
                          {field.file?.name ? (
                            <Avatar className='rounded-none w-auto h-10 flex flex-row gap-2 items-center'>
                              <AvatarImage
                                src={
                                  URL.createObjectURL(field.file) ||
                                  '/images/nopic.svg'
                                }
                                alt={field.file?.name}
                                className='rounded-lg'
                              />
                              <AvatarFallback>
                                {field.file?.name &&
                                  trimFilename(field.file.name, 7)}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            ''
                          )}
                          <pre>{JSON.stringify(field.file, null, 2)}</pre>
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
              ))}
          </div>
          <Button
            variant='ghost'
            size='sm'
            type='button'
            onClick={onAddImages}
            className='bg-sky-50 border border-sky-200 border-solid rounded-full w-6 h-6'
          >
            <PlusIcon />
          </Button>
        </div>

 */}
        <Images
          control={control}
          register={register}
          setText={(data) => setText(data)}
          text={text}
          watch={watch}
          clear={clear}
        />
      </div>

      {/* <ProfilePicture register={register} text={text} setText={setText} /> */}

      <SelectInput
        label='category'
        isMulti={false}
        id='category'
        register={register}
        required
        value={watch('category')}
        onChange={(value) => setCustomValue('category', value)}
        placeholder='Categories'
        options={() => topicOptions}
        errors={errors}
      />
      {errors.category && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom category Wajib di isi...
          </span>
        </span>
      )}

      <Input
        id='author'
        type='text'
        label='Author'
        disabled={isLoading}
        register={register}
        errors={errors}
        defaultValue={text.author}
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
        id='brief'
        label='Description'
        disabled={isLoading}
        register={register}
        errors={errors}
        defaultValue={text.brief}
        required
        as='textarea'
        rows={6}
        cols={20}
      />
      {errors.brief && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom description Wajib di isi...
          </span>
        </span>
      )}
    </div>
  );

  return (
    <Modal
      // isOpen={true}
      isOpen={isOpen && (modalType === 'edit' || modalType === 'post')}
      onClose={handleCloseClearForm}
      onSubmit={handleSubmit(onSubmit)}
      title={modalType === 'post' ? 'Add-Post' : 'Edit-Post'}
      actionLabel='Continue'
      disabled={isLoading}
      body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default PostModal;
