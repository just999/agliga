import { getMessagesByContainer } from '@/actions/message-actions';

// import MessageClient from './message-client';
import Container from '@/components/container';

import MessageSidebar from '../../(main)/messages/message-sidebar';
import MessageTable from '../../(main)/messages/message-table';

const MessagesPage = async ({
  searchParams,
}: {
  searchParams: { container: string };
}) => {
  const { messages, nextCursor } = await getMessagesByContainer(
    searchParams.container
  );

  return (
    <Container className='grid grid-cols-12 gap-5 h-[80vh] mt-10 justify-start xl:p-0 md:p-0 '>
      <div className='col-span-2 bg-slate-200'>
        <MessageSidebar />
      </div>
      <div className='col-span-10 justify-self-auto'>
        <MessageTable initialMessages={messages} nextCursor={nextCursor} />
        {/* <MessageClient initialMessages={messages} nextCursor={nextCursor} /> */}
      </div>
    </Container>
  );
};

export default MessagesPage;
