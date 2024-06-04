'use client';

import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import { EB_Garamond } from 'next/font/google';

const old = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['100', '200', '300', '500', '600', '800', '900'],
  preload: true,
});

const eb = EB_Garamond({ subsets: ['latin'], preload: true });

type PageTitleProps = {
  title: string;
  className?: string;
};

const PageTitle = ({ title, className }: PageTitleProps) => {
  return (
    <h3
      className={cn(
        'category-title w-full bg-zinc-100 text-center underline px-2 text-base  my-4 shadow-md',
        old.className
      )}
    >
      <span
        className={cn(
          'shadow-sm px-2   text-zinc-500 mx-auto rounded-sm',
          className
        )}
      >
        {title}
      </span>
    </h3>
  );
};

export default PageTitle;
