'use client';

import axios from 'axios';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './modal';
import Heading from '../heading';
import Input from '../ui/input';
import toast from 'react-hot-toast';

import { useParams, useRouter } from 'next/navigation';
import useModal from '@/hooks/use-modal';
import Images from '../candidate-form/images';
import { InitialPostProps } from '@/types';
import { useSliderImages } from '@/hooks/use-get-slider-images';
import image from 'next/image';
import { control } from 'leaflet';
import { id } from 'date-fns/locale';

type SliderModalProps = {};
export const initialFormState = {
  title: '',
  img: '',
  category: '',
  author: '',
  brief: '',
};

const SliderModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const params = useParams();
  const router = useRouter();
  const { images, setImages } = useSliderImages();
  const { modalType, isOpen, onOpen, onClose } = useModal();

  // const id = params.id?.toString();

  let initialSliderImage;
  if (modalType === 'add-slider') {
    initialSliderImage = {
      images: '',
    };
  }
  if (modalType === 'edit-slider') {
    initialSliderImage = {
      images: images,
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
    defaultValues: initialSliderImage,
  });

  // const setCustomValue = (id: string, value: any) => {
  //   setValue(id, value, {
  //     shouldDirty: true,
  //     shouldTouch: true,
  //     shouldValidate: true,
  //   });
  // };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log('🚀 ~ SliderModal ~ data:', data);
    setIsLoading(true);
    const formData = new FormData();
    if (data.img) {
      formData.append('images', data.img);
    }

    if (modalType === 'add-slider') {
      try {
        axios
          .post(`/api/sliders`, formData, {
            headers: {
              'Content-Type': 'multiPart/form-data',
            },
          })
          .then(() => {
            toast.success('successfully add image slider');
            router.refresh();
            reset();
            onClose();
          })
          .catch((err) => toast.error('Something went wrong!'))
          .finally(() => setIsLoading(false));
      } catch (err) {
        console.error(err);
      }
    } else if (modalType === 'edit-slider') {
      try {
        axios
          .put(`/api/sliders/${id}`, formData, {
            headers: {
              'Content-Type': 'multiPart/form-data',
            },
          })
          .then(() => {
            toast.success('Slider successfully edited');
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
    onClose();
    setValue('slug', '');
    setValue('description', '');

    reset();
  };

  const bodyContent = (
    <div className='flex flex-col gap-1 '>
      <Heading
        title={modalType === 'add-slider' ? 'New Slider' : 'Edit Slider'}
        subtitle='Slider'
      />
      <Images
        control={control}
        register={register}
        watch={watch}
        setValue={setValue}
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
      isOpen={
        isOpen && (modalType === 'add-slider' || modalType === 'edit-slider')
      }
      onClose={handleCloseClearForm}
      title={modalType === 'add-slider' ? 'Add-Image' : 'Edit-Image'}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel='Submit'
      disabled={isLoading}
      body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default SliderModal;
