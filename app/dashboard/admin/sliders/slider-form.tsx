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

import React, { useEffect, useState, useRef } from 'react';
import useSlidersStore from '@/store/use-sliders-store';

import {
  Card,
  CardHeader,
  HeadingLogo,
  CardContent,
  Spinner,
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { SliderSchema, sliderSchema } from '@/schemas/slider-schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { ImagePlus } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export type SliderFormProps = {
  id: string;
  images: string; // This string represents a single image URL or path
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

const SliderForm = ({ images }: { images: SliderFormProps[] }) => {
  const [preview, setPreview] = useState<string>('');
  const { data: session } = useSession();

  // Retrieve setImg from the zustand store (useSlidersStore)
  const { img, setImg } = useSlidersStore((state) => ({
    img: state.img,
    setImg: state.setImg,
  }));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<SliderSchema>({
    resolver: zodResolver(sliderSchema),
    mode: 'onTouched',
  });

  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const username = session?.user.name;
  const role = session?.user.role;

  const { ref: registerRef, ...rest } = register('img');

  // UseEffect to set images into the state
  useEffect(() => {
    if (Array.isArray(images) && images.length > 0) {
      setImg(images);
    } else {
      setImg([]);
    }
  }, [images, setImg]);
  const handleUploadedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            const imageURL = e.target.result as string;
            setPreview(imageURL);
            setValue('img', file);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const onUpload = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  };

  const onSubmit = async (data: SliderSchema) => {
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <HeadingLogo
          title='Slider'
          subtitle='Setting Slider '
          center
          className='text-zinc-500'
        />
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-2 items-center'>
          <input
            type='file'
            {...register('img')}
            onChange={handleUploadedFile}
            ref={(e) => {
              registerRef(e);
              hiddenInputRef.current = e;
            }}
            // className='hidden'
          />
          <Avatar className='rounded-none '>
            <AvatarImage src={preview} className='object-cover' alt='@shadcn' />
            {username && (
              <AvatarFallback>{username.substring(0, 3)}</AvatarFallback>
            )}
          </Avatar>
          <div className='text-xs left-0 text-left '>
            <div
              className={cn(
                'flex flex-row text-nowrap px-4 w-full rounded-sm text-white font-semibold text-shadow',
                role === 'user' ? 'bg-emerald-300 ' : 'bg-yellow-500'
              )}>
              Status: {role}
            </div>
          </div>
          <Button
            variant='ghost'
            size='sm'
            className='group text-xs flex flex-row gap-2 bg-blue-500 hover:!bg-blue-500/70 px-2 mb-2'>
            {isSubmitting ? (
              <div className='flex gap-2 items-center justify-center'>
                <Spinner size={16} color='gray-200' /> Submitting...
              </div>
            ) : (
              <span className='flex gap-2 items-center'>
                <ImagePlus
                  size={24}
                  className='svg text-white group-hover:text-black '
                />
                <span className='text-xs text-white font-semibold text-shadow group-hover:text-black'>
                  Upload or Change Image
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
