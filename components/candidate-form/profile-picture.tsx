'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { updateUserAvatar } from '@/actions/user-actions';
import useModal from '@/hooks/use-modal';
import { cn, handleFormServerErrors } from '@/lib/utils';
import { updateAvatarSchema, UpdateAvatarSchema } from '@/schemas';
import useProfileStore from '@/store/use-profile-store';
import { ProfileProps } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import axios from 'axios';
import { ImagePlus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { InputCustom, Spinner } from '../shadcn/ui';
import { Avatar, AvatarFallback, AvatarImage } from '../shadcn/ui/avatar';
import { Button } from '../shadcn/ui/button';
import UserAvatar from '../user-avatar';

type ProfilePictureProps = {
  text?: any;
  setText?: () => void;
  user: { name: string | null; image: string | null } | null;
};

const ProfilePicture = ({ text, setText, user }: ProfilePictureProps) => {
  const { data: session } = useSession();

  const [preview, setPreview] = useState<string>(user?.image || '');

  const [imageFile, setImageFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const userData = session?.user.curUser;

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
      name: userData?.name || '',
      bank: userData?.bank || '',
      accountNumber: userData?.accountNumber || '',
      email: userData?.email || '',
      game: userData?.game || [],
      image: userData?.image || '',
      phone: userData?.phone || '',
    };
  }, [
    userData?.accountNumber,
    userData?.bank,
    userData?.email,
    userData?.game,
    userData?.image,
    userData?.name,
    userData?.phone,
  ]);

  useEffect(() => {
    if (user?.image) {
      setPreview(user.image);

      setItem(newProfile);
    }
  }, [image, setItem, setPreview, newProfile, user]);

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

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      setImageFile(file);
    }
  };

  const onSubmit: SubmitHandler<UpdateAvatarSchema> = async (
    data: UpdateAvatarSchema,
    e
  ) => {
    e?.preventDefault();
    e?.stopPropagation();

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
    preview === item.image || preview === user?.image
      ? 'Upload image'
      : 'Submit image';

  // const uploadAvatarAction =
  //   preview === item.image ? onUpload : () => handleAvatarSubmit();

  return (
    <div
      className='flex flex-col justify-center items-center  gap-2 w-1/6'
      onDragOver={handleDragOver}
      onDrop={handleFileDrop}
    >
      {/* <Label>Profile picture</Label> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-2 items-center'
      >
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
        <span onClick={onUpload}>
          <UserAvatar src={preview} alt={user?.name} />
        </span>
        <div className='text-xs left-0 text-left '>
          <div
            className={cn(
              'flex flex-row text-nowrap px-4 w-full rounded-sm text-white font-semibold text-shadow',
              role === 'user' ? 'bg-emerald-300 ' : 'bg-yellow-500'
            )}
          >
            Status: {role}
          </div>
        </div>
        {/* {modalType === 'editProfile' && ( */}
        <Button
          variant='ghost'
          size='sm'
          type={
            preview === item.image || preview === user?.image
              ? 'button'
              : 'submit'
          }
          onClick={
            preview === item.image || preview === user?.image
              ? onUpload
              : undefined
          }
          className='group text-xs flex flex-row gap-2 bg-blue-500 hover:!bg-blue-500/70 px-2 mb-2'
        >
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
