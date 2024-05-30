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
import Images from '../candidate-form/images';
import { InitialPostProps } from '@/types';

type SliderModalProps = {};
export const initialFormState = {
  title: '',
  img: '',
  category: '',
  author: '',
  brief: '',
};

const SliderModal = () => {
  const [text, setText] = useState<InitialPostProps>(initialFormState);
  const [slider, setSlider] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { modalType, isOpen, onOpen, onClose } = useModal();
  const {
    control,
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
      <Heading title='New Slider' subtitle='Slider' />
      <Images
        control={control}
        register={register}
        setText={(data) => setSlider(data)}
        text={text}
        slider={slider}
        setSlider={() => setSlider}
        watch={watch}
        required
      />
      {errors.slug && (
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
      isOpen={isOpen && modalType === 'slider'}
      onClose={handleCloseClearForm}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel='Create New Topic'
      disabled={isLoading}
      body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default SliderModal;
