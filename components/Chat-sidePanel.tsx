'use client';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const ChatSidePanel = ({ isOpen, setIsOpen }: Props) => {
  return (
    <div className='absolute w-10 top-0 left-1 h-full'>
      <div
        className={`h-full w-10 bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        {/* Panel content goes here */}
        <h2 className='p-4 text-lg font-bold'>Side Panel</h2>
        {/* Add more content as needed */}
      </div>
      <button
        className='absolute top-1 right-1 transform translate-x-full -translate-y-1/2 bg-blue-500 text-white p-2 rounded-r'
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '◀' : '▶'}
      </button>
    </div>
  );
};

export default ChatSidePanel;
