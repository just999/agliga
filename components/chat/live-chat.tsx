'use client';

import { useChatStore } from '@/store/use-chat-store';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Heading,
  HeadingLogo,
  InputCustom,
  Spinner,
} from '../ui';
import { useCallback, useEffect, useState } from 'react';
import {
  capitalizeFirstCharacter,
  cn,
  createChatId,
  handleFormServerErrors,
} from '@/lib/utils';
import { ChevronDownSquareIcon, MailIcon } from 'lucide-react';
import UserAvatar from '../user-avatar';
import { SafeAdminChat, SafeUser } from '@/types/types';

import { useSession } from 'next-auth/react';
import NewLiveChatContainer from './new-live-chat-container';

import { User } from '@prisma/client';

import { FaCat } from 'react-icons/fa';
import {
  createAnonymousUser,
  getAnonymousUser,
} from '@/actions/live-chat-actions';
import { FieldValues, useForm } from 'react-hook-form';
import { nonMember, NonMember } from '@/schemas/live-chat-schema';
import { zodResolver } from '@hookform/resolvers/zod';

type LiveChatProps = {
  users: User[];
  adminProfile: SafeAdminChat;
};

const LiveChat = ({ users, adminProfile }: LiveChatProps) => {
  const { data: session, status } = useSession();

  const [anonymousUser, setAnonymousUser] = useState<User>();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<NonMember>({
    resolver: zodResolver(nonMember),
    mode: 'onTouched',
  });

  useEffect(() => {
    const checkAnonymousUser = async () => {
      if (status === 'unauthenticated' && typeof window !== 'undefined') {
        const storedSessionId = sessionStorage.getItem('anonymousId');
        console.log('Retrieved anonymousId:', storedSessionId);
        if (storedSessionId) {
          try {
            const existingUser = await getAnonymousUser(storedSessionId);
            console.log('Fetched user:', existingUser);
            if (existingUser.status === 'success' && existingUser.data) {
              setAnonymousUser(existingUser.data);
            } else {
              console.log('No valid user data found');
              sessionStorage.removeItem('anonymousId');
            }
          } catch (error) {
            console.error('Error fetching anonymous user:', error);
            sessionStorage.removeItem('anonymousId');
          }
        }
      }
    };

    checkAnonymousUser();
  }, [status]);

  const {
    chatId,
    setChatId,
    setAnoId,
    setTab,
    toggleStartChat,
    setToggleStartChat,
    loading,
    setLoading,
    isToggle,
    setIsToggle,
    setShowBubbleChat,
    showBubbleChat,
  } = useChatStore((state) => ({
    chatId: state.chatId,
    setChatId: state.setChatId,
    setAnoId: state.setAnoId,
    setTab: state.setTab,
    isToggle: state.isToggle,
    toggleStartChat: state.toggleStartChat,
    setToggleStartChat: state.setToggleStartChat,
    setIsToggle: state.setIsToggle,
    loading: state.loading,
    setLoading: state.setLoading,
    setShowBubbleChat: state.setShowBubbleChat,
    showBubbleChat: state.showBubbleChat,
  }));

  const handleAnonymousUser = async (
    data: NonMember,
    existingSessionId?: string
  ) => {
    const res = await createAnonymousUser(data, existingSessionId);

    if (res.status === 'success' && res.data.nonUserSessionId) {
      setAnonymousUser(res.data);
      sessionStorage.setItem('anonymousId', res.data.nonUserSessionId);
      setAnoId(res.data.id);
    } else if (res.status === 'error') {
      handleFormServerErrors(res, setError);
    }
  };

  const userRole =
    status === 'authenticated' ? session?.user.role : anonymousUser?.role;

  const handleCloseToggleChat = useCallback(() => {
    setIsToggle(false);
    setShowBubbleChat(true);
    setToggleStartChat(false);
  }, [setIsToggle, setShowBubbleChat, setToggleStartChat]);

  useEffect(() => {
    if (isToggle) {
      setShowBubbleChat(true);
    }
  }, [isToggle, setShowBubbleChat]);

  const handleToggleStartChat = () => {
    setLoading(true);
    setToggleStartChat(true);
    setIsToggle(true);
    setShowBubbleChat(false);
    setLoading(false);
  };

  const handleToggleCloseChat = () => {
    setToggleStartChat(false);
    setIsToggle(true);
  };

  // Chat initialization effect
  const handleUserChatId = useCallback(() => {
    // if (!adminProfile.id || !curUserId || activeUsers.length === 0) return null;
    if (status === 'unauthenticated' && anonymousUser && userRole === 'user') {
      const chatId = createChatId(anonymousUser?.id, adminProfile.id);
      if (chatId) setChatId(chatId);
      setTab(adminProfile.id);
    } else if (userRole === 'admin' && anonymousUser?.id) {
      const chatId = createChatId(adminProfile.id, anonymousUser.id);
      if (chatId) setChatId(chatId);
      setTab(anonymousUser.id);
    }
  }, [status, anonymousUser, userRole, adminProfile.id, setChatId, setTab]);

  useEffect(() => {
    handleUserChatId();
  }, [handleUserChatId]);

  const onSubmit = async (data: NonMember) => {
    if (!anonymousUser) {
      await handleAnonymousUser(data);
    }
    setToggleStartChat(true);
    setIsToggle(true);
  };
  const currentUsername =
    status === 'authenticated' ? session?.user.name : anonymousUser?.name;

  return (
    <div className='w-13 h-13 m-0 p-0 relative'>
      <div
        className={cn(
          `fixed bottom-0 right-1 text-shadow-lg transition-transform duration-300 ease-in-out transform`,
          toggleStartChat && isToggle ? 'translate-y-0' : 'translate-y-full'
        )}>
        {/* <NewLiveChatContainer users={users} adminProfile={adminChatProfile} /> */}
      </div>
      <div
        className={cn(
          `fixed h-[570px] w-[400px] bottom-0 right-1 text-shadow-lg  transition-transform duration-300 ease-in-out transform`,
          isToggle ? 'translate-y-0' : 'translate-y-full'
        )}>
        {isToggle ? (
          <div className='flex flex-col h-[570px] w-full items-end'>
            <Button
              onClick={handleCloseToggleChat}
              type='button'
              variant='ghost'
              size='sm'
              className={cn(
                'group w-fit flex items-center text-wrap text-white font-extrabold text-shadow text-sm h-6  hover:bg-blue-500/90 p-0 m-0',
                isToggle && 'bottom-0',
                toggleStartChat && 'hidden'
              )}>
              <ChevronDownSquareIcon
                size={24}
                className='svg text-white group-hover:text-gray-700'
              />
              {/* <span className='text-white group-hover:text-gray-700'>Close</span> */}
            </Button>

            {toggleStartChat ? (
              <NewLiveChatContainer
                users={users}
                adminProfile={adminProfile}
                // anonymousUser={anonymousUser}
              />
            ) : (
              <div className='h-full w-full bg-emerald-400 p-2'>
                <HeadingLogo
                  title={cn(
                    userRole === 'user'
                      ? `${capitalizeFirstCharacter(
                          currentUsername
                        )}, Selamat datang!`
                      : 'selamat datang'
                  )}
                  className='text-sm'
                />
                <div className='flex flex-col  items-center justify-between'>
                  <div className='flex flex-col w-full gap-6'>
                    <Card
                      className={cn(
                        'flex flex-col justify-between'
                        // status === 'unauthenticated' ? 'h-52' : 'h-60'
                      )}>
                      <CardHeader className='p-0 px-2 py-1'>
                        {userRole !== 'admin' && (
                          <CardTitle>
                            <div className='flex gap-4 '>
                              <UserAvatar
                                src={adminProfile.image}
                                alt={adminProfile.name}
                              />
                              {adminProfile.name && (
                                <Heading
                                  className='text-base'
                                  title={capitalizeFirstCharacter(
                                    adminProfile?.name
                                  )}
                                  description='Ada yg bisa kami bantu..?'
                                />
                              )}
                            </div>
                          </CardTitle>
                        )}
                        <CardDescription className=' py-.5'>
                          <span className='flex flex-col  font-bold text-white w-full pb-2'>
                            <span className='bg-emerald-600 mx-auto w-fit px-2 py-.5 text-center  rounded-md text-shadow-default'>
                              Pemberitahuan:
                            </span>
                            <span
                              className={cn(
                                'overflow-auto bg-stone-700 p-0 px-1 py-1 mx-auto text-justify w-full text-xs',
                                status === 'unauthenticated' ? 'h-48' : 'h-60'
                              )}>
                              Selamat datang di Target4D🎯 Situs Togel & Slot
                              Online Terpercaya Indonesia. ✓ Minimal Deposit
                              10.000,- ✓ Minimal Withdraw 50.000,- ✓10 Pasaran
                              Togel Resmi ✓ Winrate Tinggi Slot Online ✓ CS
                              Online 24 Jam ✓ Proses Depo & WD Cepat ✓ Terima
                              Deposit via DANA,GOPAY,OVO,PULSA & BANK LAINYA
                              ✓Tersedia Deposit Scan Tercepat/ KWpay ✓ Terima
                              Depo Via TSEL-XL 🎡 SPIN HOKI : TARGETHOKI 🏆 RTP
                              TARGET4D : RTPMAXWIN 🌐 Link ALT 1: LINKMUDAHJP 🌐
                              Link ALT 2: LINK X1000 💬 WA 1 : KLIK DISINI 💬 WA
                              2 : KLIK DISINI 💬 TELEGRAM : KLIK DISINI
                            </span>{' '}
                          </span>
                        </CardDescription>
                      </CardHeader>
                      {status === 'unauthenticated' && !anonymousUser ? (
                        <CardContent className='p-0 px-2 py-1'>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='grid w-full items-center gap-4 pb-2'>
                              <div className='flex flex-col space-y-1.5 '>
                                {/* <label htmlFor='name' className='text-xs '>
                                  Name
                                </label> */}
                                <InputCustom
                                  aria-label='name'
                                  className='w-full text-sm font-semibold '
                                  id='name'
                                  placeholder='nama'
                                  {...register('name', { required: true })}
                                  isInvalid={!!errors.name}
                                  errorMessage={errors.name?.message as string}
                                />
                                <InputCustom
                                  aria-label='Email'
                                  className='w-full text-sm font-semibold '
                                  placeholder='Email'
                                  {...register('email', { required: true })}
                                  suffix={
                                    <MailIcon
                                      size={16}
                                      className='text-zinc-400 absolute right-4 cursor-pointer hover:text-stone-600'
                                    />
                                  }
                                  isInvalid={!!errors.email}
                                  errorMessage={errors.email?.message as string}
                                />
                              </div>
                            </div>

                            <Button
                              type='submit'
                              disabled={isSubmitting || !isValid}
                              className='mx-auto w-full shadow-lg py-4'>
                              Submit Name & start to chat
                            </Button>
                          </form>
                        </CardContent>
                      ) : (
                        <CardFooter className='p-0 px-1 py-2  '>
                          {toggleStartChat ? (
                            <Button
                              type='button'
                              className='mx-auto w-full shadow-lg'
                              onClick={handleToggleCloseChat}>
                              close chat
                            </Button>
                          ) : (
                            <Button
                              type='button'
                              disabled={loading}
                              className='mx-auto w-full shadow-lg'
                              onClick={handleToggleStartChat}>
                              {loading ? <Spinner size={32} /> : 'start chat'}
                            </Button>
                          )}
                        </CardFooter>
                      )}
                    </Card>
                  </div>

                  <div className='fixed bottom-2'>
                    <div className='flex items-center justify-center'>
                      <p className='text-xs'>Powered by&nbsp;</p>
                      <FaCat size={16} className='text-red-600' />{' '}
                      <div className='text-xs text-black font-extrabold'>
                        &nbsp;Cat
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LiveChat;
