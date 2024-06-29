'use client';

// import useDepoWdModal from '@/hooks/use-depo-wd';
import Modal from './modal';
import Heading from '../heading';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';
import useModal from '@/hooks/use-modal';
import { useEffect, useState } from 'react';

// type DeleteModalProps = {
//   title?: string | undefined;
// };

const DeleteModal = () => {
  const [newDelete, setNewDelete] = useState('');
  const router = useRouter();
  // const params = useParams();
  // const id = params.id;
  const { modalType, onOpen, isOpen, onClose, id, title, group, period } =
    useModal();
  useEffect(() => {
    if (period) {
      const newPeriod = period?.slice(0, 2) + period?.slice(3);
      const newDeleteModalType = `delete-epl${newPeriod}`;
      if (newDeleteModalType) setNewDelete(newDeleteModalType);
    }
  }, [period]);
  const onDelete = async () => {
    if (modalType === 'delete-post') {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.status === 200) {
          toast.success('Post successfully deleted');
          onClose();
          router.refresh();
          router.push('/posts');
        }
      } catch (err) {
        console.error('Error fetching posts', err);
      }
    } else if (modalType === 'deleteSchedule') {
      try {
        const res = await fetch(`/api/soccer/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.status === 200) {
          toast.success('Post successfully deleted');
          onClose();
          router.refresh();
          router.push('/soccer');
        }
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
    }
    // else if (modalType === 'delete-epl2122') {
    //   try {
    //     const res = await fetch(`/api/fixtures/epl2122/${id}`, {
    //       method: 'DELETE',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }).then((res) => {
    //       if (res.status === 200) {
    //         toast.success('images successfully deleted');
    //         onClose();
    //         router.refresh();
    //       }
    //     });
    //   } catch (err) {
    //     console.error('Error deleting fixture', err);
    //   }
    // } else if (modalType === 'delete-epl2223') {
    //   try {
    //     const res = await fetch(`/api/fixtures/epl2223/${id}`, {
    //       method: 'DELETE',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }).then((res) => {
    //       if (res.status === 200) {
    //         toast.success('images successfully deleted');
    //         onClose();
    //         router.refresh();
    //       }
    //     });
    //   } catch (err) {
    //     console.error('Error deleting fixture', err);
    //   }
    // } else if (modalType === 'delete-epl2324') {
    //   try {
    //     const res = await fetch(`/api/fixtures/epl2324/${id}`, {
    //       method: 'DELETE',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }).then((res) => {
    //       if (res.status === 200) {
    //         toast.success('images successfully deleted');
    //         onClose();
    //         router.refresh();
    //       }
    //     });
    //   } catch (err) {
    //     console.error('Error deleting fixture', err);
    //   }
    // } else if (modalType === 'delete-epl2425') {
    //   try {
    //     const res = await fetch(`/api/fixtures/epl2425/${id}`, {
    //       method: 'DELETE',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }).then((res) => {
    //       if (res.status === 200) {
    //         toast.success('images successfully deleted');
    //         onClose();
    //         router.refresh();
    //       }
    //     });
    //   } catch (err) {
    //     console.error('Error deleting fixture', err);
    //   }
    // }
  };

  const bodyContent = (
    <div className='flex flex-col gap-1'>
      {title && (
        <Heading
          title={`${title}?`}
          subtitle={`Are you sure you want to ${title}?, this action is reversible!`}
        />
      )}
    </div>
  );

  return (
    <Modal
      isOpen={
        isOpen &&
        (modalType === 'delete-post' ||
          modalType === 'deleteSchedule' ||
          modalType === 'delete-slider' ||
          modalType === 'delete-euro' ||
          modalType === newDelete)
      }
      onClose={onClose}
      onSubmit={onDelete}
      actionLabel='Delete'
      disabled={false}
      body={bodyContent}
      secondaryAction={onClose}
      secondaryActionLabel='cancel'
      // footer={footerContent}
    />
  );
};

export default DeleteModal;
