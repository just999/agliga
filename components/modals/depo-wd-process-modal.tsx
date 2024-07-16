'use client';

// import useDepoWdModal from '@/hooks/use-depo-wd';
import Modal from './modal';
import Heading from '../heading';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';
import useModal from '@/hooks/use-modal';
import { useEffect, useState } from 'react';
import axios from 'axios';

// type DepoWdProcessModalProps = {
//   title?: string | undefined;
// };

const DepoWdProcessModal = () => {
  const [newDelete, setNewDelete] = useState('');
  const [depoWdDelete, setDepoWdDelete] = useState('');
  const router = useRouter();
  // const params = useParams();
  // const id = params.id;
  const { modalType, onOpen, isOpen, onClose, id, title, group, period } =
    useModal();
  // useEffect(() => {
  //   if (period) {
  //     const newPeriod = period?.slice(0, 2) + period?.slice(3);
  //     const newDepoWdProcessModalType = `delete-epl${newPeriod}`;
  //     if (newDepoWdProcessModalType) setNewDelete(newDepoWdProcessModalType);
  //   }
  //   if (modalType === 'delete-depo') setDepoWdDelete('delete-depo');
  //   if (modalType === 'delete-wd') setDepoWdDelete('delete-wd');
  // }, [period, setDepoWdDelete, modalType]);

  const onProcess = async () => {
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
    } else if (modalType === depoWdDelete) {
      const data = {
        id,
        title,
      };
    }
  };

  const bodyContent = (
    <div className='flex flex-col gap-1'>
      {title && (
        <Heading
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
      isOpen={
        isOpen && (modalType === 'depo-process' || modalType === 'wd-process')
      }
      onClose={onClose}
      onSubmit={onProcess}
      actionLabel='Process ?'
      disabled={false}
      body={bodyContent}
      secondaryAction={onClose}
      secondaryActionLabel='cancel'
      // footer={footerContent}
    />
  );
};

export default DepoWdProcessModal;
