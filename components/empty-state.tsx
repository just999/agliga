'use client';

import BackButton from './back-button';

import HeadingLogo from './ui/heading-logo';

type EmptyStateProps = {
  title: string;
  subtitle?: string;
  showReset?: boolean;
  link: string;
};

const EmptyState = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters',
  showReset,
  link,
}: EmptyStateProps) => {
  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center '>
      <HeadingLogo center title={title} subtitle={subtitle} />
      <div className='w-48 mt-4 '>
        {showReset && <BackButton text='Go Back' link={link} />}
      </div>
    </div>
  );
};

export default EmptyState;
