'use client';

import Container from '@/components/container';

import Euro from '@/components/euro';

import EuroClient from '@/components/table/euro/euro-client';
import { useGetEuros } from '@/hooks/use-get-schedule';
import {
  euroGroup,
  euroGroupA,
  euroGroupB,
  euroGroupC,
  euroGroupD,
  euroGroupE,
  euroGroupF,
} from '@/lib/helper';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import EuroCard from '@/components/table/euro/euro-card';
import { Skeleton } from '@/components/ui/skeleton';
import { EuroProps } from '@/types';
import useModal from '@/hooks/use-modal';
import { useState } from 'react';

type EuroPageProps = {};

const EuroPage = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const { items } = useGetEuros();

  const { group } = useModal();
  if (!items || items.length === 0) return <Skeleton />;

  // let euroGroupA = items.filter((item) => item.group === 'A');
  // let euroGroupB = items.filter((item) => item.group === 'B');
  // let euroGroupC = items.filter((item) => item.group === 'C');
  // let euroGroupD = items.filter((item) => item.group === 'D');
  // let euroGroupE = items.filter((item) => item.group === 'E');
  // let euroGroupF = items.filter((item) => item.group === 'F');

  let itemsFiltered = items.filter((item) => item.date);
  const groups = itemsFiltered.reduce((groups, game) => {
    const date = new Date(game.date).toLocaleDateString('id-ID').split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(game);
    return groups;
  }, {} as { [date: string]: EuroProps[] });
  // Edit: to add it in the array format instead
  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      games: groups[date],
    };
  });

  // console.log(groupArrays);

  //
  return (
    <div className='w-full mx-auto '>
      <div className='flex flex-row justify-center bg-lime-100/30 '>
        <div
          className='flex flex-col py-2 w-3/4 overflow-hidden bg-slate-100 shadow-inner'
          ref={emblaRef}
        >
          <div className='flex-row gap-4 rounded-md w-full embla__container'>
            {groupArrays.map((item) => (
              // <Euro key={item.id} eu={item} trashClassName='hidden' />
              <EuroCard
                key={item.games[0].id}
                eu={item}
                trashClassName='hidden'
                className='w-[200px] border border-solid border-amber-300'
                footerClassName='bg-amber-200/20 items-center h-8 py-1 rounded-full'
                groupClassName='h-auto drop-shadow-lg px-6 py-2 '
                euroCardDateClassName='hidden'
              />
            ))}
          </div>
        </div>
      </div>
      <Container className='grid md:grid-cols-1 xl:grid-cols-2 gap-4 max-w-[1280px]'>
        <EuroClient
          data={euroGroupA}
          group='A'
          footerClassName='flex flex-row gap-2'
          euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
          className='hidden'
          euCardClassName='pt-2 px-2  gap-0 justify-start items-center bg-emerald-50 odd:bg-lime-50 even:bg-green-50'
        />
        <EuroClient
          data={euroGroupB}
          group='B'
          footerClassName='flex flex-row gap-2'
          euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
          className='hidden'
          euCardClassName='pt-2 px-2  gap-0 justify-start items-center bg-emerald-50 odd:bg-lime-50 even:bg-green-50'
        />
        <EuroClient
          data={euroGroupC}
          group='C'
          footerClassName='flex flex-row gap-2'
          euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
          className='hidden'
          euCardClassName='pt-2 px-2  gap-0 justify-start items-center bg-emerald-50 odd:bg-lime-50 even:bg-green-50'
        />
        <EuroClient
          data={euroGroupD}
          group='D'
          footerClassName='flex flex-row gap-2'
          euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
          className='hidden'
          euCardClassName='pt-2 px-2  gap-0 justify-start items-center bg-emerald-50 odd:bg-lime-50 even:bg-green-50'
        />
        <EuroClient
          data={euroGroupE}
          group='E'
          footerClassName='flex flex-row gap-2'
          euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
          className='hidden'
          euCardClassName='pt-2 px-2  gap-0 justify-start items-center bg-emerald-50 odd:bg-lime-50 even:bg-green-50'
        />
        <EuroClient
          data={euroGroupF}
          group='F'
          footerClassName='flex flex-row gap-2'
          euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
          className='hidden'
          euCardClassName='pt-2 px-2  gap-0 justify-start items-center bg-emerald-50 odd:bg-lime-50 even:bg-green-50'
        />
      </Container>
    </div>
  );
};

export default EuroPage;
