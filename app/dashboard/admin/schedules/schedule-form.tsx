'use client';

import { createSchedule } from '@/actions/schedule-actions';

import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Spinner,
  HeadingLogo,
  SelectInput,
  InputCustom,
} from '@/components/ui';

import { useTeams, useWeeks } from '@/hooks/use-teams';
import { cn, handleFormServerErrors } from '@/lib/utils';

import { scheduleSchema, ScheduleSchema } from '@/schemas/schedules-schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { CalendarCog } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type ScheduleFormProps = {};

const ScheduleForm = () => {
  const router = useRouter();
  const { getWeeks } = useWeeks();
  const { getTeams } = useTeams();
  const teamsOption = getTeams();

  const teamOptions = teamsOption.map((team) => ({
    value: team.value,
    icon: team.icon,
  }));

  const runs = getWeeks();
  const selectRunOptions = runs.map((run) => ({
    value: run.value,
    icon: run.icon,
  }));
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { errors, isValid, isSubmitting, isDirty, isLoading },
  } = useForm<ScheduleSchema>({
    resolver: zodResolver(scheduleSchema),
    mode: 'onTouched',
  });

  const setCustomValue = (id: any, value: any) => {
    if (setValue) {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  const onSubmit = async () => {
    const data = JSON.parse(JSON.stringify(getValues()));
    const res = await createSchedule(data);
    if (res.status === 'success') {
      router.refresh();
      toast.success('schedule created successfully');
    } else {
      handleFormServerErrors(res, setError);
    }
  };

  return (
    <>
      {' '}
      <Card className='max-w-[440px] mx-auto h-fit border-none shadow-lg'>
        <CardHeader className='flex flex-col items-center justify-center'>
          <HeadingLogo
            title='jadwal'
            subtitle='jadwal bola'
            center
            className='text-zinc-500'
          />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4 '>
              <SelectInput
                register={register}
                label='run on week number'
                id='run'
                aria-label='run'
                defaultValue=''
                isMulti={false}
                onChange={(value) => setCustomValue('run', value)}
                placeholder='Run on week'
                options={() => selectRunOptions}
                errors={errors}
                required
              />
              {errors.run && (
                <p className='text-red-500'>{errors.run.message}</p>
              )}
              <InputCustom
                type='datetime-local'
                id='date'
                defaultValue={getValues('date')}
                disabled={isLoading}
                {...register('date')}
                isInvalid={!!errors.date}
                errorMessage={errors.date?.message as string}
              />

              <SelectInput
                register={register}
                label='Team Home'
                id='teamHome'
                aria-label='teamHome'
                defaultValue=''
                isMulti={false}
                onChange={(value) => setCustomValue('teamHome', value)}
                placeholder='Team Home'
                options={() => teamOptions}
                errors={errors}
                required
              />
              {errors.teamHome && (
                <p className='text-red-500'>{errors.teamHome.message}</p>
              )}
              <InputCustom
                placeholder='Score'
                defaultValue={getValues('score')}
                disabled={isLoading}
                {...register('score')}
                isInvalid={!!errors.score}
                errorMessage={errors.score?.message as string}
              />

              <SelectInput
                register={register}
                label='Team Away'
                id='teamAway'
                aria-label='teamAway'
                defaultValue=''
                isMulti={false}
                onChange={(value) => setCustomValue('teamAway', value)}
                placeholder='Team Away'
                options={() => teamOptions}
                errors={errors}
                required
              />

              <InputCustom
                placeholder='analysis'
                defaultValue={getValues('analysis')}
                disabled={isLoading}
                {...register('analysis')}
                isInvalid={!!errors.analysis}
                errorMessage={errors.analysis?.message as string}
              />

              <Button
                disabled={!isValid || isSubmitting || isLoading}
                variant='ghost'
                type='submit'
                className={cn(
                  'bg-indigo-500 px-4 text-gray-50 hover:bg-indigo-500/70 hover:text-gray-200 w-full shadow-lg'
                )}>
                {isSubmitting || isLoading ? (
                  <div className='flex gap-2 items-center justify-center'>
                    <Spinner size={16} color='gray-200' /> processing...
                  </div>
                ) : (
                  <div className='flex items-center gap-2 justify-center text-shadow'>
                    <CalendarCog size={16} className='svg' /> Submit
                  </div>
                )}
              </Button>

              {/* <div className='flex justify-center text-sm '>
                <LoginRegisterButton type='login' />
              </div> */}
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default ScheduleForm;
