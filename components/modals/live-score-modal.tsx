'use client';

import LiveScore from '../live-score';
import Modal from './modal';
import useModal from '@/hooks/use-modal';

const LiveScoreModal = () => {
  const { modalType, isOpen, onOpen, onClose } = useModal();

  const bodyContent = (
    <div className='flex flex-col gap-1'>
      <LiveScore />
    </div>
  );
  return (
    <Modal
      btnClassName='hidden'
      additionalClass='flex flex-col items-center'
      className='pt-20 w-[1100px] '
      isOpen={isOpen && modalType === 'live'}
      onClose={onClose}
      onSubmit={onClose}
      actionLabel='..'
      disabled={false}
      body={bodyContent}

      // footer={footerContent}
    />
  );
};

export default LiveScoreModal;
