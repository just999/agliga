'use client';

import { games, gamesCategoriesList } from '@/lib/helper';
import Container from '../container';

import { usePathname, useSearchParams } from 'next/navigation';
import GameBox from '../game-box';

type GamesCategoriesProps = {};

const GamesCategories = () => {
  const params = useSearchParams();
  const game = params.get('game');
  // const pathname = usePathname();

  // const isMainPage = pathname === '/';

  // if (!isMainPage) return null;

  return (
    <Container className='bg-stone-50 shadow-sm  '>
      <div className='pt-2 flex flex-row items-center justify-between overflow-x-auto border-b-[1px] border-b-neutral-900/10  '>
        {gamesCategoriesList.map((cat) => (
          <GameBox
            key={cat.label}
            label={cat.label}
            selected={game === cat.label}
            icon={cat.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default GamesCategories;
