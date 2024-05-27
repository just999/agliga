// Image.tsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { TImage } from '@/types';

interface ImageProps {
  image: TImage;
  onDelete?: (id: string) => void;
}

const Image: React.FC<ImageProps> = ({ image, onDelete }) => {
  return (
    <div className='flex items-center mb-4'>
      {image.url ? (
        <Avatar className='rounded-lg w-20 h-20 mr-4'>
          <AvatarImage src={image.url} alt='Uploaded Image' />
          <AvatarFallback>
            {image.id && image.id.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div className='w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center'>
          <p className='text-sm text-gray-500'>No image uploaded</p>
        </div>
      )}
      {onDelete && (
        <button
          type='button'
          onClick={() => onDelete(image.id!)}
          className='text-red-500 hover:text-red-700'
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default Image;
