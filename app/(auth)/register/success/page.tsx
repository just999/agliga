// import Wrapper from '@/components/wrapper-card';
// import { cn } from '@/lib/utils';

// type RegisterSuccessPageProps = {
//   classNames?: string;
// };

// const RegisterSuccessPage = ({ classNames }: RegisterSuccessPageProps) => {
//   return (
//     <Wrapper
//       headerLabel='Registrasi berhasil'
//       backButtonHref='/login'
//       backButtonLabel='Go to login page'
//       classNames={cn(classNames)}>
//       konfirmasi email sudah di kirim ke email anda
//     </Wrapper>
//   );
// };

// export default RegisterSuccessPage;
'use client';

import CardWrapper from '@/components/card-wrapper';
import ClientOnly from '@/lib/client-only';
import { useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';

export default function RegisterSuccessPage() {
  const router = useRouter();

  return (
    <ClientOnly>
      <CardWrapper
        headerText='You have successfully registered'
        subHeaderText='Please verify your email address before you can login'
        action={() => router.push('/login')}
        actionLabel='Go to login'
        headerIcon={FaCheckCircle}
      />
    </ClientOnly>
  );
}
