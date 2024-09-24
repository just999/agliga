'use client';

import useModal from '@/hooks/use-modal';

import Modal from './modal';
import { HeadingLogo } from '../ui';
import { title } from 'process';

type UserActiveModalProps = {};

const UserActiveModal = () => {
  const { modalType, onOpen, isOpen, onClose, id, title, group, period } =
    useModal();

  const bodyContent = (
    <div className='flex flex-col gap-1'>
      {title && (
        <HeadingLogo
          title={`${title}?`}
          subtitle={
            <span>
              {title} dengan status{' '}
              <span className='group-highlight font-bold underline text-sky-700'>
                {group}
              </span>{' '}
              ?
            </span>
          }
        />
      )}
    </div>
  );
  return (
    <Modal
      btnClassName='hidden'
      additionalClass='flex flex-col items-center'
      className='pt-20 w-[1100px] '
      // isOpen={isOpen && modalType === 'edit-users'}
      onClose={onClose}
      onSubmit={onClose}
      actionLabel='..'
      disabled={false}
      body={bodyContent}

      // footer={footerContent}
    />
  );
};

export default UserActiveModal;
