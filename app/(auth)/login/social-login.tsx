import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

type SocialLoginProps = {};

const SocialLogin = () => {
  const onClick = (provider: 'google' | 'github') => {
    signIn();
  };
  return (
    <div className='flex items-center w-full gap-2 '>
      <Button
        size='sm'
        className='w-full bg-slate-100 hover:bg-stone-200 shadow-md'
        variant='ghost'
        onClick={() => onClick('google')}>
        <FcGoogle size={24} className='svg ' />
      </Button>
      <Button
        size='sm'
        className='w-full bg-slate-100 hover:bg-stone-200 shadow-md'
        variant='ghost'
        onClick={() => onClick('github')}>
        <FaGithub size={24} className='svg ' />
      </Button>
    </div>
  );
};

export default SocialLogin;
