import Container from '@/components/container';

// import Euro from '@/components/euro';

import EuroClient from '@/components/table/euro/euro-client';

import {
  euGroup,
  euroGroup,
  uefaA,
  uefaB,
  uefaC,
  uefaD,
  uefaE,
  uefaF,
  uefaMatches,
} from '@/lib/helper';

import EuroCarousel from '@/components/soccer/euro-carousel';
import EuroTeamGroup from '@/components/soccer/euro-team-group';
import { EuroTeamGroupProps } from '@/types';
import ClientOnly from '@/lib/client-only';
import { fetchEuro } from '@/lib/queries/euro';
import { Skeleton } from '@/components/ui/skeleton';

type EuroPageProps = {};

const EuroPage = async () => {
  // const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
  //   Autoplay({ delay: 8000 }),
  // ]);
  // const scrollPrev = useCallback(() => {
  //   if (emblaApi) emblaApi.scrollPrev();
  // }, [emblaApi]);

  // const scrollNext = useCallback(() => {
  //   if (emblaApi) emblaApi.scrollNext();
  // }, [emblaApi]);

  // if (!items || items.length === 0) return <Skeleton />;
  // let itemsFiltered = items.filter((item) => item.date);

  // // console.log(groupArrays);
  // const groups = itemsFiltered.reduce((groups, game) => {
  //   const date = new Date(game.date).toLocaleDateString('id-ID').split('T')[0];
  //   if (!groups[date]) {
  //     groups[date] = [];
  //   }
  //   groups[date].push(game);
  //   return groups;
  // }, {} as { [date: string]: EuroProps[] });
  // // Edit: to add it in the array format instead
  // const groupArrays = Object.keys(groups).map((date) => {
  //   return {
  //     date,
  //     games: groups[date],
  //   };
  // });

  //

  const euro = await fetchEuro();

  const groupA = euro?.filter((gr) => gr.group === 'A');
  const groupB = euro?.filter((gr) => gr.group === 'B');
  const groupC = euro?.filter((gr) => gr.group === 'C');
  const groupD = euro?.filter((gr) => gr.group === 'D');
  const groupE = euro?.filter((gr) => gr.group === 'E');
  const groupF = euro?.filter((gr) => gr.group === 'F');
  let euroGroup = [];

  euroGroup.push(groupA, groupB, groupC, groupD, groupE, groupF);
  return (
    <div className='w-full mx-auto'>
      {/* <div className='flex flex-row justify-center bg-lime-100/30 items-center'>
        <div className='w-full flex flex-row justify-end gap-4 pr-2'>
        <Button
            variant='ghost'
            size='sm'
            type='button'
            className='embla__prev mr-2 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-orange-100 hover:shadow-lg hover:text-orange-700'
            onClick={scrollPrev}
            >
            <BsChevronDoubleLeft size={18} />
            </Button>
            </div>
            <div className='embla flex flex-col py-2 w-3/4 bg-slate-100 shadow-inner border-x-2 border-orange-100'>
            <div className='embla__viewport overflow-hidden' ref={emblaRef}>
            <div className='flex-row gap-4 rounded-md w-full embla__container'>
            {groupArrays.map((item) => (
              // <Euro key={item.id} eu={item} trashClassName='hidden' />
              <EuroCard
              key={item.games[0].id}
              eu={item}
              trashClassName='hidden'
              className='w-[200px] border border-solid border-amber-200'
              footerClassName='flex flex-row bg-amber-200/20 items-center h-8 py-1 rounded-full justify-center '
              groupClassName='h-auto px-0 py-2 mx-1'
              euroCardDateClassName='hidden'
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
        className='embla__next ml-2 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-orange-100 hover:shadow-lg hover:text-orange-700'
        onClick={scrollNext}
        >
        <BsChevronDoubleRight size={18} />
        </Button>
        </div>
      </div> */}

      <EuroCarousel />

      <Container className='grid md:grid-cols-1 xl:grid-cols-2 gap-4 max-w-[1280px]'>
        {/* {uefaMatches.map((e: any, i: number) => (
          <EuroTeamGroup key={i} eu={e} />
        ))} */}

        {/* <pre>{JSON.stringify(euroGroup, null, 2)}</pre> */}
        {euroGroup.map((gr, i) => (
          <EuroClient
            key={i}
            data={gr}
            group={gr?.map((g) => g.group)}
            footerClassName='flex flex-row gap-2 justify-between items-center bg-sky-200/60'
            euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
            className='hidden'
            euCardClassName='pt-2 px-2 gap-0 justify-start items-center bg-emerald-50 odd:bg-zinc-100 even:bg-stone-50'
          />
        ))}
        {/* <EuroClient
          data={uefaA}
          group='A'
          footerClassName='flex flex-row gap-2 justify-between items-center bg-sky-200/60'
          euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
          className='hidden'
          euCardClassName='pt-2 px-2 gap-0 justify-start items-center bg-emerald-50 odd:bg-zinc-100 even:bg-stone-50'
        />
        <EuroClient
          data={uefaA}
          group='A'
          footerClassName='flex flex-row gap-2 justify-between items-center bg-sky-200/60'
          euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
          className='hidden'
          euCardClassName='pt-2 px-2 gap-0 justify-start items-center bg-emerald-50 odd:bg-zinc-100 even:bg-stone-50'
        />
        <EuroClient
          data={uefaB}
          group='B'
          footerClassName='flex flex-row gap-2 justify-between items-center bg-sky-200/60'
          euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
          className='hidden'
          euCardClassName='pt-2 px-2 gap-0 justify-start items-center bg-emerald-50 even:bg-zinc-100 odd:bg-stone-50'
        />
        <EuroClient
          data={uefaC}
          group='C'
          footerClassName='flex flex-row gap-2 justify-between items-center bg-sky-200/60'
          euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
          className='hidden'
          euCardClassName='pt-2 px-2 gap-0 justify-start items-center bg-emerald-50 odd:bg-zinc-100 even:bg-stone-50'
        />
        <EuroClient
          data={uefaD}
          group='D'
          footerClassName='flex flex-row gap-2 justify-between items-center bg-sky-200/60'
          euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
          className='hidden'
          euCardClassName='pt-2 px-2 gap-0 justify-start items-center bg-emerald-50 even:bg-zinc-100 odd:bg-stone-50'
        />
        <EuroClient
          data={uefaE}
          group='E'
          footerClassName='flex flex-row gap-2 justify-between items-center bg-sky-200/60'
          euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
          className='hidden'
          euCardClassName='pt-2 px-2 gap-0 justify-start items-center bg-emerald-50 odd:bg-zinc-100 even:bg-stone-50'
        />
        <EuroClient
          data={uefaF}
          group='F'
          footerClassName='flex flex-row gap-2 justify-between items-center bg-sky-200/60'
          euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
          className='hidden'
          euCardClassName='pt-2 px-2 gap-0 justify-start items-center bg-emerald-50 even:bg-zinc-100 odd:bg-stone-50'
        /> */}
      </Container>
    </div>
  );
};

export default EuroPage;
