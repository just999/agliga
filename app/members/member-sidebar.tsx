'use client';

import { BubbleChat } from '@/components/assets/icons/chat-bubble';
import PresenceDot from '@/components/presence-dot';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useMessageStore } from '@/store/use-message-store';
import { User } from '@prisma/client';
import { Separator } from '@radix-ui/react-separator';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';

type MemberSidebarProps = {
  user: User;
  navLinks: { name: string; href: string }[];
  className?: string;
};

const MemberSidebar = ({ user, navLinks, className }: MemberSidebarProps) => {
  const pathname = usePathname();

  const [showBubbleChat, setShowBubbleChat] = useState<boolean>(false);

  const { isToggle, setIsToggle } = useMessageStore((state) => ({
    isToggle: state.isToggle,
    setIsToggle: state.setIsToggle,
  }));
  const handleToggleOff = useCallback(() => {
    setIsToggle(true);
    setShowBubbleChat(true); // Hide the BubbleChat immediately

    // Show BubbleChat after 500 milliseconds
    setTimeout(() => {
      setShowBubbleChat(false);
    }, 500);
  }, [setIsToggle]);

  return (
    <Card
      className={cn(
        'items-center',
        isToggle ? 'slide-up' : 'slide-down',
        className
      )}>
      <CardHeader className='flex flex-row p-2 justify-between items-center gap-2 text-gray-400 bg-amber-200 w-full border-b-2 border-solid border-amber-400 drop-shadow-md rounded-t-lg'>
        <CardTitle>Profile </CardTitle>
        <CardDescription>
          <Image
            height={20}
            width={20}
            src={user?.image || '/img/user.svg'}
            alt='User profile image'
            className='rounded-full aspect-square object-cover '
          />
        </CardDescription>
        <Button
          aria-label='member chat'
          variant='ghost'
          size='sm'
          type='button'
          className='p-0 m-0 h-0 hover:bg-emerald-100 hover:text-sky-700 pr-1'
          onClick={handleToggleOff}>
          <Link href={`/members/${user.id}/chat`}>
            <BsChevronDown className='fill-gray-800' />
          </Link>
        </Button>
      </CardHeader>

      {user && (
        <CardContent className='overflow-hidden'>
          <div className='flex flex-col items-center text-xs '>
            <div className='flex items-center gap-2 justify-center'>
              <div>Name: {user.name}</div>
              <div>
                <PresenceDot
                  user={user}
                  sizeGoDot={18}
                  sizeGoDotFill={14}
                  className='relative '
                />
              </div>
            </div>
            <div>Bank: {user.bank}</div>
            <div>Account number: {user.accountNumber}</div>
            <div>id: {user.id}</div>
            <div>Role: {user.role}</div>
          </div>
          <Separator className='my-3' />
          <nav className='flex flex-col p-4 ml-4 text-2xl gap-4'>
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className={cn(
                  'block rounded w-full text-center text-sm text-gray-700',
                  pathname === link.href
                    ? 'text-sky-700 border-r-2 border-solid border-sky-700 rounded-none shadow-xl'
                    : 'hover:text-white hover:bg-stone-200'
                )}>
                {link.name}
              </Link>
            ))}
          </nav>
        </CardContent>
      )}
      {/* <CardFooter>
        <Link
          href='/users'
          className='shadow-lg px-2 flex items-center flex-row text-sm bg-stone-50'>
          Go Back
        </Link>
      </CardFooter> */}
      {/* Chat bubble button */}
      {isToggle && !showBubbleChat && (
        <CardFooter>
          <Button
            className='fixed bottom-4 right-4 w-12 h-12 z-50 bg-transparent rounded-full flex justify-center items-center'
            variant='ghost'
            size='sm'
            type='button'
            onClick={() => setIsToggle(true)}>
            <Link href={`/members/${user?.id}/chat`}>
              <BubbleChat className='w-full h-full z-999  relative' />
            </Link>
            <PresenceDot
              user={user}
              sizeGoDot={40}
              sizeGoDotFill={36}
              className='absolute top-0 right-0 z-99999'
            />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default MemberSidebar;
