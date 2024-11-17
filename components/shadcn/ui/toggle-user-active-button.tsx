// 'use client';

// import { useActive } from '@/hooks/use-favorite';
// import useModal from '@/hooks/use-modal';
// import { useToggleActive } from '@/hooks/use-toggle-favorite';
// import { cn } from '@/lib/utils';
// import { SafeUser, UserProps } from '@/types';
// import { User } from '@prisma/client';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { title } from 'process';
// import { useState } from 'react';
// import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

// import { FaUserCheck, FaUserSlash } from 'react-icons/fa';
// import { FaUserGear } from 'react-icons/fa6';

// type ToggleUserActiveButtonProps = {
//   userId: string;
//   size?: number;
//   className?: string;
//   data: User;
// };

// const ToggleUserActiveButton = ({
//   className,
//   size,
//   userId,
//   data,
// }: ToggleUserActiveButtonProps) => {
//   if (!userId) return null;
//   const router = useRouter();
//   const { data: session } = useSession();
//   const curUser = session?.user.curUser;

//   const { modalType, onOpen } = useModal();
//   const [isActive, setIsActive] = useState(data.active);
//   const active = data.active;
//   const { hasActivated, toggleActive, isActivated } = useActive({
//     userId,
//     currentUser: curUser,
//   });
//   const handleActive = () => {
//     const title = active
//       ? `Deactivate ${data.name}?`
//       : `Activate  ${data.name}?`;
//     onOpen('edit-users', userId, title);
//     // setActive((pre) => !pre);
//     router.refresh();
//   };
//   return (
//     <div
//       onClick={handleActive}
//       // onClick={toggleActive}
//       className={cn(
//         'flex flex-row gap-2 hover:opacity-80 transition cursor-pointer',
//         className
//       )}
//     >
//       <FaUserCheck
//         size={size}
//         className='fill-white absolute -top-[2px] -right-[2px]'
//       />

//       <FaUserGear
//         size={size}
//         className={active ? 'fill-rose-300/80' : 'fill-green-300/70'}
//       />
//       <span>
//         {active ? (
//           <span className='text-red-300 font-bold'>Deactivated?</span>
//         ) : (
//           <span className=' text-emerald-300  text-nowrap font-bold'>
//             Activate?
//           </span>
//         )}
//       </span>
//     </div>
//   );
// };

// export default ToggleUserActiveButton;

// 'use client';

// import { FaUserCheck } from 'react-icons/fa';

// import { cn } from '@/lib/utils';
// import { User } from '@prisma/client';
// import useModal from '@/hooks/use-modal';
// import { FaUserGear } from 'react-icons/fa6';

// type ToggleUserActiveButtonProps = {
//   userId: string;
//   size?: number;
//   className?: string;
//   data: User;
// };

// const ToggleUserActiveButton = ({
//   className,
//   size,
//   userId,
//   data,
// }: ToggleUserActiveButtonProps) => {
//   if (!userId) return null;

//   const { onOpen } = useModal();

//   const isActive = data.active;

//   const handleOpenModal = () => {
//     const title = data.active
//       ? `Deactivate ${data.name}?`
//       : `Activate  ${data.name}?`;
//     onOpen('edit-users', userId, title);
//   };

//   return (
//     <div
//       onClick={handleOpenModal}
//       className={cn(
//         'flex flex-row gap-2 hover:opacity-80 transition cursor-pointer',
//         className
//       )}
//     >
//       <FaUserCheck
//         size={size}
//         className='fill-white absolute -top-[2px] -right-[2px]'
//       />
//       <FaUserGear
//         size={size}
//         className={isActive ? 'fill-rose-300/80' : 'fill-green-300/70'}
//       />
//       <span>
//         {isActive ? (
//           <span className='text-red-300 font-bold'>Deactivate?</span>
//         ) : (
//           <span className=' text-emerald-300 text-nowrap font-bold'>
//             Activate?
//           </span>
//         )}
//       </span>
//     </div>
//   );
// };

// export default ToggleUserActiveButton;

'use client';

import { useEffect, useState } from 'react';

import useModal from '@/hooks/use-modal';
import { cn } from '@/lib/utils';
import useUserStore from '@/store/use-active-user-store';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FaUserGear } from 'react-icons/fa6';

import Loader from '../../loader';
import { Button } from './button';

/**
 * Component props
 */
type ToggleUserActiveButtonProps = {
  userId: string;
  size?: number;
  className?: string;
  data: User;
};

const ToggleUserActiveButton = ({
  className,
  size,
  userId,
  data,
}: ToggleUserActiveButtonProps) => {
  const { modalType, onOpen, onClose, id } = useModal();
  const [pendingAction, setPendingAction] = useState<null | (() => void)>(null);

  const router = useRouter();

  // Zustand state management
  const { userActive, loading, error, toggleUserStatus, setLoading, setError } =
    useUserStore();

  // Initialize the active state from Zustand store or fallback to data.active
  const isActive = userActive[userId] ?? data.active;

  /**
   * Handle modal opening
   */
  const handleOpenModal = (
    e: React.MouseEvent<HTMLButtonElement>,
    userId: string
  ) => {
    e.stopPropagation();
    const title = isActive
      ? `Deactivate ${data.name}?`
      : `Activate  ${data.name}?`;
    setPendingAction(() => {
      handleToggleActive;
    }); // Save the action to be performed after confirmation
    onOpen('edit-users', userId, title);
  };

  /**
   * Handle toggle active action
   */
  const handleToggleActive = () => {
    try {
      setLoading(true);
      setError(null);

      toggleUserStatus(userId);
    } catch (err) {
      setError('Failed to toggle user status');
    } finally {
      setLoading(false);
    }
    setPendingAction(null); // Clear the pending action
    onClose(); // Close modal after action
  };

  /**
   * Confirm the pending action from modal
   */
  const confirmAction = () => {
    pendingAction && pendingAction();
  };

  /**
   * Handle modal close and reset pending action
   */
  const handleCloseModal = () => {
    setPendingAction(null);
    close();
  };

  useEffect(() => {
    // console.log('Error:', error);
  }, [error]);

  if (!userId) return null;
  return (
    <Button
      variant='ghost'
      size='sm'
      disabled={loading}
      onClick={(e) => handleOpenModal(e, userId)}
      className={cn(
        'flex flex-row w-full gap-2 hover:opacity-80 transition cursor-pointer',
        className
      )}
    >
      {loading && userId ? (
        <Loader
          className='h-6 w-full mx-auto p-0 m-0 flex flex-row items-center justify-center'
          size={18}
          color='blue'
        />
      ) : (
        <>
          <FaUserGear
            size={size}
            className={isActive ? 'fill-rose-300/80' : 'fill-green-300/70'}
          />
          <div>
            {isActive ? (
              <span className='text-red-300 font-bold'>Deactivate?</span>
            ) : (
              <span className=' text-emerald-300 text-nowrap font-bold'>
                Activate?
              </span>
            )}
          </div>
        </>
      )}
      {error && <div className='text-red-500 text-sm'>{error}</div>}
    </Button>
  );
};

export default ToggleUserActiveButton;
