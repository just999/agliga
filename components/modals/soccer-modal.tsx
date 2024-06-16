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

import { useRuns, useTeams } from '@/hooks/use-teams';

import { useGetSchedules } from '@/hooks/use-get-schedule';

import { ScheduleProps } from '@/types';

import { initialScheduleFormValues } from '@/lib/helper';

const SoccerModal = () => {
  const [schedule, setSchedule] = useState<ScheduleProps>(
    initialScheduleFormValues
  );
  const [isLoading, setIsLoading] = useState(false);

  const { modalType, isOpen, onClose, id } = useModal();
  const router = useRouter();
  const { getTeams, getByValue } = useTeams();
  const { getRuns, getRunsByValue } = useRuns();
  const { item, error } = useGetSchedules(id ? id : undefined);
  let initialScheduleValues;
  if (modalType === 'soccer') {
    initialScheduleValues = {
      run: '',
      date: '',
      teamHome: '',
      score: '',
      teamAway: '',
      analysis: '',
    };
  } else if (modalType === 'editSoccer') {
    initialScheduleValues = {
      run: schedule.run,
      date: schedule.date,
      teamHome: schedule.teamHome,
      score: schedule.score,
      teamAway: schedule.teamAway,
      analysis: schedule.analysis,
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
  const runs = getRuns();
  const selectRunOptions = runs.map((run) => ({
    value: run.value,
    icon: run.icon,
  }));

  const teamsOption = getTeams();
  const selectTeamHomeOptions = teamsOption.map((teamHome) => ({
    value: teamHome.value,
    icon: teamHome.icon,
  }));

  const selectTeamAwayOptions = teamsOption.map((teamAway) => ({
    value: teamAway.value,
    icon: teamAway.icon,
  }));

  useEffect(() => {
    if (modalType === 'editSoccer' && item && !error) {
      const data = {
        run: item.run,
        teamHome: item.teamHome,
        date: item.date,
        teamAway: item.teamAway,
        score: item.score,
        analysis: item.analysis,
      };
      setSchedule(data);
      const periodRun: any = runs.filter(
        (period) => period.value === item.run
      ) || {
        icon: '',
        value: '',
      };
      const home: any = teamsOption.filter(
        (team) => team.value === item.teamHome
      ) || {
        icon: '',
        value: '',
      };
      const away: any = teamsOption.filter(
        (team) => team.value === item.teamAway
      ) || {
        icon: '',
        value: '',
      };
      setValue('run', periodRun[0]);
      setValue('teamHome', home[0]);
      setValue('date', new Date(item.date).toISOString().substring(0, 16));
      setValue('teamAway', away[0]);
      setValue('score', item.score);
      setValue('analysis', item.analysis);

      // if (item.date instanceof Date) {
      //   const formattedDate = moment(item.date).format('MM/DD/YYYY hh:mm A');
      // } else {
      //   console.warn('item.date is not a valid Date object');
      // }
    }
  }, [error, item, modalType, runs, setValue, teamsOption]);

  // if (!item.date) return;
  const newDate = new Date(schedule.date).toISOString().substring(0, 16);

  const run = watch('run');
  const date = watch('date');
  const teamHome = watch('teamHome');
  const score = watch('score');
  const teamAway = watch('teamAway');
  const analysis = watch('analysis');
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
    if (modalType === 'soccer') {
      data = {
        run: run.value,
        date,
        teamHome: teamHome.value,
        score,
        teamAway: teamAway.value,
        analysis,
      };
      try {
        axios
          .post('/api/soccer', data)
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
    } else if (modalType === 'editSoccer') {
      data = {
        run: run.value,
        date,
        score,
        teamHome: teamHome.value,
        teamAway: teamAway.value,
        analysis,
      };
      try {
        const res = axios
          .put(`/api/soccer/${id}`, data)
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
    setSchedule(initialScheduleFormValues);
    reset();
  };

  const bodyContent = (
    <div className='flex flex-col gap-1'>
      <Heading
        title={modalType === 'soccer' ? 'New Matches' : 'Edit Matches'}
        subtitle={
          modalType === 'soccer' ? 'Running period?' : 'Editing Matches'
        }
      />

      <SelectInput
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
      )}

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
        label={teamHome ? '' : 'teamHome'}
        isMulti={false}
        id='teamHome'
        register={register}
        required
        value={watch('teamHome')}
        onChange={(value) => setCustomValue('teamHome', value)}
        placeholder='Team Home'
        options={() => selectTeamHomeOptions}
        errors={errors}
      />
      {errors.teamHome && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}

      <Input
        id='score'
        type='text'
        label={score ? '' : 'score'}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.score && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}

      <SelectInput
        label={teamAway ? '' : 'teamAway'}
        isMulti={false}
        id='teamAway'
        register={register}
        required
        value={watch('teamAway')}
        onChange={(value) => setCustomValue('teamAway', value)}
        placeholder='Team Away'
        options={() => selectTeamAwayOptions}
        errors={errors}
      />
      {errors.teamAway && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}

      <Input
        id='analysis'
        type='text'
        label={analysis ? '' : 'Analysis'}
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
      isOpen={isOpen && (modalType === 'soccer' || modalType === 'editSoccer')}
      onClose={handleCloseClearForm}
      onSubmit={handleSubmit(onSubmit)}
      title={modalType === 'soccer' ? 'New Match' : 'Edit Match'}
      actionLabel='Submit'
      disabled={isLoading}
      body={bodyContent}
      // reset={handleClearForm}
      // footer={footerContent}
    />
  );
};

export default SoccerModal;
