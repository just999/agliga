import { useState } from 'react';
import Portal from './portal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ChatModal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className='modal-overlay'>
        <div className='modal-content'>
          {children}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </Portal>
  );
}
