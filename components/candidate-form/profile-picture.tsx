'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '../ui/button';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

import useModal from '@/hooks/use-modal';
import { useSession } from 'next-auth/react';

import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useProfileStore from '@/store/use-profile-store';
import { ProfileProps } from '@/types/types';
import { User } from '@prisma/client';
import { cn, handleFormServerErrors } from '@/lib/utils';
import { ImagePlus } from 'lucide-react';
import { updateAvatarSchema, UpdateAvatarSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserAvatar } from '@/actions/user-actions';
import { Spinner } from '../ui';

type ProfilePictureProps = {
  text?: any;
  setText?: () => void;
};

const ProfilePicture = ({ text, setText }: ProfilePictureProps) => {
  const { data: session } = useSession();

  const [preview, setPreview] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<UpdateAvatarSchema>({
    resolver: zodResolver(updateAvatarSchema),
    mode: 'onTouched',
  });

  const user = session?.user.curUser;

  const { ref: registerRef, ...rest } = register('image');
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const username = session?.user.name;
  const userId = session?.user.id;
  const role = session?.user.role;
  // const { modalType, isOpen, onOpen, onClose } = useModal();

  let imgValue: File;
  if (watch) {
    imgValue = watch('image');
  }
  const { item, setItem, setIsPasswordVerified } = useProfileStore((state) => ({
    item: state.item,
    setItem: state.setItem,
    setIsPasswordVerified: state.setIsPasswordVerified,
  }));

  const image = session?.user?.image || '';
  const newProfile = useMemo(() => {
    return {
      name: user?.name || '',
      bank: user?.bank || '',
      accountNumber: user?.accountNumber || '',
      email: user?.email || '',
      game: user?.game || [],
      image: user?.image || '',
      phone: user?.phone || '',
    };
  }, [
    user?.accountNumber,
    user?.bank,
    user?.email,
    user?.game,
    user?.image,
    user?.name,
    user?.phone,
  ]);

  useEffect(() => {
    if (image) {
      setPreview(image);

      setItem(newProfile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, setItem]);

  const handleUploadedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (hiddenInputRef.current && e.target.files) {
    //   const file = e.target.files[0];
    //   const urlImage = URL.createObjectURL(file) as string;

    //   setPreview(urlImage);
    // }
    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      e.preventDefault();
      e.stopPropagation();
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            const imageURL = e.target.result as string;
            setPreview(imageURL);
            if (setValue) setValue('image', file);
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

  // const handleAvatarSubmit = () => {
  //   const formData = new FormData();
  //   formData.append('image', imgValue);
  //   formData.append('userId', user.id);
  //   try {
  //     axios
  //       .put(`/api/profiles/avatar/${user.id}`, formData, {
  //         headers: {
  //           'Content-Type': 'multiPart/form-data',
  //         },
  //       })
  //       .then((res) => {
  //         setIsPasswordVerified(false);
  //         toast.success('Successfully update Avatar');
  //         router.refresh();
  //         onClose();
  //       })
  //       .catch((err) => toast.error('Something went wrong', err));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const onSubmit = async (data: UpdateAvatarSchema) => {
    const formData = new FormData();
    formData.append('image', imgValue);

    const res = (await updateUserAvatar(formData)) as any;

    if (res?.status === 'success') {
      toast.success('avatar successfully updated');
      router.refresh();
    } else {
      handleFormServerErrors(res, setError);
    }
  };

  const uploadButtonLabel =
    preview === item.image ? 'Upload image' : 'Change image';

  // const uploadAvatarAction =
  //   preview === item.image ? onUpload : () => handleAvatarSubmit();

  return (
    <div className='flex flex-col justify-center items-center  gap-2 w-1/6'>
      {/* <Label>Profile picture</Label> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-2 items-center'>
        <input
          type='file'
          {...rest}
          onChange={handleUploadedFile}
          ref={(e) => {
            registerRef(e);
            hiddenInputRef.current = e;
          }}
          className='hidden '
        />
        <Avatar>
          <AvatarImage src={preview} className='object-cover' alt='@shadcn' />
          <AvatarFallback>{username.substring(0, 3)} </AvatarFallback>
        </Avatar>
        <div className='text-xs left-0 text-left '>
          <div
            className={cn(
              'flex flex-row text-nowrap px-4 w-full rounded-sm text-white font-semibold text-shadow',
              role === 'user' ? 'bg-emerald-300 ' : 'bg-yellow-500'
            )}>
            {' '}
            Status: {role}
          </div>
        </div>
        {/* {modalType === 'editProfile' && ( */}
        <Button
          variant='ghost'
          size='sm'
          type={preview === item.image ? 'button' : 'submit'}
          onClick={preview === item.image ? onUpload : () => []}
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
              <span className=' text-xs text-white font-semibold text-shadow group-hover:text-black'>
                {uploadButtonLabel}
              </span>
            </span>
          )}
        </Button>
      </form>
      {/* )} */}
    </div>
  );
};

export default ProfilePicture;
