'use client';

import { useEffect, useRef, useState } from 'react';
import {
  UseFormRegister,
  FieldValues,
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';

import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

import useModal from '@/hooks/use-modal';
import { useSession } from 'next-auth/react';
import { Badge } from '../ui/badge';
import { FaUsersCog } from 'react-icons/fa';
import { UserProfileModalProps } from '../modals/user-profile-modal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useProfileStore from '@/store/use-profile-store';
import { ProfileProps } from '@/types';

type ProfilePictureProps = {
  register: UseFormRegister<FieldValues>;
  text?: any;
  setText?: () => void;
  watch?: UseFormWatch<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  // setIsPasswordVerified: (value: boolean) => void;
};

const ProfilePicture = ({
  register,
  text,
  setText,
  watch,
  setValue,
}: // setIsPasswordVerified,
ProfilePictureProps) => {
  const [preview, setPreview] = useState<string>('');

  const { ref: registerRef, ...rest } = register('image');
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const username = session?.user.name;
  const userId = session?.user.id;
  const role = session?.user.curUser.role;
  const { modalType, isOpen, onOpen, onClose } = useModal();

  let imgValue: File;
  if (watch) {
    imgValue = watch('image');
  }
  const { item, setItem, isPasswordVerified, setIsPasswordVerified } =
    useProfileStore();

  const { name, bank, accountNumber, email, game, image, phone } =
    session?.user.curUser;
  const newProfile = {
    name,
    bank,
    accountNumber,
    email,
    game,
    image,
    phone,
  };

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

  const handleAvatarSubmit = (data: File) => {
    const formData = new FormData();
    formData.append('image', imgValue);
    formData.append('userId', userId);
    try {
      axios
        .put(`/api/profiles/avatar/${userId}`, formData, {
          headers: {
            'Content-Type': 'multiPart/form-data',
          },
        })
        .then((res) => {
          setIsPasswordVerified(false);
          toast.success('Successfully update Avatar');
          router.refresh();
          onClose();
        })
        .catch((err) => toast.error('Something went wrong', err));
    } catch (err) {
      console.error(err);
    }
  };

  const uploadButtonLabel =
    preview === item.image ? 'Upload image' : 'Change image';

  const uploadAvatarAction =
    preview === item.image ? onUpload : () => handleAvatarSubmit(imgValue);

  return (
    <div className='flex flex-col justify-center items-center  gap-2 w-1/6'>
      {/* <Label>Profile picture</Label> */}
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
        <AvatarImage src={preview} className='w-10 h-10' alt='@shadcn' />
        <AvatarFallback>{username} </AvatarFallback>
      </Avatar>
      <Badge className='text-xs left-0 text-left ' variant='secondary'>
        {role}
      </Badge>
      {modalType === 'editProfile' && (
        <Button
          variant='ghost'
          onClick={uploadAvatarAction}
          className='text-xs flex flex-row gap-2 '
        >
          <FaUsersCog size={12} /> <span>{uploadButtonLabel}</span>
        </Button>
      )}
    </div>
  );
};

export default ProfilePicture;
