'use client';

import BackButton from '@/components/back-button';
import { Textarea } from '@/components/ui';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { InputCustom } from '@/components/ui/inputCustom';

import posts from '@/data/posts';
import { FormSchema, formSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type PostEditPageProps = {
  params: {
    id: string;
  };
};

const PostEditPage = ({ params }: PostEditPageProps) => {
  const post = posts.find((post) => post.id === params.id);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || '',
      body: post?.body || '',
      author: post?.author || '',
      date: post?.date || '',
    },
  });
  const { handleSubmit } = form;

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };

  return (
    <>
      <BackButton text='Back to Posts' link='/dashboard/posts' />

      <h3 className='text-2xl mb-4'>Edit Post</h3>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8 '>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70 '>
                  Title
                </FormLabel>
                <FormControl>
                  <InputCustom
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0 '
                    placeholder='Enter Title'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='body'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70 '>
                  Post Content
                </FormLabel>
                <FormControl>
                  <Textarea
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0 '
                    placeholder='Enter Title'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='author'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70 '>
                  Author
                </FormLabel>
                <FormControl>
                  <InputCustom
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0 '
                    placeholder='Enter Title'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70 '>
                  Date
                </FormLabel>
                <FormControl>
                  <InputCustom
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0 '
                    placeholder='Enter Title'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className='w-full dark:bg-slate-800 dark:text-white '
            variant='ghost'
            size='sm'>
            Update Post
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PostEditPage;
