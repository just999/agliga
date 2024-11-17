'use client';

import { useEffect, useState } from 'react';

import { useEuros, usePenalty } from '@/hooks/use-euro';
import { useGetEuros } from '@/hooks/use-get-schedule';
import useModal from '@/hooks/use-modal';
import { initialEuroFormWithIconValues, team } from '@/lib/helper';
import { cn, findMatchingObjects, noto } from '@/lib/utils';
import { EuroWithIconProps } from '@/types/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { HeadingLogo } from '../shadcn/ui';
import Input from '../shadcn/ui/input';
import SelectInput from '../shadcn/ui/select-input';
import Modal from './modal';

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
      homeHTScore: '',
      awayHTScore: '',
      euroTeamAway: team,
      awayPenalty: [],
      group: euroGroup,
      round: '',
    };
  } else if (modalType === 'edit-euro') {
    initialScheduleValues = {
      date: schedule.date,
      euroTeamHome: schedule.euroTeamHome,
      homePenalty: schedule.homePenalty,
      homeScore: schedule.homeScore,
      awayScore: schedule.awayScore,
      homeHTScore: schedule.homeHTScore,
      awayHTScore: schedule.awayHTScore,
      group: schedule.group,
      round: schedule.round,
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
        homeHTScore: '',
        awayHTScore: '',
        euroTeamAway: team,
        awayPenalty: [],
        group: euroGroup,
        round: '',
      } as any;
      setSchedule(data);

      setValue('euroTeamHome', euroTeamHome);
      setValue('homePenalty', homePenalty);
      setValue('date', new Date(item.date).toISOString().substring(0, 16));
      setValue('euroTeamAway', euroTeamAway);
      setValue('awayPenalty', awayPenalty);
      setValue('homeScore', homeScore);
      setValue('awayScore', awayScore);
      setValue('homeHTScore', homeHTScore);
      setValue('awayHTScore', awayHTScore);
      setValue('group', euroGroup);
      setValue('round', round);
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
        homeHTScore: item.homeHTScore,
        awayHTScore: item.awayHTScore,
        group: item.group,
        round: item.round,
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

      let targetAPen: string[] = [];
      if (item.awayPenalty) {
        targetAPen = item.awayPenalty;
      }
      let targetHPen: string[] = [];
      if (item.homePenalty) {
        targetHPen = item.homePenalty;
      }
      const apen = findMatchingObjects(penalties, targetAPen);
      const hPen = findMatchingObjects(penalties, targetHPen);

      setValue('euroTeamHome', home[0]);
      setValue('homePenalty', hPen);
      setValue('date', new Date(item.date).toISOString().substring(0, 16));
      setValue('euroTeamAway', away[0]);
      setValue('awayPenalty', apen);
      setValue('homeScore', item.homeScore);
      setValue('awayScore', item.awayScore);
      setValue('homeHTScore', item.homeHTScore);
      setValue('awayHTScore', item.awayHTScore);
      setValue('group', item.group);
      setValue('round', item.round);

      // if (item.date instanceof Date) {
      //   const formattedDate = moment(item.date).format('MM/DD/YYYY hh:mm A');
      // } else {
      //   console.warn('item.date is not a valid Date object');
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, item, modalType, setValue, teamsOption]);
  // if (!item.date) return;
  const newDate = new Date(schedule.date).toISOString().substring(0, 16);

  const date = watch('date');
  const euroTeamHome = watch('euroTeamHome');
  const homePenalty = watch('homePenalty');
  const homeScore = watch('homeScore');
  const homeHTScore = watch('homeHTScore');
  const euroTeamAway = watch('euroTeamAway');
  const awayPenalty = watch('awayPenalty');
  const awayScore = watch('awayScore');
  const awayHTScore = watch('awayHTScore');
  const group = watch('group');
  const round = watch('round');

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
        homeHTScore,
        awayHTScore,
        euroTeamAway,
        awayPenalty,
        group,
        round,
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
        homeHTScore,
        awayHTScore,
        euroTeamAway,
        awayPenalty,
        group,
        round,
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
      <HeadingLogo
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

      {modalType === 'edit-euro' && (
        <>
          <SelectInput
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
          )}

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

          <Input
            id='homeHTScore'
            type='text'
            label={homeHTScore ? '' : 'homeHTScore'}
            disabled={isLoading}
            register={register}
            errors={errors}
          />
          {errors.homeHTScore && (
            <span className='text-sm text-red-500 '>
              <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
                Kolom Wajib di isi...
              </span>
            </span>
          )}
        </>
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

      <SelectInput
        label={awayPenalty ? '' : 'awayPenalty'}
        isMulti={true}
        id='awayPenalty'
        register={register}
        value={watch('awayPenalty')}
        onChange={(value) => setCustomValue('awayPenalty', value)}
        placeholder='home penalty'
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
      )}

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
        id='awayHTScore'
        type='text'
        label={awayHTScore ? '' : 'awayHTScore'}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      {errors.awayHTScore && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}

      {group ? (
        <>
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
        </>
      ) : (
        <>
          <Input
            id='round'
            type='text'
            label={round ? '' : 'Round'}
            disabled={isLoading}
            defaultValue={watch('round')}
            register={register}
            errors={errors}
            required
          />

          {errors.round && (
            <span className='text-sm text-red-500 '>
              <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
                Kolom Wajib di isi...
              </span>
            </span>
          )}
        </>
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
