'use client';

import { useEffect, useState } from 'react';

import { usePenalty } from '@/hooks/use-euro';
import { useGetFixtures } from '@/hooks/use-get-schedule';
import useModal from '@/hooks/use-modal';
import { useTeams, useWeeks } from '@/hooks/use-teams';
import { initialFixtureFormValues } from '@/lib/helper';
import { findMatchingObjects } from '@/lib/utils';
import { FixtureProps } from '@/types/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { HeadingLogo } from '../shadcn/ui';
import Input from '../shadcn/ui/input';
import SelectInput from '../shadcn/ui/select-input';
import Modal from './modal';

const FixtureModal = () => {
  const [fixture, setFixture] = useState<FixtureProps>(
    initialFixtureFormValues
  );
  const [newEditModalType, setNewEditModalType] = useState('');
  const [newFixtureModalType, setNewFixtureModalType] = useState('');

  const { modalType, isOpen, onClose, id, group, period } = useModal();

  const router = useRouter();
  const { getTeams, getByValue } = useTeams();
  const { getPenalty } = usePenalty();
  const { getWeeks, getWeeksByValue } = useWeeks();

  const { isLoading, error, item, items, setItems, setIsLoading } =
    useGetFixtures(id ? id : undefined, period);

  useEffect(() => {
    if (period) {
      const newPeriod = period?.slice(0, 2) + period.slice(3);
      const newEditModalType = `edit-epl${newPeriod}`;
      const newFixtureModalType = `new-epl${newPeriod}`;

      if (newFixtureModalType) setNewFixtureModalType(newFixtureModalType);
      if (newEditModalType) setNewEditModalType(newEditModalType);
    }
  }, [period]);

  let initialFixtureValues;
  if (modalType === newFixtureModalType) {
    initialFixtureValues = {
      name: period,
      week: group,
      date: new Date(),
      teamHome: '',
      homePenalty: [],
      homeScore: '',
      homeHTScore: '',
      awayScore: '',
      awayHTScore: '',
      awayPenalty: [],
      teamAway: '',
    };
  } else if (modalType === newEditModalType) {
    initialFixtureValues = {
      name: fixture.name,
      week: fixture.week,
      date: fixture.date,
      teamHome: fixture.teamHome,
      homePenalty: fixture.homePenalty,
      homeScore: fixture.homeScore,
      homeHTScore: fixture.homeHTScore,
      awayHTScore: fixture.awayHTScore,
      awayScore: fixture.awayScore,
      teamAway: fixture.teamAway,
      awayPenalty: fixture.awayPenalty,
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
    defaultValues: initialFixtureValues,
  });
  const weeks = getWeeks();
  const selectWeekOptions = weeks.map((week) => ({
    value: week.value,
    icon: week.icon,
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

  const penalties = getPenalty();
  const penaltyOptions = penalties.map((pen) => ({
    value: pen.value,
    icon: pen.icon,
    desc: pen.desc,
    style: pen.style,
  }));

  useEffect(() => {
    if (modalType === newFixtureModalType && !error) {
      const data = {
        name: group,
        week: week,
        date: new Date(),
        teamHome: '',
        homePenalty: [],
        homeScore: '',
        awayScore: '',
        homeHTScore: '',
        awayHTScore: '',
        teamAway: '',
        awayPenalty: [],
      } as any;
      setFixture(data);

      const periodWeek: any = weeks.filter(
        (period) => period.value === group
      ) || {
        icon: '',
        value: '',
      };

      const home: any = teamsOption.filter(
        (team) => team.value === item.teamHome
      ) || {
        value: '',
        icon: '',
      };
      const away: any = teamsOption.filter(
        (team) => team.value === item.teamAway
      ) || {
        value: '',
        icon: '',
      };
      setValue('name', period);
      setValue('week', periodWeek[0]);
      setValue('teamHome', home[0]);
      setValue('homePenalty', homePenalty);
      setValue('homeScore', homeScore);
      setValue('awayPenalty', awayPenalty);
      setValue('date', new Date(item.date).toISOString().substring(0, 16));
      setValue('teamAway', away[0]);
      setValue('awayScore', awayScore);
      setValue('homeHTScore', homeHTScore);
      setValue('awayHTScore', awayHTScore);
    }

    if (modalType === newEditModalType && item && !error) {
      const data = {
        id: item.id,
        name: item.name,
        week: item.week,
        teamHome: item.teamHome,
        date: item.date,
        teamAway: item.teamAway,
        homeScore: item.homeScore,
        homeHTScore: item.homeHTScore,
        homePenalty: item.homePenalty,
        awayScore: item.awayScore,
        awayHTScore: item.awayHTScore,
        awayPenalty: item.awayPenalty,
      };
      setFixture(data);
      const periodWeek: any = weeks.filter(
        (period) => period.value === item?.week?.toString()
      ) || {
        icon: '',
        value: '',
      };

      const home: any = teamsOption.filter(
        (team) => team.value === item.teamHome
      ) || {
        value: '',
        icon: '',
      };
      const away: any = teamsOption.filter(
        (team) => team.value === item.teamAway
      ) || {
        value: '',
        icon: '',
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

      setValue('name', period);
      setValue('week', periodWeek[0]);
      setValue('teamHome', home[0]);
      setValue('date', new Date(item.date).toISOString().substring(0, 16));
      setValue('teamAway', away[0]);
      setValue('homeScore', item.homeScore);
      setValue('homeHTScore', item.homeHTScore);
      setValue('homePenalty', hPen);
      setValue('awayScore', item.awayScore);
      setValue('awayHTScore', item.awayHTScore);
      setValue('awayPenalty', apen);

      // if (item.date instanceof Date) {
      //   const formattedDate = moment(item.date).format('MM/DD/YYYY hh:mm A');
      // } else {
      //   console.warn('item.date is not a valid Date object');
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, item, modalType, setValue, teamsOption]);
  if (!item.date) return;
  const newDate = new Date(fixture.date).toISOString().substring(0, 16);
  const name = watch('name');
  const week = watch('week');
  const date = watch('date');
  const teamHome = watch('teamHome');
  const homeScore = watch('homeScore');
  const homeHTScore = watch('homeHTScore');
  const homePenalty = watch('homePenalty');
  const awayScore = watch('awayScore');
  const awayHTScore = watch('awayHTScore');
  const awayPenalty = watch('awayPenalty');
  const teamAway = watch('teamAway');

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
    if (modalType === newFixtureModalType) {
      try {
        data = {
          name,
          week,
          date,
          teamHome,
          homeScore,
          homePenalty,
          awayScore,
          awayPenalty,
          teamAway,
        };
        axios
          .post(`/api/fixtures`, data)
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
    } else if (modalType === newEditModalType) {
      data = {
        name,
        week,
        date,
        teamHome,
        homeScore,
        homeHTScore,
        homePenalty,
        awayScore,
        awayHTScore,
        awayPenalty,
        teamAway,
      };
      try {
        const res = axios
          .put(`/api/fixtures/${id}`, data)
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
    setValue('name', '');
    setValue('week', '');
    setValue('teamHome', '');
    setValue('date', new Date());
    setValue('teamAway', '');
    setValue('homeScore', '');
    setValue('homeHTScore', '');
    setValue('homePenalty', []);
    setValue('awayScore', '');
    setValue('awayHTScore', '');
    setValue('awayPenalty', []);
    setFixture({
      id: '',
      name: '',
      date: new Date(),
      teamHome: '',
      homePenalty: [],
      homeScore: '',
      homeHTScore: '',
      week: null,
      teamAway: '',
      awayPenalty: [],
      awayScore: '',
      awayHTScore: '',
    });
    reset();
    onClose();
  };

  const bodyContent = (
    <div className='flex flex-col gap-1'>
      <HeadingLogo
        title={
          modalType === newFixtureModalType
            ? `New Week period ${group}`
            : `Edit week  ${group}`
        }
        subtitle={
          modalType === newFixtureModalType
            ? 'Weeks period?'
            : 'Editing Matches'
        }
      />

      <Input
        id='name'
        type='text'
        label={name ? '' : 'Name'}
        defaultValue={watch('name')}
        disabled
        register={register}
        errors={errors}
        required
      />

      {errors.name && (
        <span className='text-sm text-red-500 '>
          <span className=' text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
            Kolom Wajib di isi...
          </span>
        </span>
      )}

      <SelectInput
        label={week ? '' : 'week'}
        isMulti={false}
        id='week'
        register={register}
        required
        value={watch('week')}
        onChange={(value) => setCustomValue('week', value)}
        placeholder='Week'
        options={() => selectWeekOptions}
        errors={errors}
      />

      {errors.week && (
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

      {modalType === newEditModalType && (
        <>
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
        </>
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
      {modalType === newEditModalType && (
        <>
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
        </>
      )}
      {/* <Input
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
      )} */}
    </div>
  );

  return (
    <Modal
      isOpen={
        isOpen &&
        (modalType === newFixtureModalType || modalType === newEditModalType)
      }
      onClose={handleCloseClearForm}
      onSubmit={handleSubmit(onSubmit)}
      title={modalType === newFixtureModalType ? 'New fixture' : 'Edit Fixture'}
      actionLabel='Submit'
      disabled={isLoading}
      body={bodyContent}
      // reset={handleClearForm}
      // footer={footerContent}
    />
  );
};

export default FixtureModal;

// 'use client';

// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
// import Modal from './modal';
// import Heading from '../heading';
// import Input from '../ui/input';
// import toast from 'react-hot-toast';

// import { useRouter } from 'next/navigation';

// import SelectInput from '../select-input';

// import useModal from '@/hooks/use-modal';

// import { useWeeks, useTeams } from '@/hooks/use-teams';

// import { useGetFixtures } from '@/hooks/use-get-schedule';

// import { FixtureProps } from '@/types';

// import { initialFixtureFormValues, team } from '@/lib/helper';
// import { usePenalty } from '@/hooks/use-euro';
// import { findMatchingObjects } from '@/lib/utils';

// const FixtureModal = () => {
//   const [fixture, setFixture] = useState<FixtureProps>(
//     initialFixtureFormValues
//   );
//   const [isLoading, setIsLoading] = useState(false);

//   const { modalType, isOpen, onClose, id, group } = useModal();
//   const router = useRouter();
//   const { getTeams } = useTeams();
//   const { getPenalty } = usePenalty();
//   const { getWeeks } = useWeeks();
//   const { item, error } = useGetFixtures(id ? id : undefined);

//   // Define variables before they are used
//   const weeks = getWeeks();
//   const selectWeekOptions = weeks.map((week) => ({
//     value: week.value,
//     icon: week.icon,
//   }));

//   const teamsOption = getTeams();
//   const selectTeamHomeOptions = teamsOption.map((teamHome) => ({
//     value: teamHome.value,
//     icon: teamHome.icon,
//   }));

//   const selectTeamAwayOptions = teamsOption.map((teamAway) => ({
//     value: teamAway.value,
//     icon: teamAway.icon,
//   }));

//   const penalties = getPenalty();
//   const penaltyOptions = penalties.map((pen) => ({
//     value: pen.value,
//     icon: pen.icon,
//     desc: pen.desc,
//     style: pen.style,
//   }));

//   // Define initial fixture values conditionally based on modal type
//   const initialFixtureValues =
//     modalType === 'new-fixture'
//       ? {
//           name: group,
//           week: null,
//           date: new Date().toISOString(),
//           teamHome: team,
//           homePenalty: [],
//           homeScore: '',
//           homeHTScore: '',
//           awayScore: '',
//           awayHTScore: '',
//           awayPenalty: [],
//           teamAway: team,
//         }
//       : fixture;

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//     reset,
//   } = useForm<FieldValues>({
//     defaultValues: initialFixtureValues,
//   });

//   useEffect(() => {
//     if (
//       (modalType === 'new-fixture' || modalType === 'edit-fixture') &&
//       !error
//     ) {
//       const data: any =
//         modalType === 'new-fixture'
//           ? {
//               name: group,
//               week: null,
//               date: new Date().toISOString(),
//               teamHome: team,
//               homePenalty: [],
//               homeScore: '',
//               homeHTScore: '',
//               awayScore: '',
//               awayHTScore: '',
//               awayPenalty: [],
//               teamAway: team,
//             }
//           : {
//               name: item.name,
//               week: item.week,
//               teamHome: item.teamHome,
//               date: item.date,
//               teamAway: item.teamAway,
//               homeScore: item.homeScore,
//               homeHTScore: item.homeHTScore,
//               homePenalty: item.homePenalty,
//               awayScore: item.awayScore,
//               awayHTScore: item.awayHTScore,
//               awayPenalty: item.awayPenalty,
//             };

//       setFixture(data);

//       const periodWeek = weeks.find(
//         (period) =>
//           period.value === (modalType === 'new-fixture' ? null : item.week)
//       ) || { icon: '', value: '' };
//       const home = teamsOption.find(
//         (team) =>
//           team.value === (modalType === 'new-fixture' ? '' : item.teamHome)
//       ) || {
//         value: '',
//         icon: '',
//         group: '',
//         played: '',
//       };
//       const away = teamsOption.find(
//         (team) =>
//           team.value === (modalType === 'new-fixture' ? '' : item.teamAway)
//       ) || {
//         value: '',
//         icon: '',
//         group: '',
//         played: '',
//       };

//       const targetAPen = item.awayPenalty || [];
//       const targetHPen = item.homePenalty || [];
//       const apen = findMatchingObjects(penalties, targetAPen);
//       const hPen = findMatchingObjects(penalties, targetHPen);

//       setValue('name', group);
//       setValue('week', periodWeek);
//       setValue('teamHome', home);
//       setValue('date', new Date(data.date).toISOString().substring(0, 16)); // Ensuring the date is always formatted as a string
//       setValue('teamAway', away);
//       setValue('homeScore', data.homeScore || '');
//       setValue('homeHTScore', data.homeHTScore || '');
//       setValue('homePenalty', hPen);
//       setValue('awayScore', data.awayScore || '');
//       setValue('awayHTScore', data.awayHTScore || '');
//       setValue('awayPenalty', apen);
//     }
//   }, [modalType, error, item, setValue, teamsOption, weeks, penalties, group]);

//   const newDate = new Date(fixture.date).toISOString().substring(0, 16);

//   const name = watch('name');
//   const week = watch('week');
//   const date = watch('date');
//   const teamHome = watch('teamHome');
//   const homeScore = watch('homeScore');
//   const homeHTScore = watch('homeHTScore');
//   const homePenalty = watch('homePenalty');
//   const awayScore = watch('awayScore');
//   const awayHTScore = watch('awayHTScore');
//   const awayPenalty = watch('awayPenalty');
//   const teamAway = watch('teamAway');

//   const setCustomValue = (id: string, value: any) => {
//     setValue(id, value, {
//       shouldDirty: true,
//       shouldTouch: true,
//       shouldValidate: true,
//     });
//   };

//   const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     setIsLoading(true);

//     if (modalType === 'new-fixture') {
//       try {
//         data = {
//           name,
//           week,
//           date: new Date().toISOString(),
//           teamHome,
//           homeScore,
//           homePenalty,
//           awayScore,
//           awayPenalty,
//           teamAway,
//         };
//         axios
//           .post('/api/fixtures', data)
//           .then(() => {
//             toast.success('Fixture successfully created!');
//             router.refresh();
//             reset();
//             onClose();
//           })
//           .catch((error) => {
//             toast.error('Something Went Wrong', error);
//           })
//           .finally(() => {
//             setIsLoading(false);
//           });
//       } catch (err) {
//         console.error(err);
//       }
//     } else if (modalType === 'edit-fixture') {
//       data = {
//         name,
//         week,
//         date,
//         teamHome,
//         homeScore,
//         homeHTScore,
//         homePenalty,
//         awayScore,
//         awayHTScore,
//         awayPenalty,
//         teamAway,
//       };
//       try {
//         axios
//           .put(`/api/fixtures/${id}`, data)
//           .then(() => {
//             toast.success('Fixture successfully edited');
//             router.refresh();
//             reset();
//             onClose();
//           })
//           .catch((err) => {
//             toast.error('Something went wrong', err);
//           })
//           .finally(() => setIsLoading(false));
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   const handleCloseClearForm = () => {
//     onClose();
//     setFixture(initialFixtureFormValues);
//     reset();
//   };

//   const bodyContent = (
//     <div className='flex flex-col gap-1'>
//       <Heading
//         title={
//           modalType === 'new-fixture'
//             ? `New Week period ${group}`
//             : `Edit weekly period ${group}`
//         }
//         subtitle={
//           modalType === 'new-fixture' ? 'Weeks period?' : 'Editing Matches'
//         }
//       />
//       <Input
//         id='name'
//         type='text'
//         label={name ? '' : 'Name'}
//         defaultValue={group}
//         disabled={isLoading}
//         register={register}
//         errors={errors}
//         required
//       />
//       {errors.name && (
//         <span className='text-sm text-red-500 '>
//           <span className='text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4'>
//             Kolom Wajib di isi...
//           </span>
//         </span>
//       )}
//       <SelectInput
//         label={week ? '' : 'week'}
//         isMulti={false}
//         id='week'
//         register={register}
//         required
//         value={watch('week')}
//         onChange={(value) => setCustomValue('week', value)}
//         placeholder='Week'
//         options={() => selectWeekOptions}
//         errors={errors}
//       />
//       {errors.week && (
//         <span className='text-sm text-red-500 '>
//           <span className='text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4'>
//             Kolom Wajib di isi...
//           </span>
//         </span>
//       )}
//       <Input
//         type='datetime-local'
//         id='date'
//         label={date ? '' : 'Time'}
//         defaultValue={newDate}
//         disabled={isLoading}
//         register={register}
//         errors={errors}
//         required
//       />
//       {errors.date && (
//         <span className='text-sm text-red-500 '>
//           <span className='text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4'>
//             Kolom Wajib di isi...
//           </span>
//         </span>
//       )}
//       <SelectInput
//         label={teamHome ? '' : 'teamHome'}
//         isMulti={false}
//         id='teamHome'
//         register={register}
//         required
//         value={watch('teamHome')}
//         onChange={(value) => setCustomValue('teamHome', value)}
//         placeholder='Team Home'
//         options={() => selectTeamHomeOptions}
//         errors={errors}
//       />
//       {errors.teamHome && (
//         <span className='text-sm text-red-500 '>
//           <span className='text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4'>
//             Kolom Wajib di isi...
//           </span>
//         </span>
//       )}
//       {modalType === 'edit-fixture' && (
//         <>
//           <Input
//             id='homeScore'
//             type='text'
//             label={homeScore ? '' : 'homeScore'}
//             disabled={isLoading}
//             register={register}
//             errors={errors}
//             required
//           />
//           {errors.homeScore && (
//             <span className='text-sm text-red-500 '>
//               <span className='text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4'>
//                 Kolom Wajib di isi...
//               </span>
//             </span>
//           )}
//           <Input
//             id='homeHTScore'
//             type='text'
//             label={homeHTScore ? '' : 'homeHTScore'}
//             disabled={isLoading}
//             register={register}
//             errors={errors}
//           />
//           {errors.homeHTScore && (
//             <span className='text-sm text-red-500 '>
//               <span className='text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4'>
//                 Kolom Wajib di isi...
//               </span>
//             </span>
//           )}
//           <SelectInput
//             label={homePenalty ? '' : 'homePenalty'}
//             isMulti={true}
//             id='homePenalty'
//             register={register}
//             value={watch('homePenalty')}
//             onChange={(value) => setCustomValue('homePenalty', value)}
//             placeholder='home penalty'
//             options={() => penaltyOptions}
//             errors={errors}
//             optionPenaltyClassName='flex flex-row-reverse justify-end gap-0'
//             optionClassName='text-sm px-0 font-semibold'
//           />
//           {errors.homePenalty && (
//             <span className='text-sm text-red-500 '>
//               <span className='text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4'>
//                 Kolom Wajib di isi...
//               </span>
//             </span>
//           )}
//         </>
//       )}
//       <SelectInput
//         label={teamAway ? '' : 'teamAway'}
//         isMulti={false}
//         id='teamAway'
//         register={register}
//         required
//         value={watch('teamAway')}
//         onChange={(value) => setCustomValue('teamAway', value)}
//         placeholder='Team Away'
//         options={() => selectTeamAwayOptions}
//         errors={errors}
//       />
//       {errors.teamAway && (
//         <span className='text-sm text-red-500 '>
//           <span className='text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4'>
//             Kolom Wajib di isi...
//           </span>
//         </span>
//       )}
//       {modalType === 'edit-fixture' && (
//         <>
//           <Input
//             id='awayScore'
//             type='text'
//             label={awayScore ? '' : 'awayScore'}
//             disabled={isLoading}
//             register={register}
//             errors={errors}
//             required
//           />
//           {errors.awayScore && (
//             <span className='text-sm text-red-500 '>
//               <span className='text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4'>
//                 Kolom Wajib di isi...
//               </span>
//             </span>
//           )}
//           <Input
//             id='awayHTScore'
//             type='text'
//             label={awayHTScore ? '' : 'awayHTScore'}
//             disabled={isLoading}
//             register={register}
//             errors={errors}
//           />
//           {errors.awayHTScore && (
//             <span className='text-sm text-red-500 '>
//               <span className='text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4'>
//                 Kolom Wajib di isi...
//               </span>
//             </span>
//           )}
//           <SelectInput
//             label={awayPenalty ? '' : 'awayPenalty'}
//             isMulti={true}
//             id='awayPenalty'
//             register={register}
//             value={watch('awayPenalty')}
//             onChange={(value) => setCustomValue('awayPenalty', value)}
//             placeholder='away penalty'
//             options={() => penaltyOptions}
//             errors={errors}
//             optionPenaltyClassName='flex flex-row-reverse justify-end gap-0'
//             optionClassName='text-sm px-0 font-semibold'
//           />
//           {errors.awayPenalty && (
//             <span className='text-sm text-red-500 '>
//               <span className='text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4'>
//                 Kolom Wajib di isi...
//               </span>
//             </span>
//           )}
//         </>
//       )}
//     </div>
//   );

//   return (
//     <Modal
//       isOpen={
//         isOpen && (modalType === 'new-fixture' || modalType === 'edit-fixture')
//       }
//       onClose={handleCloseClearForm}
//       onSubmit={handleSubmit(onSubmit)}
//       title={modalType === 'new-fixture' ? 'New fixture' : 'Edit Fixture'}
//       actionLabel='Submit'
//       disabled={isLoading}
//       body={bodyContent}
//     />
//   );
// };

// export default FixtureModal;
