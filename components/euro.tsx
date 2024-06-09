'use client';

import { euro } from '@/lib/helper';

import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { cn, noto } from '@/lib/utils';

import useEmblaCarousel from 'embla-carousel-react';

import { Button } from './ui/button';
import { useCallback } from 'react';

import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import Autoplay from 'embla-carousel-autoplay';

type EuroProps = {};

const Euro = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    // Autoplay({ delay: 4000 }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  const renderedEuro = euro.map((eu, i) => (
    <Card
      key={i}
      className='w-[200px] bg-orange-50 cursor-pointer embla__slide'
    >
      <CardHeader className='hidden '>
        {/* <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent className='flex flex-col px-3 pt-2 pb-0 justify-between gap-1'>
        <div className='flex flex-row justify-between text-xs '>
          <div>{eu.date}</div>
          <div>{eu.status}</div>
        </div>
        <div>
          <div className='flex flex-row justify-between '>
            <div className='flex flex-row items-center gap-2 '>
              <span className={cn(noto.className, 'text-sm')}>
                {eu.homeFlag}
              </span>
              <span className='text-xs font-bold '>{eu.home}</span>
            </div>
            <span className='pr-4 '>{eu.homeScore}</span>
          </div>
          <div className='flex flex-row justify-between '>
            <div className='flex flex-row items-center gap-2 '>
              <span className={cn(noto.className, 'text-sm')}>
                {eu.awayFlag}
              </span>
              <span className='text-xs font-bold'>{eu.away}</span>
            </div>
            <span className='pr-4 '>{eu.awayScore}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between pb-2'>
        <div className='mx-auto text-xs font-semibold shadow-lg rounded-md px-4 bg-orange-100'>
          {eu.group}
        </div>
        {/* <Button variant='outline'>Cancel</Button>
        <Button>Deploy</Button> */}
      </CardFooter>
    </Card>
  ));

  return (
    <div className=' rounded-lg embla mx-auto flex items-center'>
      <div>
        <Button
          variant='ghost'
          size='sm'
          className='px-2 rounded-lg bg-stone-200 '
          onClick={scrollPrev}
        >
          <BsChevronDoubleLeft />
        </Button>
      </div>
      <div
        className='embla__viewport  overflow-hidden mx-auto max-w-7xl '
        ref={emblaRef}
      >
        <div className='-ml-1 flex flex-row gap-2  '>{renderedEuro}</div>
      </div>

      <div>
        <Button
          variant='ghost'
          size='sm'
          className='px-2 rounded-lg bg-stone-200 '
          onClick={scrollNext}
        >
          <BsChevronDoubleRight />
        </Button>
      </div>
    </div>
  );
};

export default Euro;
