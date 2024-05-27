'use client';

import { cn } from '@/lib/utils';
import { Old_Standard_TT } from 'next/font/google';

const old = Old_Standard_TT({
  subsets: ['latin'],
  weight: ['400', '700'],
});

type PageTitleProps = {
  title: string;
};

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <h3
      className={cn(
        'category-title text-center border-b-2 border-solid border-stone-300   text-base font-bold uppercase py-4',
        old.className
      )}
    >
      {title}
    </h3>
  );
};

export default PageTitle;
