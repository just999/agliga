import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import { Nunito } from 'next/font/google';
import './globals.css';
// import Navbar from '@/components/navbar/navbar';

import { auth } from '@/auth';

import { cn } from '@/lib/utils';

import Footer from '@/components/footer';

import { SessionProvider } from 'next-auth/react';

import GoogleCaptchaWrapper from './captcha-wrapper';
import {
  // UserProfileModal,
  // SoccerModal,
  // LiveScoreModal,
  DeleteModal,
  // DepositWdModal,
  // PostModal,
  // SliderModal,
  // NoUserModal,
  // AuthModal,
  TopicModal,
  EuroModal,
  FixtureModal,
  DepoWdProcessModal,
  // UserActiveModal,
  // UserActiveModal,
} from '@/components/modals';

import TopNav from '@/components/navbar/top-nav';
import NewWidget from '@/components/chat/new-widget';
import Providers from '@/components/providers/providers';
import { TopLevelRenderer } from '@/components/top-level-rendered';
import ErrorBoundary from '@/lib/error-boundary';
import { cookies } from 'next/headers';
import { getAnonymousUserBySessionId } from '@/actions/live-chat-actions';

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
  const session = await auth();

  const userId = session?.user.id || null;

  const cookieStore = cookies();
  const sessionId = cookieStore.get('anonymousId')?.value || null;
  let res;
  if (sessionId) {
    res = await getAnonymousUserBySessionId(sessionId);
  }

  const anonymousUserId =
    res?.status === 'success' ? res.data.id : res?.error.toString();

  const newUserId = session ? userId : anonymousUserId;

  const profileComplete = session?.user.profileComplete as boolean;

  return (
    <html lang='en' className='relative'>
      <body
        className={cn(
          'flex flex-col overflow-x-hidden overflow-y-auto',
          inter.className,
          className
        )}
        suppressHydrationWarning>
        <SessionProvider session={session}>
          <ErrorBoundary>
            <Providers userId={newUserId} profileComplete={profileComplete}>
              <GoogleCaptchaWrapper>
                {/* <UserActiveModal /> */}
                <DepoWdProcessModal />
                <FixtureModal />
                <EuroModal />
                {/* <UserProfileModal /> */}
                {/* <SoccerModal /> */}
                <TopicModal />
                {/* <LiveScoreModal /> */}
                <DeleteModal />
                {/* <DepositWdModal /> */}
                {/* <PostModal /> */}
                {/* <AddPostModal /> */}
                {/* <SliderModal /> */}
                {/* <SearchModal /> */}
                {/* <NoUserModal /> */}
                {/* <AuthModal /> */}
                <TopNav />
                <TopLevelRenderer />
                {/* <Navbar currentUser={currentUser} /> */}
                <div className='pb-20 flex-1'>{children}</div>
                <div className='fixed flex w-13 h-13 m-0 p-0 bottom-4 right-2 z-10'>
                  {/* <ChatWidget /> */}
                  <NewWidget />
                </div>
                <Footer />
              </GoogleCaptchaWrapper>
            </Providers>
          </ErrorBoundary>
        </SessionProvider>
      </body>
    </html>
  );
}
