'use client';

import { useParams } from 'next/navigation';
import Modal from './modal';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Heading from '../heading';
import Input from '../ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import axios from 'axios';
import toast from 'react-hot-toast';
import { useGetPost } from '@/hooks/use-get-post';

import useModal from '@/hooks/use-modal';

import useTopics from '@/hooks/use-topics';
import SelectInput from '../select-input';

import { IconType } from 'react-icons';
import { InitialPostProps, PostProps } from '@/types';
import { Label } from '../ui/label';

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

  const [images, setImages] = useState([]);
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
  const {
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

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
          .post('/api/posts', data)
          .then(() => {
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
        const res = axios
          .put(`/api/posts/${id}`, data)
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
    onClose();
    setText(initialFormState);

    reset();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) {
      return; // Handle no files selected case (optional)
    }

    const updatedImages: File[] = [...images];

    const Files = files as FileList;

    for (const file of Files) {
      updatedImages.push(file);
    }

    setImages((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const bodyContent = (
    <div className='flex flex-col gap-1'>
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

      <div className='mb-4 '>
        <Label htmlFor='img' className='block text-gray-700 font-bold mb-2 '>
          Images (select up to 4 images)
        </Label>

        <Input
          type='file'
          id='img'
          label=''
          multiple
          accept='image/*'
          disabled={isLoading}
          register={register}
          errors={errors}
          value={watch('img')}
          className='border rounded w-full py-2 px-3 '
        />
        {errors.img && (
          <span className='text-sm text-red-500 '>
            <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
              Kolom Wajib di isi...
            </span>
          </span>
        )}
      </div>

      <SelectInput
        label='Category'
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
        cols={30}
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
