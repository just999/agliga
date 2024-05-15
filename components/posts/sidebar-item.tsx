'use client';

import { usePathname, useRouter } from 'next/navigation';

import Link from 'next/link';
import Image from 'next/image';
import { IconType } from 'react-icons';
import { Button } from '../ui/button';

type SidebarItemProps = {
  label: string;
  icon: IconType;
  href: string;
  // active: boolean;
};

const SidebarItem = ({ label, icon: Icon, href }: SidebarItemProps) => {
  const pathname = usePathname();
  // const active = pathname === href;
  const router = useRouter();

  const active =
    (pathname === '/' && href === '/') ||
    pathname === href ||
    pathname.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <Button
      onClick={onClick}
      variant={active ? 'default' : 'outline'}
      className='justify-start h-[52px] '
      asChild
    >
      <Link href={href} className='flex flex-row gap-2 '>
        <Icon size={24} />
        <span className='text-xs '>{label}</span>
      </Link>
    </Button>
  );
};

export default SidebarItem;
