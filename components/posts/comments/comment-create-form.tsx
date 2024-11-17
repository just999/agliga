'use client';

import { useEffect, useRef, useState } from 'react';

import { createComment } from '@/actions/create-comment';
import { Textarea } from '@/components/shadcn/ui';
// import * as actions from '@/actions';
import { Button } from '@/components/shadcn/ui/button';
import { useFormState } from 'react-dom';

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(
    createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );
  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const hasFormErrors = () => {
    return !!Object.keys(formState.errors).length; // Check for any non-empty errors object
  };

  const form = (
    <form action={action} ref={ref}>
      <div className='space-y-2 pt-4 px-1 bg-stone-100 rounded-lg shadow-lg'>
        <Textarea
          name='content'
          aria-label='content'
          placeholder='Enter your comment'
          // isInvalid={!!formState.errors.content}
          // errorMessage={formState.errors.content?.join(', ')}
          className='w-full focus:before:border-gray-900 bg-stone-100 drop-shadow-xl text-gray-800 sm:w-full 2xl:w-full xl:w-full border-0 focus:border-0 outline-none lg:w-full'
        />

        {formState.errors._form ? (
          <div className='text-sm text-red-500 '>
            <span className='text-xs underline decoration-rose-300 rounded-lg bg-pink-100 px-4 '>
              {formState.errors._form?.join(', ')}
            </span>
          </div>
        ) : null}

        <Button
          size='sm'
          variant='outline'
          className='shadow-md hover:disabled:bg-orange-100 px-4'
          disabled={hasFormErrors()}
        >
          Submit
        </Button>
      </div>
    </form>
  );

  return (
    <div className=' '>
      <Button
        size='sm'
        variant='ghost'
        onClick={() => setOpen(!open)}
        className='drop-shadow-md hover:bg-stone-200 hover:text-black text-xs text-stone-600 bg-stone-300 border-b-2 border-b-stone-600 p-0 m-0 h-6 w-20'
      >
        {parentId ? 'Balas' : 'Komentar'}
      </Button>
      {open && form}
    </div>
  );
}
