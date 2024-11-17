import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/ui';
import { Button } from '@/components/shadcn/ui/button';
import { banks } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { User } from '@prisma/client';
import { Landmark, Pencil } from 'lucide-react';
import Link from 'next/link';

type MemberProfileProps = {
  className?: string;
  user: User;
};

const MemberProfile = ({ className, user, ...props }: MemberProfileProps) => {
  const bank = banks.filter((bank) => bank.value === user?.bank);
  return (
    <Card
      className={cn('w-[440px] pt-2 border-0 bg-sky-50', className)}
      {...props}
    >
      <CardHeader className='flex flex-col items-center '>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Your Profile details</CardDescription>
      </CardHeader>

      {user && (
        <CardContent className='grid gap-4'>
          <div className=' flex items-center space-x-4 rounded-md border p-4 bg-green-500 text-gray-50'>
            <Landmark className='svg text-gray-50 ' />
            <div className='flex-1 space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {bank &&
                  bank.map(({ value, icon: Icon }) => (
                    <span
                      key={value}
                      className='flex flex-row items-start gap-2 '
                    >
                      <Icon className='svg text-white' />
                      <span className='text-white font-bold'>{value}</span>
                    </span>
                  ))}
              </p>
              <p className='text-sm text-gray-50'>{user.accountNumber}</p>
            </div>
          </div>
          <div>
            <ul className=' flex flex-col items-start gap-2 bg-emerald-500 text-shadow py-2 rounded-lg text-white'>
              <li className='flex flex-row items-center gap-2 justify-start w-full h-4'>
                <span className='flex h-2 w-2' />
                <p className='text-sm font-medium leading-none'>
                  Name: {user.name}
                </p>
              </li>
              <li className='flex flex-row items-center gap-2 justify-start w-full '>
                <span className='flex  h-2 w-2 ' />
                <span className='space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    Email: {user.email}
                  </p>
                </span>
              </li>
              <li className='flex flex-row items-center gap-2 justify-start w-full '>
                <span className='flex h-2 w-2 ' />
                <span className='space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    Phone: {user.phone}
                  </p>
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      )}
      <CardFooter>
        <Button
          asChild
          className='w-full group bg-sky-500 hover:!bg-sky-500/70 flex flex-row items-center shadow-lg
          text-white'
          variant='ghost'
        >
          <Link href={`/dashboard/members/profile/${user?.id}`}>
            <Pencil className='mr-2 h-4 w-4 svg text-white  group-hover:text-black' />{' '}
            <div className='text-white text-shadow  group-hover:text-black'>
              Edit Your Profile
            </div>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MemberProfile;
