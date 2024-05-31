'use client';

import Image from 'next/image';
import Link from 'next/link';

type HeroSlideProps = {
  // slide: {
  //   bgImg: string;
  //   title: string;
  //   brief: string;
  // };
  slide: string;
};

const HeroSlide = ({ slide }: HeroSlideProps) => {
  return (
    <Link
      href='/'
      className='img-bg absolute inset-0 bg-cover bg-center'
      style={{ backgroundImage: `url(${slide})` }}
    >
      {/* <Image
        src={slide.bgImg}
        alt='slice'
        width={1500}
        height={450}
        className='object-fit w-full h-auto '
      /> */}
      {/* <div className='absolute inset-0 bg-black opacity-10 group-hover:opacity-50'>
        <h2>{slide.title}</h2>
        <p>{slide.brief}</p>
      </div> */}
    </Link>
  );
};

export default HeroSlide;
