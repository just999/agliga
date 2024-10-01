'use client';

import { useParams, useRouter } from 'next/navigation';
import Modal from './modal';

import { useEffect, useState } from 'react';

import Input from '../ui/input';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import axios from 'axios';
import toast from 'react-hot-toast';
import { useGetPost } from '@/hooks/use-get-post';

import useModal from '@/hooks/use-modal';

import { useTopics } from '@/hooks/use-topics';
import SelectInput from '../ui/select-input';

import { IconType } from 'react-icons';
import { InitialPostProps } from '@/types/types';

import Images from '../candidate-form/images';

import usePostsStore from '@/store/use-posts-store';
import { HeadingLogo } from '../ui';

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
    setText(initialFormState);
    // setItem(postItems);
    reset();
    onClose();
    // clear();
  };

  const clear = () => {
    setText({ title: '', img: '', category: '', author: '', brief: '' });
  };

  const bodyContent = (
    <div className='flex flex-col justify-center gap-1'>
      <HeadingLogo
        title={modalType === 'post' ? 'New Post' : 'Edit Post'}
        subtitle={
          modalType === 'post' ? 'Lets create Post' : 'Update your Post'
        }
      />
      <Input
        id='title'
        type='text'
        label={title ? '' : 'Title'}
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
        label={category ? '' : 'category'}
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
        label={author ? '' : 'Author'}
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
        label={brief ? '' : 'Description'}
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
