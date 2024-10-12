// components/ModalWrapper.tsx
'use client';

import React, { useState } from 'react';
import ChatModal from './chat-modal';

interface ModalWrapperProps {
  children: React.ReactNode;
}

export default function ModalWrapper({ children }: ModalWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <ChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {children}
      </ChatModal>
    </>
  );
}
