// 'use client';

// import Images from '@/components/candidate-form/images';
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   HeadingLogo,
//   Spinner,
// } from '@/components/ui';
// import { cn } from '@/lib/utils';

// import { sliderSchema, SliderSchema } from '@/schemas/slider-schema';
// import useSlidersStore from '@/store/use-sliders-store';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Slider } from '@prisma/client';

// import { CalendarCog, ImagePlus } from 'lucide-react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useRef, useState } from 'react';

// import { useForm } from 'react-hook-form';

// export type SliderFormProps = {
//   images: {
//     id: string;
//     images: string;
//     userId: string;
//     createdAt: Date;
//     updatedAt: Date;
//   }[];
// };

// const SliderForm = ({ images }: SliderFormProps) => {
//   const [preview, setPreview] = useState<string>('');
//   const { data: session } = useSession();
//   const {
//     register,
//     control,
//     watch,
//     handleSubmit,
//     getValues,
//     setValue,
//     setError,
//     formState: { errors, isValid, isSubmitting, isDirty, isLoading },
//   } = useForm<SliderSchema>({
//     resolver: zodResolver(sliderSchema),
//     mode: 'onTouched',
//   });

//   const { img, setImg } = useSlidersStore();

//   const user = session?.user.curUser;

//   const { ref: registerRef, ...rest } = register('img');
//   const hiddenInputRef = useRef<HTMLInputElement | null>(null);
//   const router = useRouter();
//   const username = session?.user.name;
//   const userId = session?.user.id;
//   const role = session?.user.role;

//   useEffect(() => {
//     if (Array.isArray(images) && images.length > 0) {
//       setImg(images);
//     } else {
//       setImg([]);
//     }
//   }, [images, setImg]);

//   const handleUploadedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // if (hiddenInputRef.current && e.target.files) {
//     //   const file = e.target.files[0];
//     //   const urlImage = URL.createObjectURL(file) as string;

//     //   setPreview(urlImage);
//     // }
//     if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
//       e.preventDefault();
//       e.stopPropagation();
//       const files = e.target.files;
//       if (files && files.length > 0) {
//         const file = files[0];
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           if (e.target && e.target.result) {
//             const imageURL = e.target.result as string;
//             setPreview(imageURL);
//             if (setValue) setValue('img', file);
//           }
//         };
//         reader.readAsDataURL(file);
//       }
//     }
//   };

//   const onUpload = () => {
//     if (hiddenInputRef.current) {
//       hiddenInputRef.current.click();
//     }
//   };

//   const onSubmit = async (data: SliderSchema) => {
//     console.log(data);
//   };

//   // const uploadButtonLabel =
//   //   preview === item.image ? 'Upload image' : 'Change image';

//   return (
//     <Card>
//       <CardHeader>
//         <HeadingLogo
//           title='Slider'
//           subtitle='Setting Slider '
//           center
//           className='text-zinc-500'
//         />
//       </CardHeader>
//       <CardContent>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className='flex flex-col gap-2 items-center'>
//           <input
//             type='file'
//             {...rest}
//             onChange={handleUploadedFile}
//             ref={(e) => {
//               registerRef(e);
//               hiddenInputRef.current = e;
//             }}
//             className='hidden '
//           />
//           <Avatar>
//             <AvatarImage src={preview} className='object-cover' alt='@shadcn' />
//             <AvatarFallback>{username.substring(0, 3)} </AvatarFallback>
//           </Avatar>
//           <div className='text-xs left-0 text-left '>
//             <div
//               className={cn(
//                 'flex flex-row text-nowrap px-4 w-full rounded-sm text-white font-semibold text-shadow',
//                 role === 'user' ? 'bg-emerald-300 ' : 'bg-yellow-500'
//               )}>
//               {' '}
//               Status: {role}
//             </div>
//           </div>
//           {/* {modalType === 'editProfile' && ( */}
//           <Button
//             variant='ghost'
//             size='sm'
//             // type={preview === item.image ? 'button' : 'submit'}
//             // onClick={preview === item.image ? onUpload : () => []}
//             className='group text-xs flex flex-row gap-2 bg-blue-500 hover:!bg-blue-500/70 px-2 mb-2'>
//             {isSubmitting ? (
//               <div className='flex gap-2 items-center justify-center'>
//                 <Spinner size={16} color='gray-200' /> Submitting...
//               </div>
//             ) : (
//               <span className='flex gap-2 items-center'>
//                 <ImagePlus
//                   size={24}
//                   className='svg text-white group-hover:text-black '
//                 />
//                 <span className=' text-xs text-white font-semibold text-shadow group-hover:text-black'>
//                   {/* {uploadButtonLabel} */}
//                 </span>
//               </span>
//             )}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default SliderForm;

'use client';

import React, { useEffect, useState } from 'react';

import { addSlider } from '@/actions/slider-actions';
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
} from '@/components/shadcn/ui';
import useFormTypes from '@/hooks/use-form-types';
import { handleFormServerErrors } from '@/lib/utils';
import { SliderSchema, sliderSchema } from '@/schemas/slider-schema';
import { useImageStore } from '@/store/use-image-store';
import useSlidersStore from '@/store/use-sliders-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io';

const SliderForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const { data: session } = useSession();
  const router = useRouter();
  const { images, setImages } = useImageStore((state) => ({
    images: state.images,
    setImages: state.setImages,
  }));

  const {
    formType,
    setOn,
    setOff,
    img,
    id: imgId,
  } = useFormTypes((state) => ({
    formType: state.formType,
    setOn: state.setOn,
    setOff: state.setOff,
    img: state.img,
    id: state.id,
  }));

  useEffect(() => {
    if (formType === 'edit-slider' && img) {
      const image = img.images;
      setImages(image);
    }
  }, [img, formType, setImages]);

  const {
    control,
    register,
    handleSubmit,
    setError,
    getValues,
    watch,
    reset,
    setValue,
    formState: { isSubmitting, errors, isValid },
  } = useForm<SliderSchema>({
    resolver: zodResolver(sliderSchema),
    mode: 'onTouched',
  });

  // const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const username = session?.user?.name || 'Unknown';
  const role = session?.user?.role || 'guest';

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

  // const triggerFileSelect = () => {
  //   hiddenFileInput.current?.click();
  // };

  const onSubmit = async (data: SliderSchema) => {
    setIsLoading(true);
    const formData = new FormData();
    if (data) {
      formData.append('img', data.img);
    }

    if (formType === 'add-slider') {
      try {
        const res = await addSlider(formData);
        if (res?.status === 'success') {
          router.refresh();
          toast.success('slider successfully added');
          reset();
          setOff();
        } else if (res.error) {
          handleFormServerErrors(res, setError);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    console.log('handle close');
    setOff();
  };

  return (
    <Card className='relative'>
      <CardHeader>
        <Heading
          title={
            formType === 'add-slider'
              ? 'Slider'
              : formType === 'delete-slider'
                ? 'Delete Slider'
                : 'Edit Slider'
          }
          className='text-zinc-500 text-center'
        />
      </CardHeader>
      <Button
        size='icon'
        variant='ghost'
        onClick={handleClose}
        type='button'
        className='p-1 border-0 h-6 w-6  bg-white text-stone-400 hover:opacity-80 hover:border hover:bg-rose-600/20 hover:border-solid hover:border-red-300 shadow-lg rounded-full transition absolute left-4 top-4 '
      >
        <IoMdClose size={18} className='w-6 h-6 ' />
      </Button>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-2 items-center'
        >
          <div>
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
                />
              )}
            />
          </div>
          <Avatar className='rounded-none w-auto h-20 shadow-md '>
            <AvatarImage
              src={preview}
              className='w-auto h-18 object-cover rounded-lg aspect-auto'
              alt='Preview Image'
            />
            <AvatarFallback className='text-stone-400 text-xs bg-slate-100 px-2 py-1'>
              slider img
            </AvatarFallback>
          </Avatar>

          <Button
            variant='ghost'
            size='sm'
            type='submit'
            disabled={isSubmitting || !preview}
            className='group text-xs flex flex-row gap-2 bg-blue-500 hover:!bg-blue-500/70 px-2 mb-2'
          >
            {isSubmitting || isLoading ? (
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
                  Add slider Image
                </span>
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SliderForm;
