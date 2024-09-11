import ClientOnly from '@/lib/client-only';
import ForgotPasswordForm from './forgot-password-form';

const ForgotPasswordPage = () => {
  return (
    <ClientOnly>
      <ForgotPasswordForm />
    </ClientOnly>
  );
};

export default ForgotPasswordPage;
