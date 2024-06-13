'use client';

// import useDepoWdModal from '@/hooks/use-depo-wd';
import Modal from './modal';
import Heading from '../heading';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';
import useModal from '@/hooks/use-modal';

// type DeleteModalProps = {
//   title?: string | undefined;
// };

const DeleteModal = () => {
  const router = useRouter();
  // const params = useParams();
  // const id = params.id;
  const { modalType, onOpen, isOpen, onClose, id, title } = useModal();

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
    }
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
          modalType === 'delete-euro')
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
