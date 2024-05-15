'use client';

import Link from 'next/link';
import { BsExclamationTriangle } from 'react-icons/bs';

type NotFoundPageProps = {};

const NotFoundPage = () => {
  return (
    <div>
      <div>
        <BsExclamationTriangle />
      </div>
      <div>NotFoundPage</div>
      <Link href='/' className='cursor-pointer '>
        Back to Main Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
