// 'use client';

// import { createMessage } from '@/actions/message-actions';

// import { Button } from '@/components/ui/button';
// import { InputCustom } from '@/components/ui/inputCustom';
// import Spinner from '@/components/ui/spinner';

// import { cn, handleFormServerErrors } from '@/lib/utils';
// import { MessageSchema, messageSchema } from '@/schemas';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { User } from '@prisma/client';
// import { SendIcon } from 'lucide-react';

// import { useRouter } from 'next/navigation';

// import {
//   forwardRef,
//   useImperativeHandle,
//   useRef,
//   MutableRefObject,
//   RefObject,
// } from 'react';

// import { useForm } from 'react-hook-form';

// type ChatFormProps = {
//   recipientData: User;
//   ref: RefObject<ChatFormHandle>;
// };

// export type ChatFormHandle = {
//   focus: () => void;
// };

// const ChatForm = forwardRef<ChatFormHandle, ChatFormProps>(
//   ({ recipientData }, ref) => {
//     // const params = useParams<{ userId: string }>();
//     const router = useRouter();
//     // const role = useCurrentUserRole();
//     const inputRef = useRef<HTMLInputElement>(null);

//     useImperativeHandle(ref, () => ({
//       focus: () => {
//         inputRef.current?.focus();
//         const length = inputRef.current?.value.length || 0;
//         inputRef.current?.setSelectionRange(length, length);
//       },
//     }));

//     const {
//       register,
//       handleSubmit,
//       setError,
//       reset,
//       formState: { isSubmitting, isValid, errors },
//     } = useForm<MessageSchema>({ resolver: zodResolver(messageSchema) });

//     // useEffect(() => {
//     //   setFocus('text');
//     // }, [setFocus]);

//     const onSubmit = async (data: MessageSchema) => {
//       const result = await createMessage(recipientData.id, data);
//       if (result.status === 'error') {
//         handleFormServerErrors(result, setError);
//       } else {
//         router.refresh();
//         reset();
//         setTimeout(() => {
//           if (inputRef.current) {
//             inputRef.current.focus();

//             inputRef.current.setSelectionRange(0, 0);
//           }
//         }, 50);
//       }
//     };
//     return (
//       <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
//         <div className='flex flex-row items-center gap-2'>
//           <InputCustom
//             className='h-8 shadow-inner border-0 focus-visible:ring-0 focus:outline-none focus:right-0 '
//             placeholder='Type a message'
//             {...register('text', {
//               onChange: (e) => {
//                 inputRef.current = e.target;
//               },
//             })}
//             ref={(e) => {
//               inputRef.current = e;
//             }}
//             isInvalid={!!errors.text}
//             errorMessage={errors.text?.message}
//             errorMessageClass='hidden'
//           />
//           <Button
//             type='submit'
//             variant='ghost'
//             className={cn(
//               'rounded-full cursor-pointer  bg-sky-700 text-orange-600 px-2 py-4 h-0',
//               isValid && 'hover:bg-blue-700/70 hover:text-blue-800',
//               isSubmitting && 'bg-yellow-600 text-sky-500'
//             )}
//             disabled={!isValid || isSubmitting}>
//             {isSubmitting ? (
//               <Spinner className='gap-0 text-black' size={14} color='sky-700' />
//             ) : (
//               <SendIcon
//                 size={14}
//                 className={cn(
//                   'text-white svg',
//                   !isValid && 'text-stone-50 bg-sky-600/80'
//                 )}
//               />
//             )}
//           </Button>
//         </div>
//         {/* <div className='flex flex-col'>
//         {errors.root?.serverError && (
//           <p className='text-center text-red-700 w-full mx-auto  text-sm bg-rose-100 shadow-lg'>
//             {errors.root.serverError.message}
//           </p>
//         )}
//       </div> */}
//       </form>
//     );
//   }
// );

// ChatForm.displayName = 'ChatForm';

// export default ChatForm;

'use client';

import { createMessage } from '@/actions/message-actions';
import { Button } from '@/components/ui/button';
import { InputCustom } from '@/components/ui/inputCustom';
import Spinner from '@/components/ui/spinner';
import { cn, handleFormServerErrors } from '@/lib/utils';
import { MessageSchema, messageSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { SendIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';

type ChatFormProps = {
  recipientData: User;
};

export type ChatFormHandle = {
  focus: () => void;
};

const ChatForm = forwardRef<ChatFormHandle, ChatFormProps>(
  ({ recipientData }, ref) => {
    const router = useRouter();
    // const inputRef = useRef<HTMLInputElement | null>(null);

    // useImperativeHandle(ref, () => ({
    //   focus: () => {
    //     inputRef.current?.focus();
    //     const length = inputRef.current?.value.length || 0;
    //     inputRef.current?.setSelectionRange(length, length);
    //   },
    // }));

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
      const result = await createMessage(recipientData.id, data);
      if (result.status === 'error') {
        handleFormServerErrors(result, setError);
      } else {
        reset();
        router.refresh();
        setFocus('text');
        setTimeout(() => {
          // inputRef.current?.focus();
          // inputRef.current?.setSelectionRange(0, 0);
          setFocus('text');
        }, 50);
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
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
            type='submit'
            variant='ghost'
            className={cn(
              'rounded-full cursor-pointer  bg-sky-700 text-orange-600 px-2 py-4 h-0',
              isValid && 'hover:bg-blue-700/70 hover:text-blue-800',
              isSubmitting && 'bg-yellow-600 text-sky-500'
            )}
            disabled={!isValid || isSubmitting}>
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
