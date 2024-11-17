// 'use client';

// // import useDepoWdModal from '@/hooks/use-depo-wd';
// import Modal from './modal';
// import Heading from '../heading';
// import { useRouter } from 'next/navigation';

// import toast from 'react-hot-toast';
// import useModal from '@/hooks/use-modal';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { fetchUserById } from '@/lib/queries/users';
// import useUserStore from '@/store/use-active-user-store';
// import { useForm, FieldValues } from 'react-hook-form';
// import { useGetUsers } from '@/hooks/use-get-users';
// import Loader from '../loader';

// // type DepoWdProcessModalProps = {
// //   title?: string | undefined;
// // };

// interface DataProps {
//   id: string;
//   title?: string;
//   isActive?: boolean;
// }

// const DepoWdProcessModal = () => {
//   const [isActive, setIsActive] = useState<boolean>();
//   const [newDelete, setNewDelete] = useState('');
//   const [depoWdDelete, setDepoWdDelete] = useState('');
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const router = useRouter();
//   // const params = useParams();
//   // const id = params.id;
//   const { modalType, onOpen, isOpen, onClose, id, title, group, period } =
//     useModal();

//   const { user, users, loading, setLoading } = useGetUsers(id ? id : undefined);
//   // let items;
//   // if (modalType === 'edit-users') {
//   //   items = {
//   //     active: user.active,
//   //   };
//   // }
//   // const {
//   //   register,
//   //   handleSubmit,
//   //   setValue,
//   //   watch,
//   //   formState: { errors },
//   //   reset,
//   // } = useForm<FieldValues>({
//   //   defaultValues: items,
//   // });
//   // useEffect(() => {
//   //   if (period) {
//   //     const newPeriod = period?.slice(0, 2) + period?.slice(3);
//   //     const newDepoWdProcessModalType = `delete-epl${newPeriod}`;
//   //     if (newDepoWdProcessModalType) setNewDelete(newDepoWdProcessModalType);
//   //   }
//   //   if (modalType === 'delete-depo') setDepoWdDelete('delete-depo');
//   //   if (modalType === 'delete-wd') setDepoWdDelete('delete-wd');
//   // }, [period, setDepoWdDelete, modalType]);

//   // const { userActive, toggleUserStatus, setError } = useUserStore();
//   useEffect(() => {
//     setLoading(true);
//     if (user?.active !== null && typeof user.active === 'boolean')
//       setIsActive(user.active);
//     setLoading(false);
//   }, [user.active, setIsActive, setLoading]);

//   if (!user) return null;
//   const onSubmit = async () => {
//     if (modalType === 'depo-process') {
//       const data = {
//         status: group,
//       };
//       try {
//         const res = axios.put(`/api/depo/${id}`, data).then(() => {
//           toast.success('depo berhasil di process');
//           router.refresh();
//           onClose();
//         });
//       } catch (err) {
//         console.error('Error fetching posts', err);
//       }
//     } else if (modalType === 'wd-process') {
//       const data = {
//         status: group,
//       };
//       try {
//         const res = axios.put(`/api/wd/${id}`, data).then(() => {
//           toast.success('wd berhasil di process');
//           router.refresh();
//           onClose();
//         });
//       } catch (err) {
//         console.error('Error fetching soccer', err);
//       }
//     } else if (modalType === 'delete-slider') {
//       try {
//         const res = await fetch(`/api/sliders/${id}`, {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }).then((res) => {
//           if (res.status === 200) {
//             toast.success('images successfully deleted');
//             onClose();
//             router.refresh();
//           }
//         });
//         // if (res.status === 200) {
//         //   toast.success('Images successfully deleted');
//         //   onClose();
//         //   router.refresh();
//         //   router.push('/sliders');
//         // }
//       } catch (err) {
//         console.error('Error fetching image', err);
//       }
//     } else if (modalType === 'delete-euro') {
//       try {
//         const res = await fetch(`/api/euro/${id}`, {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }).then((res) => {
//           if (res.status === 200) {
//             toast.success('images successfully deleted');
//             onClose();
//             router.refresh();
//           }
//         });
//       } catch (err) {
//         console.error('Error Deleting euro schedule', err);
//       }
//     } else if (modalType === newDelete) {
//       const data = {
//         id,
//         period,
//         title,
//       };
//       try {
//         await fetch(`/api/fixtures/${id}`, {
//           method: 'DELETE',
//           body: JSON.stringify(data),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }).then((res) => {
//           if (res.status === 200) {
//             toast.success('images successfully deleted');
//             onClose();
//             router.refresh();
//           }
//         });
//       } catch (err) {
//         console.error('Error deleting fixture', err);
//       }
//     } else if (modalType === 'edit-users') {
//       const data = {
//         id,
//         title,
//         active: typeof isActive === 'boolean' ? isActive : undefined,
//       } as DataProps;
//       if (!data.id) throw new Error('No id found');
//       // const user = await fetchUserById(data.id);
//       // if (!user) throw new Error('No user found');

//       // const active = user.active;
//       if (isActive === null) setLoading(true);
//       if (isActive !== null) {
//         setLoading(false);
//         // setIsActive((prev) => !prev);
//       }
//       try {
//         // await fetch(`/api/users/${user?.id}`, {
//         //   method: 'POST',
//         //   body: JSON.stringify(data),
//         //   headers: {
//         //     'Content-Type': 'application/json',
//         //   },
//         // }).then((res) => {
//         //   if (res.status === 200) {
//         //     toast.success('users is updated');
//         //     onClose();
//         //     router.refresh();
//         //   }
//         // });
//         const res = axios.post(`/api/users/${id}`, data).then(() => {
//           toast.success('successfully update user');
//           router.refresh();
//           onClose();
//         });
//       } catch (err) {
//         console.error('Error updating user', err);
//       }
//     }
//   };

//   const bodyContent = (
//     <div className='flex flex-col gap-1'>
//       {title && (
//         <Heading
//           title={`${title}?`}
//           subtitle={
//             <span>
//               {title} dengan status{' '}
//               <span className='group-highlight font-bold underline text-sky-700'>
//                 {group}
//               </span>{' '}
//               ?
//             </span>
//           }
//         />
//       )}
//       {loading ? (
//         <Loader size={20} className='h-8 w-full' />
//       ) : (
//         <span>{isActive ? 'true' : 'false'}</span>
//       )}
//     </div>
//   );

//   return (
//     <Modal
//       isOpen={
//         isOpen &&
//         (modalType === 'depo-process' ||
//           modalType === 'wd-process' ||
//           modalType === 'edit-users')
//       }
//       onClose={onClose}
//       onSubmit={onSubmit}
//       actionLabel='Process ?'
//       disabled={loading}
//       body={bodyContent}
//       secondaryAction={onClose}
//       secondaryActionLabel='cancel'
//       // footer={footerContent}
//     />
//   );
// };

// export default DepoWdProcessModal;

'use client';

import { useEffect, useState } from 'react';

import useModal from '@/hooks/use-modal';
import { fetchUserById } from '@/lib/queries/users';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { HeadingLogo, Spinner } from '../shadcn/ui';
import Modal from './modal';

interface DataProps {
  id: string;
  title?: string;
  isActive?: boolean;
}

const DepoWdProcessModal = () => {
  const [isActive, setIsActive] = useState<boolean>();
  const [newDelete, setNewDelete] = useState('');
  const [depoWdDelete, setDepoWdDelete] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();

  const { modalType, isOpen, onClose, id, title, group, period } = useModal();

  useEffect(() => {
    const fetchUser = async () => {
      if (!id || id === undefined) return;
      const res = await fetchUserById(id);

      if (res) setUserData(res);
    };

    fetchUser();
  }, [id, setUserData]);

  useEffect(() => {
    setLoading(true);
    if (userData?.active !== null && typeof userData?.active === 'boolean')
      setIsActive(userData.active);
    setLoading(false);
  }, [userData?.active, setIsActive, setLoading]);

  const onSubmit = async () => {
    if (modalType === 'depo-process') {
      const data = {
        status: group,
      };
      try {
        const res = axios.put(`/api/depo/${id}`, data).then(() => {
          toast.success('depo berhasil di process');
          router.refresh();
          onClose();
        });
      } catch (err) {
        console.error('Error fetching posts', err);
      }
    } else if (modalType === 'wd-process') {
      const data = {
        status: group,
      };
      try {
        const res = axios.put(`/api/wd/${id}`, data).then(() => {
          toast.success('wd berhasil di process');
          router.refresh();
          onClose();
        });
      } catch (err) {
        console.error('Error fetching soccer', err);
      }
    } else if (modalType === 'delete-slider') {
      try {
        const res = await fetch(`/api/sliders/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (res.status === 200) {
            toast.success('images successfully deleted');
            onClose();
            router.refresh();
          }
        });
        // if (res.status === 200) {
        //   toast.success('Images successfully deleted');
        //   onClose();
        //   router.refresh();
        //   router.push('/sliders');
        // }
      } catch (err) {
        console.error('Error fetching image', err);
      }
    } else if (modalType === 'delete-euro') {
      try {
        const res = await fetch(`/api/euro/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (res.status === 200) {
            toast.success('images successfully deleted');
            onClose();
            router.refresh();
          }
        });
      } catch (err) {
        console.error('Error Deleting euro schedule', err);
      }
    } else if (modalType === newDelete) {
      const data = {
        id,
        period,
        title,
      };
      try {
        await fetch(`/api/fixtures/${id}`, {
          method: 'DELETE',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (res.status === 200) {
            toast.success('images successfully deleted');
            onClose();
            router.refresh();
          }
        });
      } catch (err) {
        console.error('Error deleting fixture', err);
      }
    } else if (modalType === 'edit-users') {
      const data = {
        id,
        title,
        active: typeof isActive === 'boolean' ? isActive : undefined,
      } as DataProps;
      if (!data.id) throw new Error('No id found');
      // const user = await fetchUserById(data.id);
      // if (!user) throw new Error('No user found');

      // const active = user.active;
      if (isActive === null) setLoading(true);
      if (isActive !== null) {
        setLoading(false);
        // setIsActive((prev) => !prev);
      }
      try {
        // await fetch(`/api/users/${user?.id}`, {
        //   method: 'POST',
        //   body: JSON.stringify(data),
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // }).then((res) => {
        //   if (res.status === 200) {
        //     toast.success('users is updated');
        //     onClose();
        //     router.refresh();
        //   }
        // });
        const res = axios.post(`/api/users/${id}`, data).then(() => {
          toast.success('successfully update user');
          router.refresh();
          onClose();
        });
      } catch (err) {
        console.error('Error updating user', err);
      }
    }
  };

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
      {loading ? (
        <Spinner size={20} className='h-8 w-full' />
      ) : (
        <span>{isActive ? 'true' : 'false'}</span>
      )}
    </div>
  );

  return (
    <Modal
      isOpen={
        isOpen &&
        (modalType === 'depo-process' ||
          modalType === 'wd-process' ||
          modalType === 'edit-users')
      }
      onClose={onClose}
      onSubmit={onSubmit}
      actionLabel='Process ?'
      disabled={loading}
      body={bodyContent}
      secondaryAction={onClose}
      secondaryActionLabel='cancel'
      // footer={footerContent}
    />
  );
};

export default DepoWdProcessModal;
