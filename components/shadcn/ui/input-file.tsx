'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { InputCustom } from './inputCustom';
import Image from 'next/image';

type InputFileProps = {};

const InputFile = ({ accept = 'image/*' }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
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
  return (
    <div className={'container'}>
      <div
        // className={styles.dropZone}
        onDragOver={handleDragOver}
        onDrop={handleFileDrop}
        onClick={handleImageUploadClick}>
        {imageFile ? (
          <Image
            src={URL.createObjectURL(imageFile)}
            alt='Uploaded'
            // className={styles.uploadedImage}
          />
        ) : (
          <span>Drag and Drop here </span>
        )}
        <InputCustom
          ref={fileInputRef}
          type='file'
          accept={accept}
          style={{ display: 'none' }}
          onChange={updateImage}
        />
      </div>
    </div>
  );
};

export default InputFile;
