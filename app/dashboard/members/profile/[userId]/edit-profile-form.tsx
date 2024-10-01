'use client';

import { editUserProfile } from '@/actions/user-actions';
import ProfilePicture from '@/components/candidate-form/profile-picture';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  SelectInput,
  CardFooter,
  Button,
  InputCustom,
  Spinner,
} from '@/components/ui';
import UserAvatar from '@/components/user-avatar';
import useBanks from '@/hooks/use-banks';
import useGames from '@/hooks/use-games';
import ClientOnly from '@/lib/client-only';
import { cn, handleFormServerErrors } from '@/lib/utils';
import { editUserProfileSchema, EditUserProfileSchema } from '@/schemas';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { UserCog2Icon } from 'lucide-react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiUser } from 'react-icons/bi';
import { BsHouse } from 'react-icons/bs';

type EditProfileFormProps = {
  name: string;
  bank: string;
  accountNumber: string;
  game: string[];
  phone: string;
};

type ProfileProps = {
  user: User;
  userInfo: { name: string | null; image: string | null } | null;
};

const EditProfileForm = ({ user, userInfo }: ProfileProps) => {
  // const [profile, setProfile] = useState<EditProfileFormProps>();
  const router = useRouter();

  const { getBanks } = useBanks();
  const { getGames } = useGames();

  const banks = getBanks();
  const bankOptions = banks.map((bank) => ({
    value: bank.value,
    icon: bank.icon,
  }));

  const games = getGames();
  const gameOptions = games.map((game) => ({
    value: game.value,
    icon: game.icon,
  }));

  const bankWithIcon = banks.filter((bank) => bank.value === user.bank);

  const gameWithIcon = games.filter((game) => user.game.includes(game.value));
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    getValues,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<EditUserProfileSchema>({
    resolver: zodResolver(editUserProfileSchema),
    mode: 'onTouched',
    // defaultValues: {
    //   name: user.name || '',
    //   bank: bankWithIcon[0],
    //   accountNumber: user.accountNumber || '',
    //   game: gameWithIcon,
    //   phone: user.phone || '',
    // },
  });

  const setCustomValue = (id: 'bank' | 'game', value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        bank: bankWithIcon[0],
        accountNumber: user.accountNumber || '',
        game: gameWithIcon,
        phone: user.phone || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, reset]);

  const onSubmit = async (data: EditUserProfileSchema) => {
    const newData = JSON.parse(JSON.stringify(getValues()));
    const res = await editUserProfile(newData);

    if (res.status === 'success') {
      toast.success('profile updated successfully');
      router.refresh();
      reset({ ...data });
    } else {
      handleFormServerErrors(res, setError);
    }
  };

  return (
    <ClientOnly>
      <Card className='border-none w-1/3 mx-auto pt-4'>
        <CardHeader>
          <CardTitle className='w-full text-center'>Edit Profile</CardTitle>
          <CardDescription className='w-full text-center'>
            Data Pribadi anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid w-full items-center gap-0'>
              <div className='flex flex-col justify-center items-center space-y-1.5 pb-4'>
                {/* <ProfilePicture user={userInfo} /> */}
                <UserAvatar src={user.image} alt={user.name} />
              </div>
              {/* <div className='flex flex-col space-y-1.5'>
              <p>Email: {profile.email}</p>
            </div> */}
              <div className='flex flex-col space-y-1.5'>
                <InputCustom
                  className='text-sm font-semibold '
                  placeholder='Name'
                  defaultValue={user.name || ''}
                  {...register('name')}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message as string}
                />
                {errors.name && (
                  <span className='text-sm text-red-500 '>
                    <span className='text-xs  underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
                      Kolom Wajib di isi...
                    </span>
                  </span>
                )}

                <SelectInput
                  // label={bank ? '' : 'bank'}
                  isMulti={false}
                  id='bank'
                  register={register}
                  defaultValue={bankWithIcon[0]}
                  onChange={(value) => setValue('bank', value)}
                  placeholder='Banks'
                  options={() => bankOptions}
                  errors={errors}
                  required
                />
                {errors.bank && (
                  <span className='text-sm text-red-500 '>
                    <span className='text-xs  underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
                      Kolom Wajib di isi...
                    </span>
                  </span>
                )}

                <InputCustom
                  className='text-sm font-semibold '
                  placeholder='accountNumber'
                  defaultValue={user.accountNumber || ''}
                  {...register('accountNumber')}
                  type='accountNumber'
                  isInvalid={!!errors.accountNumber}
                  errorMessage={errors.accountNumber?.message as string}
                />

                {errors.accountNumber && (
                  <span className='text-sm text-red-500 '>
                    <span className='text-xs  underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
                      Kolom Wajib di isi...
                    </span>
                  </span>
                )}

                <SelectInput
                  // label={game ? '' : 'game'}
                  id='game'
                  register={register}
                  isMulti={true}
                  defaultValue={gameWithIcon || []}
                  onChange={(value) => {
                    setCustomValue('game', value);
                  }}
                  placeholder='Games'
                  options={() => gameOptions}
                  errors={errors}
                  required
                />
                {/* <pre>{JSON.stringify(game, null, 2)}</pre> */}
                {errors.game && (
                  <span className='text-sm text-red-500 '>
                    <span className='text-xs  underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
                      Kolom Wajib di isi...
                    </span>
                  </span>
                )}

                <InputCustom
                  className='text-sm font-semibold '
                  placeholder='Phone'
                  defaultValue={user.phone || ''}
                  {...register('phone')}
                  type='phone'
                  isInvalid={!!errors.phone}
                  errorMessage={errors.phone?.message as string}
                />
                {errors.phone && (
                  <span className='text-sm text-red-500 '>
                    <span className='text-xs  underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
                      Kolom Wajib di isi...
                    </span>
                  </span>
                )}
              </div>
            </div>
            {errors.root && errors.root.serverError && (
              <p className='text-center text-red-700 w-full mx-auto  text-sm bg-rose-100 shadow-lg'>
                {errors.root.serverError.message}
              </p>
            )}
            <Button
              disabled={!isValid || !isDirty}
              type='submit'
              className={cn(
                'mt-2 px-4 text-gray-50 hover:bg-orange-500/70 hover:text-gray-600 w-full shadow-lg'
              )}>
              {isSubmitting ? (
                <div className='flex gap-2 items-center justify-center'>
                  <Spinner size={16} color='gray-200' /> Submitting...
                </div>
              ) : (
                <div className='flex items-center gap-2 justify-center text-shadow'>
                  <UserCog2Icon size={16} className='svg' /> Edit
                </div>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <div className='flex flex-row justify-between gap-6  my-2 '>
            <Button
              size='sm'
              variant='ghost'
              asChild
              className='text-xs flex-flex-row items-center justify-center gap-2 drop-shadow-lg bg-stone-50'>
              <Link href='/'>
                Back to Homepage{' '}
                <BsHouse className='text-neutral-400 h-4 w-4 m-0 p-0 cursor-pointer hover:text-red-500 hover:font-bold hover:shadow-lg ' />
              </Link>
            </Button>
            <Button
              asChild
              size='sm'
              variant='ghost'
              type='button'
              className='text-xs flex-flex-row items-center justify-center gap-2 drop-shadow-lg bg-stone-50'
              // onClick={() => onOpen('profile')}
            >
              <Link href={`/dashboard/members/profile`}>
                Back to your profile
                <BiUser className='text-neutral-400  hover:font-bold h-4 w-4 m-0 cursor-pointer hover:text-sky-500  hover:shadow-lg' />
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </ClientOnly>
  );
};

export default EditProfileForm;
