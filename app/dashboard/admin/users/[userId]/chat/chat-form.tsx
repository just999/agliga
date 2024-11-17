'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { createMessage } from '@/actions/message-actions';
import { Button } from '@/components/shadcn/ui/button';
import { InputCustom } from '@/components/shadcn/ui/inputCustom';
import Spinner from '@/components/shadcn/ui/spinner';
import { cn, handleFormServerErrors } from '@/lib/utils';
import { MessageSchema, messageSchema } from '@/schemas';
import { useMessageStore } from '@/store/use-message-store';
import { SafeAdminChat, SafeUser } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnonymousUser, User } from '@prisma/client';
import { SendIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type ChatFormProps = {
  recipientData: User | SafeAdminChat;
  anonymousUser?: User;
};

export type ChatFormHandle = {
  focus: () => void;
};

const ChatForm = forwardRef<ChatFormHandle, ChatFormProps>(
  ({ recipientData, anonymousUser }, ref) => {
    const params = useParams<{ userId: string }>();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
        const length = inputRef.current?.value.length || 0;
        inputRef.current?.setSelectionRange(length, length);
      },
    }));

    const {
      register,
      handleSubmit,
      setError,
      reset,
      setFocus,
      formState: { isSubmitting, isValid, errors },
    } = useForm<MessageSchema>({ resolver: zodResolver(messageSchema) });

    useEffect(() => {
      setFocus('text');
    }, [setFocus]);

    const onSubmit = async (data: MessageSchema) => {
      if (params?.userId) {
        const result = await createMessage(params.userId, data);
        if (result.status === 'error') {
          handleFormServerErrors(result, setError);
        } else {
          reset();
          router.refresh();
          setFocus('text');
          setTimeout(() => setFocus('text'), 50);
        }
      }
    };

    const { messages } = useMessageStore((state) => ({
      messages: state.messages,
    }));
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex flex-col bg-zinc-300'
      >
        <div className='flex flex-row items-center gap-2'>
          <InputCustom
            className='h-8 shadow-inner border-0 focus-visible:ring-0 focus:outline-none focus:right-0 '
            placeholder='Type a message'
            {...register('text')}
            // ref={(e) => {
            //   inputRef.current = e;
            //   if (e) {
            //     register('text').ref(e);
            //   }
            // }}
            isInvalid={!!errors.text}
            errorMessage={errors.text?.message}
            errorMessageClass='hidden'
          />
          <Button
            aria-label='chat submit'
            type='submit'
            variant='ghost'
            className={cn(
              'rounded-full cursor-pointer  bg-sky-700 text-orange-600 px-2 py-4 h-0',
              isValid && 'hover:bg-blue-700/70 hover:text-blue-800',
              isSubmitting && 'bg-yellow-600 text-sky-500'
            )}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <Spinner className='gap-0 text-black' size={14} color='sky-700' />
            ) : (
              <SendIcon
                size={14}
                className={cn(
                  'text-white svg',
                  !isValid && 'text-stone-50 bg-sky-600/80'
                )}
              />
            )}
          </Button>
        </div>
      </form>
    );
  }
);

ChatForm.displayName = 'ChatForm';

export default ChatForm;
