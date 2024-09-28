'use client';

import {
  deleteSliderImage,
  editSliderImage,
  getAllSliders,
} from '@/actions/slider-actions';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardHeader,
  Heading,
  InputCustom,
  Spinner,
} from '@/components/ui';
import useFormTypes from '@/hooks/use-form-types';
import { cn, handleFormServerErrors } from '@/lib/utils';
import { sliderSchema, SliderSchema } from '@/schemas/slider-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';

import { ImagePlus, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io';

type SliderEditDeleteFormProps = {};

type Sliders = {
  id: string;
  images: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

type SlidersResponse = {
  status: 'success' | 'error';
  data?: Sliders[]; // Optional for success
  error?: string; // Optional for error
};

const SliderEditDeleteForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    formType,
    setOn,
    setOff,
    img,
    id: imgId,
    setImg,
  } = useFormTypes((state) => ({
    formType: state.formType,
    setOn: state.setOn,
    setOff: state.setOff,
    img: state.img,
    id: state.id,
    setImg: state.setImg,
  }));

  const {
    control,
    register,
    handleSubmit,
    setError,
    getValues,
    watch,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<SliderSchema>({
    resolver: zodResolver(sliderSchema),
    mode: 'onTouched',
  });

  const username = session?.user?.name || 'Unknown';

  useEffect(() => {
    if (img) {
      setPreview(img.images);
      setValue('img', img.images);
    }
  }, [img, setValue, setPreview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setPreview(event.target.result as string);
          setValue('img', file); // Assumes your SliderSchema allows for an 'img' field of file type
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: SliderSchema) => {
    if (formType === 'delete-slider' && img?.id) {
      setIsLoading(true);
      try {
        const res = await deleteSliderImage(img?.id);
        if (res?.status === 'success') {
          router.refresh();
          toast.success('Slider image deleted successfully');
          reset();
          setOff();
        } else if (res?.error) {
          handleFormServerErrors(res, setError);
        }
      } catch (err) {
        console.error(err);
        toast.error('An error occurred while deleting the slider image');
      } finally {
        setIsLoading(false);
      }
    }

    if (formType === 'edit-slider' && img?.id) {
      setIsLoading(true);
      const formData = new FormData();

      if (data.img) formData.append('img', data.img);

      try {
        const res = await editSliderImage(img?.id, formData);
        if (res.status === 'success' && res.data) {
          router.refresh();
          toast.success('Slider successfully updated');
          setImg('edit-slider', res.data);
          reset();
          setOff();
        } else if (res.error) {
          handleFormServerErrors(res, setError);
        }
      } catch (err) {
        console.error(err);
        toast.error('An error occurred while updating the slider');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    setOff();
  };

  const {
    data,
    isError,
    error,
    isLoading: loading,
  } = useQuery<SlidersResponse>({
    queryKey: ['sliders'],
    queryFn: async () => {
      const response = (await getAllSliders()) as SlidersResponse;
      if (response.status === 'success') {
        return {
          status: 'success',
          data: response?.data,
        };
      } else {
        return response; // Pass the error response directly
      }
    },
    staleTime: 2000,
  });

  if (!data) return <div />;

  if (isError) return <div>Something Fuck up!</div>;

  if (loading) return <h3>Loading...</h3>;
  return (
    <Card className='relative'>
      <CardHeader>
        <Heading
          title={
            formType === 'add-slider'
              ? 'Slider'
              : formType === 'delete-slider'
              ? 'Delete Slider?'
              : 'Edit Slider'
          }
          description={cn(
            formType === 'delete-slider'
              ? 'Are you sure to delete this image? this action can not be undone'
              : preview.startsWith('http')
              ? 'Please choose image that u want to replace'
              : 'New Image:'
          )}
          className='text-zinc-500 text-center'
        />
      </CardHeader>
      <Button
        size='icon'
        variant='ghost'
        onClick={handleClose}
        type='button'
        className='p-1 border-0 h-6 w-6  bg-white text-stone-400 hover:opacity-80 hover:border hover:bg-rose-600/20 hover:border-solid hover:border-red-300 shadow-lg rounded-full transition absolute left-4 top-4'>
        <X size={18} className={cn('w-6 h-6 svg')} />
      </Button>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-2 items-center'>
          <div className={cn(formType === 'delete-slider' ? 'hidden' : '')}>
            <Controller
              control={control}
              name='img'
              render={({ field }) => (
                <InputCustom
                  type='file'
                  className='h-12'
                  onChange={handleFileChange}
                  isInvalid={!!errors.img}
                  errorMessage={errors.img?.message as string}
                  ref={fileInputRef}
                />
              )}
            />
          </div>
          <Avatar className='rounded-none'>
            <AvatarImage
              src={preview}
              className='object-cover'
              alt='Preview Image'
            />
            <AvatarFallback>
              {username.length > 0 ? username.substring(0, 3) : 'N/A'}
            </AvatarFallback>
          </Avatar>

          <Button
            variant='ghost'
            size='sm'
            type='submit'
            disabled={isSubmitting}
            className='group text-xs flex flex-row gap-2 bg-blue-500 hover:!bg-blue-500/70 px-2 mb-2'>
            {isSubmitting ? (
              <div className='flex gap-2 items-center justify-center'>
                <Spinner size={16} color='gray-200' /> Submitting...
              </div>
            ) : (
              <span className='flex gap-2 items-center'>
                <ImagePlus
                  size={24}
                  className='svg text-white group-hover:text-black'
                />
                <span className='text-xs text-white font-semibold text-shadow group-hover:text-black'>
                  {formType === 'add-slider'
                    ? 'Add Slider'
                    : formType === 'delete-slider'
                    ? 'Delete Slider'
                    : 'Update Slider'}
                </span>
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SliderEditDeleteForm;
