'use client';

import Container from '../container';

import CategoryBox from '../category-box';
import { usePathname, useSearchParams } from 'next/navigation';

import { categories } from '@/lib/helper';

const Categories = () => {
  const params = useSearchParams();
  const category = params.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) return null;

  return (
    <div className='bg-zinc-50 drop-shadow-md'>
      <Container>
        <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto border-b-[1px] border-b-neutral-900/10'>
          {categories.map((cat) => (
            <CategoryBox
              key={cat.label}
              label={cat.label}
              selected={category === cat.label}
              icon={cat.icon}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
