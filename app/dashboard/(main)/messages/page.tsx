import React from 'react';
import {
  getMessagesByContainer,
  getMessagesByContainers,
} from '@/actions/message-actions';

// import MessageClient from './message-client';
import Container from '@/components/container';

import ClientOnly from '@/lib/client-only';
import Loading from '../../loading';
import MessageSidebar from './message-sidebar';
import MessageTable from './message-table';

const MessagesPage = async ({
  searchParams,
}: {
  searchParams: { container: string };
}) => {
  const { messages, nextCursor } = await getMessagesByContainer(
    searchParams.container
  );

  // if (messages) return <Loading />;

  return (
    <>
      <Container className='grid grid-cols-12 gap-5 h-[80vh] mt-10 justify-start xl:p-0 md:p-0 '>
        <div className='col-span-2 '>
          <MessageSidebar />
        </div>
        <div className='col-span-10 justify-self-auto'>
          <MessageTable initialMessages={messages} nextCursor={nextCursor} />
          {/* <MessageClient initialMessages={messages} nextCursor={nextCursor} /> */}
        </div>
      </Container>
    </>
  );
};

export default MessagesPage;
