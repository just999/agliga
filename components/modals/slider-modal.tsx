'use client';

import { useEffect, useState } from 'react';

import useModal from '@/hooks/use-modal';
import ClientOnly from '@/lib/client-only';
import { useImageStore } from '@/store/use-image-store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Images from '../candidate-form/images';
import { HeadingLogo } from '../shadcn/ui';
import Modal from './modal';

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

  const router = useRouter();
  const { images, setImages } = useImageStore();
  const {
    modalType,
    isOpen,
    onOpen,
    setImg,
    onClose,
    img,
    id: imgId,
  } = useModal();

  useEffect(() => {
    if (modalType === 'edit-slider' && img) {
      const image = img.images;
      setImages(image);
    }
  }, [img, modalType, setImages]);

  // const id = params.id?.toString();
  const id = img?.id;

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

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
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
    } else if (modalType === 'delete-slider') {
      try {
        axios
          .delete(`/api/sliders/${id}`)
          .then(() => {
            toast.success('Slider successfully deleted');
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
    // setImages('');
    onClose();
    // reset();
  };

  const bodyContent = (
    <div className='flex flex-col gap-1 '>
      <HeadingLogo
        title={modalType === 'add-slider' ? 'New Slider' : 'Edit Slider'}
        subtitle='Slider Image'
      />
      <Images
        control={control}
        register={register}
        watch={watch}
        setValue={setValue}
        required
      />
      <span>{imgId}</span>
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
    <ClientOnly>
      <Modal
        isOpen={
          isOpen && (modalType === 'add-slider' || modalType === 'edit-slider')
        }
        // onClose={handleCloseClearForm}
        onClose={handleCloseClearForm}
        title={modalType === 'add-slider' ? 'Add-Image' : 'Edit-Image'}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel='Submit'
        disabled={isLoading}
        body={bodyContent}
        // footer={footerContent}
      />
    </ClientOnly>
  );
};

export default SliderModal;
