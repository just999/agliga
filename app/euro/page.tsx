import Container from '@/components/container';

// import Euro from '@/components/euro';

import EuroClient from '@/components/table/euro/euro-client';

import EuroCarousel from '@/components/soccer/euro-carousel';

import { EuroWithIconProps } from '@/types';

import { fetchEuro } from '@/lib/queries/euro';

type EuroPageProps = {};

const EuroPage = async () => {
  const items = await fetchEuro();

  if (!items || items.length === 0) return [];
  let itemsFiltered = items.filter((item) => item.date);

  const groups = itemsFiltered.reduce((groups, game) => {
    const date = new Date(game.date).toLocaleDateString('id-ID').split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(game);
    return groups;
  }, {} as { [date: string]: EuroWithIconProps[] });
  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      games: groups[date],
    };
  });

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
      <EuroCarousel groupArrays={groupArrays} />

      <Container className='grid md:grid-cols-1 xl:grid-cols-2 gap-4 max-w-[1280px]'>
        {/* {uefaMatches.map((e: any, i: number) => (
          <EuroTeamGroup key={i} eu={e} />
        ))} */}

        {/* <pre>{JSON.stringify(euroGroup, null, 2)}</pre> */}
        {euroGroup.map((gr, i) => (
          <EuroClient
            key={i}
            eu={gr}
            groupArrays={groupArrays}
            group={gr?.map((g) => g.group).slice(1, 2)}
            footerClassName='flex flex-row gap-2 justify-between items-center bg-sky-200/60'
            euroClassName='flex flex-wrap gap-2 justify-center group-card py-2'
            className='hidden'
            euCardClassName='pt-2 px-2 gap-0 justify-start items-center bg-emerald-50 odd:bg-zinc-100 even:bg-stone-50'
          />
        ))}
      </Container>
    </div>
  );
};

export default EuroPage;
