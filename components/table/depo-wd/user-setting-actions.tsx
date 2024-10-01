'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import useModal from '@/hooks/use-modal';
import { User } from '@prisma/client';
import { title } from 'process';

import { useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';

type UserSettingActionsProps = {
  data: User;
};

const UserSettingActions = ({ data }: UserSettingActionsProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: { active: data.active },
  });
  const [active, setActive] = useState<boolean>(watch('active'));
  const [userId, setUserId] = useState<string>(watch('userId'));

  // Watch for changes in the form's `active` field and sync with local state
  useEffect(() => {
    const subscription = watch((value) => setActive(value.active));
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (data) setUserId(data.id);
  }, [setUserId, data]);

  const { modalType, isOpen, onOpen, id } = useModal();

  const onSubmit = (data: any) => {
    onOpen('editProfile');
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const checked = !!e.target.checked;
    console.log(!!e.target.checked);
    setActive((prev) => !prev);
    setValue('active', checked); // Sync the check state with react-hook-form
    setValue('userId', data.id);
  };

  const title = active ? `Edit User to be Active` : 'Deactivate User';
  return (
    <div
      onClick={() => onOpen('edit-users', userId, title)}
      className='flex flex-row items-center justify-start text-nowrap px-4 '>
      <input
        type='text'
        disabled
        id='userId'
        {...register('userId')}
        value=''
        onChange={(e) => setUserId(e.target.value)}
        className='w-6 h-6'
      />
      <div className='relative text-right'>
        <input
          type='checkbox'
          id='active'
          {...register('active')}
          defaultChecked={active}
          className='min-w-20 cursor-pointer text-right'
          // onChange={() => setActive(!active)}
          onChange={handleCheckboxChange}
        />
        {/* <label className='form-check-label'>active</label> */}
        <Button
          variant='ghost'
          size='sm'
          type='submit'
          className='left-0 top-0 h-6 w-20 '>
          active
        </Button>
      </div>
    </div>
  );
};

export default UserSettingActions;
