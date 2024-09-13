'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

type ClientSideNavProps = {
  children: (props: { pathname: string | null }) => React.ReactNode;
};

const ClientSideNav: React.FC<ClientSideNavProps> = ({ children }) => {
  const pathname = usePathname();

  return <>{children({ pathname })}</>;
};

export default ClientSideNav;
