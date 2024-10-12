// components/EmblaCarousel.tsx

'use client';

import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'; // Assuming you are using the Autoplay plugin
import { EmblaPluginType } from 'embla-carousel';
import { EmblaOptionsType } from 'embla-carousel';

import { Button } from '../ui/button';
import { useDotButton } from './embla-carousel-dot-button';
import { usePrevNextButtons } from './embla-carousel-arrow-button';
import { ChevronsLeft, ChevronsRightIcon } from 'lucide-react';

type PropType = {
  plugins?: EmblaPluginType[];
  children: React.ReactNode;
  slides: number[];
  options?: EmblaOptionsType;
};

export const EmblaCarousel: React.FC<PropType> = ({
  plugins = [],
  children,
  slides,
  options,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 2000,
    }),
  ]);

  useEffect(() => {
    if (emblaApi) {
      // You can use emblaApi here
      emblaApi.reInit();
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className='embla w-full] mx-auto'>
      <div
        className='embla__viewport mx-auto  w-full text-center h-96 '
        ref={emblaRef}>
        <div className='embla__container h-full'>
          {React.Children.map(children, (child, index) => (
            <div
              className='embla__slide flex items-center justify-center'
              key={index}>
              {index + 1}- {child}
            </div>
          ))}
        </div>
        <div>
          <Button
            variant='ghost'
            className='embla__prev absolute z-999 right-0 top-44 bg-white/20 hover:bg-white/30 shadow-xl'
            onClick={scrollPrev}>
            <ChevronsRightIcon size={38} className='text-white/60 svg ' />
          </Button>
          <Button
            variant='ghost'
            className='embla__next  absolute z-999 left-0 top-44 bg-white/20 hover:bg-white/30 shadow-xl'
            onClick={scrollNext}>
            <ChevronsLeft size={38} className='text-white/60 svg ' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
