'use client';

import { useEffect, useMemo, useState } from 'react';

import { createPost } from '@/actions/post-actions';
import {
  Button,
  Card,
  HeadingLogo,
  InputCustom,
  SelectInput,
  Spinner,
  Textarea,
} from '@/components/shadcn/ui';
import { useTopics } from '@/hooks/use-topics';
import { cn, handleFormServerErrors } from '@/lib/utils';
import { PostSchema, postSchema } from '@/schemas';
import { PostProps } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Post } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type FieldKey = keyof PostSchema | 'category.value' | 'category.icon';

type PostFormProps = {
  post: PostProps;
};

const EditPostForm = ({ post }: PostFormProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setIsMounted(true), []);

  const methods = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    mode: 'onTouched',
  });

  const { getTopics } = useTopics();

  const topics = getTopics();
  const topicOptions = useMemo(
    () =>
      topics.map((topic) => ({
        value: topic.value,
        icon: topic.icon,
      })),
    [topics]
  );

  const {
    register,
    getValues,
    setValue,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting, isLoading },
  } = methods;

  const setCustomValue = (id: FieldKey, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  // const filteredCat = topics.filter((cat) => cat.value === post?.category) || {
  //   values: '',
  //   icon: '',
  // };

  useEffect(() => {
    if (post) {
      const filteredCat = topics.filter(
        (cat) => cat.value === post?.category
      ) || [{ value: '', icon: '' }];

      reset({
        title: post.title,
        category: filteredCat[0],
        brief: post.brief || '',
        author: post.author || '',
      });
      // Set the img value after reset using setValue
      if (post.img instanceof File) {
        setValue('img', post.img);
      } else if (typeof post.img === 'string') {
        setValue('img', post.img);
      }
    }
  }, [post, reset, setValue, topics]);

  const onSubmit = async (data: PostSchema) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('category', data.category.value);
    formData.append('author', data.author);
    formData.append('brief', data.brief);

    // Handle image upload based on its type:
    if (data.img instanceof File) {
      // If it's a single file
      formData.append('img', data.img);
    } else if (typeof data.img === 'string') {
      // If it's a URL string
      formData.append('img', data.img);
    }

    const res = await createPost(formData);
    if (res.status === 'error') {
      handleFormServerErrors(res, setError);
    } else {
      router.refresh();
    }
  };
  return (
    <Card className='w-3/4 mx-auto p-4 shadow-lg'>
      <div className='flex flex-col space-y-4'>
        <HeadingLogo title='New Post' subtitle='Lets create Post' />
        {isMounted ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full flex flex-col gap-3 px-4'
          >
            <InputCustom
              className='h-12'
              placeholder='Type a message'
              defaultValue={getValues('title')}
              {...register('title')}
              isInvalid={!!errors.title}
              errorMessage={errors.title?.message as string}
            />

            <div className='mb-4'>
              <InputCustom
                type='file'
                className='h-12'
                // accept={ACCEPTED_IMAGE_TYPES.join(',')}
                // defaultValue={getValues('img')}
                placeholder='image'
                {...register('img')}
                isInvalid={!!errors.img}
                errorMessage={errors.img?.message as string}
              />
            </div>

            <SelectInput
              register={register}
              label='category'
              id='category'
              defaultValue={post?.category}
              isMulti={false}
              onChange={(value) => setCustomValue('category', value)}
              placeholder='Categories'
              options={() => topicOptions}
              errors={errors}
              required
            />

            <InputCustom
              id='author'
              type='text'
              className='h-12'
              placeholder='Author'
              defaultValue={getValues('author')}
              {...register('author')}
              isInvalid={!!errors.author}
              errorMessage={errors.author?.message}
            />

            <Textarea
              id='brief'
              placeholder='description'
              defaultValue={getValues('brief')}
              {...register('brief')}
              rows={6}
              cols={20}
              isInvalid={!!errors.brief}
              errorMessage={errors.brief?.message}
            />
            <Button
              type='submit'
              variant='ghost'
              className={cn(
                'rounded-lg cursor-pointer  bg-sky-500 text-gray-50 px-2 py-4 h-12',
                isValid && 'hover:bg-blue-300 hover:text-blue-800'
              )}
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? (
                <Spinner className='gap-0' size={14} color='sky-700' />
              ) : (
                <div className='text-base '>Submit</div>
              )}
            </Button>
          </form>
        ) : null}

        {/* {isValid ? 'valid' : 'invalid'} */}
      </div>
    </Card>
  );
};

export default EditPostForm;
