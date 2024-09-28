'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

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
import { InputCustom, Spinner } from '../ui';

type ProfilePictureProps = {
  text?: any;
  setText?: () => void;
};

const ProfilePicture = ({ text, setText }: ProfilePictureProps) => {
  const { data: session } = useSession();

  const [preview, setPreview] = useState<string>('');

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    reset,
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

  const { item, setItem, setIsPasswordVerified } = useProfileStore((state) => ({
    item: state.item,
    setItem: state.setItem,
    setIsPasswordVerified: state.setIsPasswordVerified,
  }));

  const image = session?.user?.curUser.image;
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
  }, [image, setItem, setPreview, newProfile]);

  const onUpload = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setPreview(e.target.result as string);
          setValue('image', file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: UpdateAvatarSchema) => {
    const formData = new FormData();

    // Check if data.image is a File or a string
    if (data.image instanceof File) {
      formData.append('image', data.image);
    } else if (typeof data.image === 'string') {
      formData.append('image', data.image);
    }

    const res = await updateUserAvatar(formData);

    if (res?.status === 'success' && res.data?.image) {
      toast.success('avatar successfully updated');

      setPreview(res.data?.image);
      router.refresh();
      reset();
    } else if (res.error) {
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
        <Controller
          control={control}
          name='image'
          render={({ field }) => (
            <InputCustom
              type='file'
              className='h-12 hidden'
              onChange={handleFileChange}
              isInvalid={!!errors.image}
              errorMessage={errors.image?.message as string}
              ref={(e) => {
                registerRef(e);
                hiddenInputRef.current = e;
              }}
            />
          )}
        />
        <Avatar>
          <AvatarImage
            src={preview}
            className='object-cover'
            alt='user-avatar'
          />
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
