'use client';

import axios from 'axios';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './modal';
import Heading from '../heading';
import Input from '../ui/input';
import toast from 'react-hot-toast';

import { useRouter } from 'next/navigation';
import useModal from '@/hooks/use-modal';

type TopicModalProps = {};

const TopicModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { modalType, isOpen, onOpen, onClose } = useModal();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      slug: '',
      description: '',
    },
  });

  const slug = watch('slug');
  const description = watch('description');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    data = {
      slug,
      description,
    };

    axios
      .post(`/api/topics`, data)
      .then(() => {
        toast.success('successfully created Topic');
        router.refresh();
        reset();
        onClose();
      })
      .catch((err) => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false));
  };

  const handleCloseClearForm = () => {
    onClose();
    setValue('slug', '');
    setValue('description', '');

    reset();
  };

  const bodyContent = (
    <div className='flex flex-col gap-1 '>
      <Heading title='New Topic' subtitle='Topic' />
      <Input
        id='slug'
        type='text'
        label='topic'
        // disabled={isLoading}
        disabled
        register={register}
        errors={errors}
        required
      />
      {errors.slug && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}

      <Input
        as='textarea'
        cols={10}
        rows={10}
        id='description'
        label='description'
        // disabled={isLoading}
        disabled
        register={register}
        errors={errors}
        required
      />
      {errors.description && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen && modalType === 'topic'}
      onClose={handleCloseClearForm}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel='Create New Topic'
      // disabled={isLoading}
      disabled
      body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default TopicModal;
