import React from 'react';

import { verifyEmail } from '@/actions/auth-actions';
import CardWrapper from '@/components/card-wrapper';
import ResultMessage from '@/components/result-message';
import Spinner from '@/components/shadcn/ui/spinner';
import { MdOutlineMailOutline } from 'react-icons/md';

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const result = await verifyEmail(searchParams.token);
  return (
    <CardWrapper
      headerText='Verifying your email address'
      headerIcon={MdOutlineMailOutline}
      body={
        <div className='flex flex-col space-y-4 items-center'>
          <div className='flex flex-row items-center '>
            {/* <p>Verifying your email address. Please wait...</p> */}
            {!result && (
              <>
                <Spinner color='blue' />
                Verifying email...
              </>
            )}
          </div>
        </div>
      }
      footer={<ResultMessage result={result} />}
    />
  );
}
