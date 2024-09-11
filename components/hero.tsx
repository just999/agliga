'use client';

import AOS from 'aos';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect } from 'react';

import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import HeroSlide from './hero-slide';
import Loader from './loader';

export type HeroProps = {
  images:
    | {
        id: string;
        images: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
      }[]
    | null;
};

const Hero = ({ images }: HeroProps) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: false,
    });
  }, []);

  if (!images) {
    return <Loader />;
  }

  return (
    <section
      id='hero-slider'
      className='hero-slider flex items-center justify-center flex-col h-[415px]  bg-gradient-to-b from-gray-300 via-gray-50 to-gray-300 shadow-lg'>
      <div className='container  mx-auto px-4 w-screen' data-aos='fade-in'>
        <div className='row mx-auto flex justify-center'>
          <div className='w-screen '>
            <Swiper
              slidesPerView={'auto'}
              breakpoints={{
                340: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                700: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1600: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
              }}
              speed={500}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
              }}
              navigation={{
                nextEl: '.custom-swiper-button-next',
                prevEl: '.custom-swiper-button-prev',
              }}
              modules={[Autoplay, Pagination, Navigation]}
              loop={true}>
              {images.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className='flex flex-col bg-sky-700 justify-center mx-auto gap-6 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[350px] w-full xs:h-[400px] xs:w-full md:h-[400px] md:w-full lg:h-[400px] lg:w-full xl:h-[400px] xl:w-full 2xl:h-[400px] 2xl:w-full overflow-hidden cursor-pointer grayscale hover:grayscale-0 hover:rounded-xl hover:brightness-200 hover:scale-105 transition drop-shadow-lg '>
                    <HeroSlide slide={slide.images} />
                    <div className='absolute inset-0 bg-black opacity-10 group-hover:opacity-50 '></div>
                    <div className='relative flex flex-col gap-3 '></div>
                  </div>
                </SwiperSlide>
              ))}

              <div className='custom-swiper-button-next'>
                <BiChevronRight
                  size={38}
                  className='text-gray-600/70 hover:text-black p '
                />
              </div>
              <div className='custom-swiper-button-prev'>
                <BiChevronLeft
                  size={38}
                  className='text-gray-600/70 hover:text-black '
                />
              </div>
              <div className='swiper-pagination'></div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
