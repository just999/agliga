'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Button } from '../ui/button';
import Btn from '../ui/btn';
import { cn } from '@/lib/utils';

type ModalProps = {
  btnClassName?: string;
  additionalClass?: string;
  className?: string;
  isOpen?: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  reset?: () => void;
  buttonType?: string;
};

const Modal = ({
  additionalClass,
  btnClassName,
  className,
  isOpen,
  onClose,
  onSubmit,
  title,
  reset,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  buttonType,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleCLose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 100);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    if (onSubmit) onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  let btnType;
  if (buttonType) {
    btnType === buttonType;
  } else {
    btnType === 'submit';
  }

  return (
    <div
      className={cn(
        'justify-center items-center flex overflow-x-hidden overflow-scroll top-0 left-0 h-full fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 pt-24 backdrop-blur'
      )}
    >
      <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto '>
        {/* CONTENT */}
        <div
          className={cn(
            `translate  duration-300  h-full`,
            additionalClass,
            showModal ? 'translate-y-0' : 'translate-y-full',
            showModal ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div
            className={cn(
              'translate   h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none ',
              className
            )}
          >
            {/* HEADER */}
            {/* <div className='flex items-center p-4 rounded-t justify-center relative border-b-[1px] '>
                <Button
                  size='icon'
                  variant='ghost'
                  onClick={handleCLose}
                  type='button'
                  className='p-1 border-0 h-7 w-7 hover:opacity-80 hover:bg-rose-600/20 hover:border-solid hover:border-red-600 rounded-full transition absolute left-9 '
                >
                  <IoMdClose size={18} className='w-6 h-6 ' />
                </Button>
                <div className='text-lg font-semibold '>{title}</div>
              </div> */}
            {/* Body */}
            <div className='relative p-4 flex-auto'>
              <Button
                size='icon'
                variant='ghost'
                onClick={handleCLose}
                type='button'
                className='p-1 border-0 h-6 w-6  bg-white text-stone-400 hover:opacity-80 hover:border hover:bg-rose-600/20 hover:border-solid hover:border-red-300 shadow-lg rounded-full transition absolute left-9 '
              >
                <IoMdClose size={18} className='w-6 h-6 ' />
              </Button>
              <div>{body}</div>
            </div>
            {/* footer */}
            <div className='flex flex-col gap-2 px-4 pb-4 '>
              <div className='flex flex-row items-center gap-4 w-full '>
                {secondaryAction && secondaryActionLabel && (
                  <Btn
                    outline
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                  />
                )}
                <Btn
                  type={btnType}
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                  className={cn(btnClassName, onSubmit ? '' : 'hidden')}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
