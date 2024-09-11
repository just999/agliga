// 'use client';

// import { Card, CardHeader, CardContent, CardFooter } from '../ui/card';
// import BackButton from './back-button';
// import Header from './header';
// import Social from './social';

// type CardWrapperProps = {
//   children: React.ReactNode;
//   headerLabel: string;
//   backButtonLabel: string;
//   backButtonHref: string;
//   showSocial?: boolean;
// };

// const CardWrapper = ({
//   children,
//   headerLabel,
//   backButtonLabel,
//   backButtonHref,
//   showSocial,
// }: CardWrapperProps) => {
//   return (
//     <Card className='w-[400px] shadow-md'>
//       <CardHeader>
//         <Header label={headerLabel} />
//       </CardHeader>
//       <CardContent>{children}</CardContent>
//       {showSocial && (
//         <CardFooter>
//           <Social />
//         </CardFooter>
//       )}
//       <CardFooter>
//         <BackButton label={backButtonLabel} href={backButtonHref} />
//       </CardFooter>
//     </Card>
//   );
// };

// export default CardWrapper;

import { IconType } from 'react-icons';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type CardWrapperProps = {
  body?: React.ReactNode;
  headerIcon: IconType;
  headerText: string;
  subHeaderText?: string;
  action?: () => void;
  actionLabel?: string;
  footer?: React.ReactNode;
  classNames?: string;
};

const CardWrapper = ({
  body,
  headerIcon: Icon,
  headerText,
  subHeaderText,
  action,
  footer,
  actionLabel,
  classNames,
}: CardWrapperProps) => {
  return (
    <div className='flex items-center justify-center  p-4'>
      <Card className='w-2/5 mx-auto p-5 shadow-xl bg-amber-500'>
        <CardHeader className='flex flex-col items-center justify-center'>
          <div className='flex flex-col gap-2 items-center text-secondary'>
            <div className='flex flex-row gap-3 items-center'>
              <Icon size={30} className='text-emerald-800 svg' />
              <h1
                className={cn(
                  'text-2xl font-semibold text-nowrap text-stone-200 text-shadow',
                  classNames
                )}>
                {headerText}
              </h1>
            </div>
            {subHeaderText && (
              <p className='text-neutral-200 text-shadow '>{subHeaderText}</p>
            )}
          </div>
        </CardHeader>
        {body && <CardContent>{body}</CardContent>}
        <CardFooter>
          {action && (
            <Button
              onClick={action}
              variant='ghost'
              className='w-full shadow-lg bg-sky-500 hover:bg-sky-400 hover:text-white text-shadow text-gray-50'
              size='sm'
              type='button'>
              {actionLabel}
            </Button>
          )}
          {footer && <>{footer}</>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardWrapper;
