import { Button } from '@/components/shadcn/ui/button';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

type LoginRegisterButtonProps = {
  type: string;
};

const LoginRegisterButton = ({ type }: LoginRegisterButtonProps) => {
  return (
    <div className='flex items-center w-full gap-2 '>
      <Button
        size='sm'
        className='w-full h-fit bg-slate-50 hover:bg-stone-200 p-0 m-0 py-1'
        variant='ghost'
        asChild
      >
        <Link href='/forgot-password' className='text-xs  text-shadow'>
          Forgot Password
        </Link>
      </Button>

      <Button
        size='sm'
        className='w-full h-fit bg-slate-50 hover:bg-stone-200 p-0 m-0 py-1'
        variant='ghost'
        asChild
      >
        <Link
          href={type === 'register' ? '/login' : '/register'}
          className='text-xs text-shadow'
        >
          {type === 'register' ? 'Login' : 'Register'}
        </Link>
      </Button>
    </div>
  );
};

export default LoginRegisterButton;
