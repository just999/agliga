import ClientOnly from '@/lib/client-only';
import AuthModal from './auth-modal';

type AuthenticationModalProps = {};

const AuthenticationModal = () => {
  return (
    <ClientOnly>
      <AuthModal />
    </ClientOnly>
  );
};

export default AuthenticationModal;
