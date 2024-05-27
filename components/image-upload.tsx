'use client';

import { CldUploadWidget, CloudinaryLoader } from 'next-cloudinary';
import Image from 'next/image';

// import type { CloudinaryUploadApiResponse } from './cloudinary';

import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

interface CloudinaryUploadApiResponse {
  info: {
    secure_url: string; // Secure image URL
  };
  public_id: string; // Public ID of the uploaded image
  url: string; // Full image URL
  format: string; // Image format (e.g., "jpg", "png")
  width: number; // Image width in pixels
  height: number; // Image height in pixels
  resource_type: string; // Resource type ("image")
  created_at: string; // Upload time
  tags: string[]; // Array of image tags (if any)
  // ... other properties as needed
}

declare global {
  interface Cloudinary {
    uploadApi: CloudinaryLoader;
  }
}

type ImageUploadProps = {
  onChange: (value: string) => void;
  value: string;
};

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: CloudinaryUploadApiResponse) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onSuccess={() => handleUpload}
      uploadPreset='agenliga'
      options={{
        maxFiles: 4,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-1 border-neutral-300 flex flex-col justify-center items-center gap-1 text-neutral-600 '
          >
            <TbPhotoPlus size={30} />
            <div className='font-semibold text-xs '>Click to Upload</div>
            {value && (
              <div className='absolute inset-0 w-full h-full '>
                <Image
                  src={value}
                  alt='Upload'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
