'use client';

type PageTitleProps = {
  title: string;
};

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <h3 className='category-title text-center border-b-2 border-solid border-stone-300  mb-4 text-base font-bold uppercase py-4 '>
      {title}
    </h3>
  );
};

export default PageTitle;
