'use client';

import CategoryBox from '../category-box';
import { useSearchParams } from 'next/navigation';

import { categories } from '@/lib/helper';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import { Button } from '../ui/button';

const Categories = () => {
  const params = useSearchParams();
  const category = params.get('category');

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className='flex flex-row justify-center bg-stone-100 items-center'>
      <div className='w-full flex flex-row justify-end gap-4 pr-2'>
        <Button
          variant='ghost'
          size='sm'
          type='button'
          className='embla__prev mr-2 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-emerald-100  hover:text-orange-700'
          onClick={scrollPrev}>
          <BsChevronDoubleLeft size={18} />
        </Button>
      </div>
      <div className='embla bg-zinc-50  border-x-2 border-orange-100'>
        <div
          className='container max-w-[1440px] shadow-inner pt-2 flex flex-row items-center justify-between  border-b-[1px] border-b-neutral-900/10 embla__viewport overflow-hidden'
          ref={emblaRef}>
          <div className='flex-row rounded-md w-full embla__container'>
            {categories.map((cat) => (
              <CategoryBox
                key={cat.label}
                label={cat.label}
                selected={category === cat.label}
                icon={cat.icon}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='w-full flex flex-row justify-start gap-4 pl-2'>
        <Button
          variant='ghost'
          size='sm'
          type='button'
          className='embla__next ml-2 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-emerald-100 hover:shadow-lg hover:text-orange-700'
          onClick={scrollNext}>
          <BsChevronDoubleRight size={18} />
        </Button>
      </div>
    </div>
  );
};

export default Categories;
