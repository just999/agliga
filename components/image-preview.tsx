'use client';

import { useEffect, useState } from 'react';

import { useImageStore } from '@/store/use-image-store';
import Image from 'next/image';
import { FaTimesCircle } from 'react-icons/fa';

import { Button } from './shadcn/ui/button';

type ImagePreviewProps = {
  image: string;
  images: string[];
  onRemove?: (image: string) => void;
};

const ImagePreview = ({ image, onRemove, images }: ImagePreviewProps) => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  // const removeImage = useImageStore((state) => state.removeImage);

  useEffect(() => {
    if (image) {
      setImageURL(image);
    }
  }, [image]);
  const renderedImages = imageURL && (
    <div className=' w-28 h-28  relative'>
      <Image
        src={imageURL}
        alt='image'
        width={80}
        height={80}
        priority
        sizes='100vw'
        className='rounded-md  w-24 h-auto object-contain'
      />
      {onRemove && (
        <Button
          type='button'
          variant='ghost'
          size='sm'
          onClick={() => {
            onRemove(image);
          }}
          className='absolute top-0 right-4 border border-red-500 border-solid h-4 w-4  p-0 m-0  cursor-pointer  hover:text-red-500 '
        >
          <FaTimesCircle
            className='text-red-200 drop-shadow-xl text-xl'
            size={28}
          />
        </Button>
      )}
    </div>
  );
  return renderedImages;
};

export default ImagePreview;
