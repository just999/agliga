'use server';

import Link from 'next/link';

type ImageSlidersProps = {
  images: string;
};

const ImageSliders = ({ images }: ImageSlidersProps) => {
  return (
    <Link
      href='/'
      className='img-bg absolute inset-0 bg-cover bg-center'
      style={{ backgroundImage: `url(${images})` }}></Link>
  );
};

export default ImageSliders;
