import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/navbar';

import ToasterProvider from '@/providers/toaster-provider';

import { auth } from '@/auth';

import { cn } from '@/lib/utils';

import Footer from '@/components/footer';

import { SessionProvider } from 'next-auth/react';

import getCurrentUser from '@/actions/get-user';

import GoogleCaptchaWrapper from './captcha-wrapper';
import {
  UserProfileModal,
  SoccerModal,
  LiveScoreModal,
  DeleteModal,
  DepositWdModal,
  PostModal,
  SliderModal,
  NoUserModal,
  AuthModal,
  TopicModal,
  EuroModal,
} from '@/components/modals';
import FixtureModal from '@/components/modals/fixture-modal';
import DepoWdProcessModal from '@/components/modals/depo-wd-process-modal';

// import EuroModal from '@/components/modals/euro-modal';

const inter = Nunito({ subsets: ['latin'], preload: true });

export const metadata: Metadata = {
  title: 'AL',
  description: 'agenliga',
};

type RootLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export default async function RootLayout({
  children,
  className,
}: Readonly<RootLayoutProps>) {
  const currentUser = await getCurrentUser();
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang='en' className='relative'>
        <body
          className={cn(
            'flex flex-col   overflow-x-hidden ',
            inter.className,
            className
          )}
          suppressHydrationWarning={true}
        >
          <GoogleCaptchaWrapper>
            <ToasterProvider />
            <DepoWdProcessModal />
            <FixtureModal />
            <EuroModal />
            <UserProfileModal />
            <SoccerModal />
            <TopicModal />
            <LiveScoreModal />
            <DeleteModal />
            <DepositWdModal />
            <PostModal />
            {/* <AddPostModal /> */}
            <SliderModal />
            {/* <SearchModal /> */}
            <NoUserModal />
            <AuthModal />
            <Navbar currentUser={currentUser} />
            <div className='pb-20 flex-1'>{children}</div>
            <div>
              <Footer />
            </div>
          </GoogleCaptchaWrapper>
        </body>
      </html>
    </SessionProvider>
  );
}
