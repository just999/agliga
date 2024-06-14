'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './modal';
import Heading from '../heading';
import Input from '../ui/input';
import toast from 'react-hot-toast';

import { useParams, useRouter } from 'next/navigation';

import SelectInput from '../select-input';

import useModal from '@/hooks/use-modal';

import { useGetEuros } from '@/hooks/use-get-schedule';

import { EuroProps } from '@/types';

import { initialEuroFormValues } from '@/lib/helper';
import { useEuros } from '@/hooks/use-euro';

const EuroModal = () => {
  const [schedule, setSchedule] = useState<EuroProps>(initialEuroFormValues);
  const [isLoading, setIsLoading] = useState(false);
  // const params = useParams();

  // const id = params.id?.toString();

  const { modalType, isOpen, onClose, id, group: euroGroup } = useModal();
  const router = useRouter();
  const { getTeams } = useEuros();
  const { item, error, items } = useGetEuros(id ? id : undefined);
  let initialScheduleValues;
  if (modalType === 'new-euro') {
    initialScheduleValues = {
      date: new Date(),
      euroTeamHome: {
        value: '',
        icon: '',
      },
      homeScore: '',
      status: '',
      awayScore: '',
      euroTeamAway: {
        value: '',
        icon: '',
      },
      group: euroGroup,
    };
  } else if (modalType === 'edit-euro') {
    initialScheduleValues = {
      date: schedule.date,
      euroTeamHome: schedule.euroTeamHome,
      homeScore: schedule.homeScore,
      awayScore: schedule.awayScore,
      group: schedule.group,
      euroTeamAway: schedule.euroTeamAway,
    };
  }
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: initialScheduleValues,
  });

  const teams = getTeams();
  const selectRunOptions = teams.map((team) => ({
    value: team.value,
    icon: team.icon,
  }));

  const teamsOption = getTeams();
  const selectTeamHomeOptions = teamsOption.map((euroTeamHome) => ({
    value: euroTeamHome.value,
    icon: euroTeamHome.icon,
  }));

  const selectTeamAwayOptions = teamsOption.map((euroTeamAway) => ({
    value: euroTeamAway.value,
    icon: euroTeamAway.icon,
  }));

  useEffect(() => {
    if (modalType === 'new-euro' && !error) {
      const data = {
        date: new Date(),
        euroTeamHome: {
          value: '',
          icon: '',
        },
        homeScore: '',
        status: '',
        awayScore: '',
        euroTeamAway: {
          value: '',
          icon: '',
        },
        group: euroGroup,
      } as any;

      setSchedule(data);

      setValue('euroTeamHome', euroTeamHome);
      setValue('date', new Date(item.date).toISOString().substring(0, 16));
      setValue('euroTeamAway', euroTeamAway);
      setValue('homeScore', homeScore);
      setValue('awayScore', awayScore);
      setValue('group', euroGroup);
    }
    if (modalType === 'edit-euro' && item && !error) {
      const data = {
        euroTeamHome: item.euroTeamHome,
        date: item.date,
        euroTeamAway: item.euroTeamAway,
        status: item.status,
        homeScore: item.homeScore,
        awayScore: item.awayScore,
        group: item.group,
      };
      setSchedule(data);

      const home: any = teamsOption.filter(
        (team) => team.value === item.euroTeamHome.value
      ) || {
        icon: '',
        value: '',
      };

      const away: any = teamsOption.filter(
        (team) => team.value === item.euroTeamAway.value
      ) || {
        icon: '',
        value: '',
      };

      setValue('euroTeamHome', item.euroTeamHome);
      setValue('date', new Date(item.date).toISOString().substring(0, 16));
      setValue('euroTeamAway', item.euroTeamAway);
      setValue('homeScore', item.homeScore);
      setValue('awayScore', item.awayScore);
      setValue('group', item.group);

      // if (item.date instanceof Date) {
      //   const formattedDate = moment(item.date).format('MM/DD/YYYY hh:mm A');
      // } else {
      //   console.warn('item.date is not a valid Date object');
      // }
    } else if (modalType === 'new-euro') {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, item, modalType, setValue, teamsOption]);

  // if (!item.date) return;
  const newDate = new Date(schedule.date).toISOString().substring(0, 16);

  const date = watch('date');
  const euroTeamHome = watch('euroTeamHome');
  const homeScore = watch('homeScore');
  const euroTeamAway = watch('euroTeamAway');
  const awayScore = watch('awayScore');
  const group = watch('group');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  // if (!isMounted) return null;
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    // const gameValues: GameProps = data.game.map((val: any) => val.value);
    if (modalType === 'new-euro') {
      data = {
        date,
        euroTeamHome,
        homeScore,
        awayScore,
        euroTeamAway,
        group,
      };
      try {
        axios
          .post('/api/euro', data)
          .then(() => {
            toast.success('Deposit form success di kirim!');
            router.refresh();
            reset();
            onClose();
          })
          .catch((error) => {
            toast.error('Something Went Wrong', error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        console.error(err);
      }
    } else if (modalType === 'edit-euro') {
      data = {
        date,
        euroTeamHome,
        homeScore,
        awayScore,
        euroTeamAway,
        group,
      };
      try {
        const res = axios
          .put(`/api/euro/${id}`, data)
          .then(() => {
            toast.success('Schedule successfully edited');
            router.refresh();
            reset();
            onClose();
          })
          .catch((err) => {
            toast.error('Something went wrong', err);
          })
          .finally(() => setIsLoading(false));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCloseClearForm = () => {
    onClose();
    setSchedule(initialEuroFormValues);
    reset();
  };

  const bodyContent = (
    <div className='flex flex-col gap-1'>
      <Heading
        title={modalType === 'new-euro' ? 'New Euro' : 'Edit Euro'}
        subtitle={
          modalType === 'new-euro' ? 'Add new Euro Schedule?' : 'Editing Euro'
        }
      />
      <Input
        type='datetime-local'
        id='date'
        label={date ? '' : 'Time'}
        defaultValue={newDate}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.date && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}

      {/* <SelectInput
        label={run ? '' : 'run'}
        isMulti={false}
        id='run'
        register={register}
        required
        value={watch('run')}
        onChange={(value) => setCustomValue('run', value)}
        placeholder='Run'
        options={() => selectRunOptions}
        errors={errors}
      />

      {errors.run && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )} */}

      <SelectInput
        label={euroTeamHome ? '' : 'euroTeamHome'}
        isMulti={false}
        id='euroTeamHome'
        register={register}
        required
        value={watch('euroTeamHome')}
        onChange={(value) => setCustomValue('euroTeamHome', value)}
        placeholder='euroHome'
        options={() => selectTeamHomeOptions}
        errors={errors}
      />
      {errors.euroTeamHome && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}

      <Input
        id='homeScore'
        type='text'
        label={homeScore ? '' : 'homeScore'}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      {errors.score && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}

      <SelectInput
        label={euroTeamAway ? '' : 'euroTeamAway'}
        isMulti={false}
        id='euroTeamAway'
        register={register}
        required
        value={watch('euroTeamAway')}
        onChange={(value) => setCustomValue('euroTeamAway', value)}
        placeholder='euroAway'
        options={() => selectTeamAwayOptions}
        errors={errors}
      />
      {errors.euroTeamAway && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}
      <Input
        id='awayScore'
        type='text'
        label={awayScore ? '' : 'awayScore'}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      {errors.score && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}

      <Input
        id='group'
        type='text'
        label={group ? '' : 'Group'}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.analysis && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen && (modalType === 'new-euro' || modalType === 'edit-euro')}
      onClose={handleCloseClearForm}
      onSubmit={handleSubmit(onSubmit)}
      title={modalType === 'new-euro' ? 'add-euro' : 'Edit Euro'}
      actionLabel='Submit'
      disabled={isLoading}
      body={bodyContent}
      // reset={handleClearForm}
      // footer={footerContent}
    />
  );
};

export default EuroModal;
