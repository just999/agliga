import LoginForm from './login-form';
import { cookies } from 'next/headers';

const LoginPage = () => {
  const csrfToken = cookies().get('authjs.csrf-token')?.value ?? '';
  return (
    <div className='flex items-center justify-center w-1/3 mx-auto p-4'>
      <input type='hidden' name='csrfToken' value={csrfToken} />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
