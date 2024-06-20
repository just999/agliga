'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './modal';
import Heading from '../heading';
import Input from '../ui/input';
import toast from 'react-hot-toast';

import { useRouter } from 'next/navigation';

import SelectInput from '../select-input';

import useModal from '@/hooks/use-modal';

import { useGetEuros } from '@/hooks/use-get-schedule';

import { EuroWithIconProps } from '@/types';

import { initialEuroFormWithIconValues, team } from '@/lib/helper';
import { useEuros, usePenalty } from '@/hooks/use-euro';
import { cn, findMatchingObjects, noto } from '@/lib/utils';

const EuroModal = () => {
  const [schedule, setSchedule] = useState<EuroWithIconProps>(
    initialEuroFormWithIconValues
  );
  const [isLoading, setIsLoading] = useState(false);
  // const params = useParams();

  // const id = params.id?.toString();

  const {
    modalType,
    isOpen,
    onClose,
    setGroup,
    id,
    group: euroGroup,
  } = useModal();
  const router = useRouter();
  const { getTeams } = useEuros();
  const { getPenalty } = usePenalty();
  const { item, error, items } = useGetEuros(id ? id : undefined);
  let initialScheduleValues;
  if (modalType === 'new-euro') {
    initialScheduleValues = {
      date: new Date(),
      euroTeamHome: team,
      homePenalty: [],
      homeScore: '',
      awayScore: '',
      euroTeamAway: team,
      awayPenalty: [],
      group: euroGroup,
    };
  } else if (modalType === 'edit-euro') {
    initialScheduleValues = {
      date: schedule.date,
      euroTeamHome: schedule.euroTeamHome,
      homePenalty: schedule.homePenalty,
      homeScore: schedule.homeScore,
      awayScore: schedule.awayScore,
      group: schedule.group,
      euroTeamAway: schedule.euroTeamAway,
      awayPenalty: schedule.awayPenalty,
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

  const teamsOption = getTeams();
  const selectTeamHomeOptions = teamsOption.map((euroTeamHome) => ({
    value: euroTeamHome.value,
    icon: euroTeamHome.icon,
  }));

  const selectTeamAwayOptions = teamsOption.map((euroTeamAway) => ({
    value: euroTeamAway.value,
    icon: euroTeamAway.icon,
  }));

  const penalties = getPenalty();
  const penaltyOptions = penalties.map((pen) => ({
    value: pen.value,
    icon: pen.icon,
    desc: pen.desc,
    style: pen.style,
  }));

  useEffect(() => {
    if (modalType === 'new-euro' && !error) {
      const data = {
        date: new Date(),
        euroTeamHome: team,
        homePenalty: [],
        homeScore: '',
        awayScore: '',
        euroTeamAway: team,
        awayPenalty: [],
        group: euroGroup,
      } as any;
      setSchedule(data);

      setValue('euroTeamHome', euroTeamHome);
      setValue('homePenalty', homePenalty);
      setValue('date', new Date(item.date).toISOString().substring(0, 16));
      setValue('euroTeamAway', euroTeamAway);
      setValue('awayPenalty', awayPenalty);
      setValue('homeScore', homeScore);
      setValue('awayScore', awayScore);
      setValue('group', euroGroup);
    }
    if (modalType === 'edit-euro' && item && !error) {
      const data = {
        euroTeamHome: item.euroTeamHome,
        homePenalty: item.homePenalty,
        date: item.date,
        euroTeamAway: item.euroTeamAway,
        awayPenalty: item.awayPenalty,
        homeScore: item.homeScore,
        awayScore: item.awayScore,
        group: item.group,
      };
      setSchedule(data);

      const home: any = teamsOption.filter(
        (team) => team.value === item.euroTeamHome.value
      ) || {
        value: '',
        icon: '',
        group: '',
        played: '',
      };

      const away: any = teamsOption.filter(
        (team) => team.value === item.euroTeamAway.value
      ) || {
        value: '',
        icon: '',
        group: '',
        played: '',
      };

      let targetPen: string[] = [];
      if (item.awayPenalty) {
        targetPen = item.awayPenalty;
      }
      const apen = findMatchingObjects(penalties, targetPen);
      setValue('euroTeamHome', home[0]);
      setValue('homePenalty', item.homePenalty);
      setValue('date', new Date(item.date).toISOString().substring(0, 16));
      setValue('euroTeamAway', away[0]);
      setValue('awayPenalty', apen);
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
  const homePenalty = watch('homePenalty');
  const homeScore = watch('homeScore');
  const euroTeamAway = watch('euroTeamAway');
  const awayPenalty = watch('awayPenalty');
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
        homePenalty,
        homeScore,
        awayScore,
        euroTeamAway,
        awayPenalty,
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
        homePenalty,
        homeScore,
        awayScore,
        euroTeamAway,
        awayPenalty,
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
    setSchedule(initialEuroFormWithIconValues);
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
        optionIconClassName={cn(noto.className)}
        optionClassName='text-base px-2 '
      />
      {errors.euroTeamHome && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}

      {/* <SelectInput
        label={homePenalty ? '' : 'homePenalty'}
        isMulti={true}
        id='homePenalty'
        register={register}
        value={watch('homePenalty')}
        onChange={(value) => setCustomValue('homePenalty', value)}
        placeholder='home penalty'
        options={() => penaltyOptions}
        errors={errors}
        // optionIconClassName='text-yellow-400'
        optionPenaltyClassName='flex flex-row-reverse justify-end gap-0'
        optionClassName='text-sm px-0 font-semibold'
      />
      {errors.homePenalty && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )} */}

      <Input
        id='homeScore'
        type='text'
        label={homeScore ? '' : 'homeScore'}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      {errors.homeScore && (
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
        optionIconClassName={cn(noto.className)}
        optionClassName='text-base px-2 '
      />
      {errors.euroTeamAway && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}

      {/* <Input
        id='awayPenalty'
        type='text'
        label={awayPenalty ? '' : 'awayPenalty'}
        defaultValue={watch('awayPenalty')}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      {errors.awayPenalty && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )} */}
      {/* 
      <SelectInput
        label={awayPenalty ? '' : 'awayPenalty'}
        isMulti={true}
        id='awayPenalty'
        register={register}
        value={watch('awayPenalty')}
        onChange={(value) => setCustomValue('awayPenalty', value)}
        placeholder='away penalty'
        options={() => penaltyOptions}
        errors={errors}
        // optionIconClassName='text-yellow-400'
        optionPenaltyClassName='flex flex-row-reverse justify-end gap-0'
        optionClassName='text-sm px-0 font-semibold'
      />
      {errors.awayPenalty && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )} */}

      <Input
        id='awayScore'
        type='text'
        label={awayScore ? '' : 'awayScore'}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      {errors.awayScore && (
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
        defaultValue={watch('group')}
        register={register}
        errors={errors}
        required
      />
      {errors.group && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}
      {/* <SelectInput
        label={winner ? '' : 'winner'}
        isMulti={false}
        id='winner'
        register={register}
        value={watch('winner')}
        onChange={(value) => setCustomValue('winner', value)}
        placeholder='euroAway'
        options={() => selectTeamHomeOptions}
        errors={errors}
        optionIconClassName={cn(noto.className)}
        optionClassName='text-base px-2 '
      />
      {errors.winner && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}

      <SelectInput
        label={loser ? '' : 'loser'}
        isMulti={false}
        id='loser'
        register={register}
        value={watch('loser')}
        onChange={(value) => setCustomValue('loser', value)}
        placeholder='euroAway'
        options={() => selectTeamHomeOptions}
        errors={errors}
        optionIconClassName={cn(noto.className)}
        optionClassName='text-base px-2 '
      />
      {errors.loser && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}

      <Input
        id='homeGoalDiff'
        type='text'
        label={homeGoalDiff ? '' : 'homeGoalDiff'}
        disabled={isLoading}
        defaultValue={watch('homeGoalDiff')}
        register={register}
        errors={errors}
      />
      {errors.homeGoalDiff && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}
      <Input
        id='awayGoalDiff'
        type='text'
        label={awayGoalDiff ? '' : 'awayGoalDiff'}
        disabled={isLoading}
        defaultValue={watch('awayGoalDiff')}
        register={register}
        errors={errors}
      />
      {errors.awayGoalDiff && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}

       */}
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
