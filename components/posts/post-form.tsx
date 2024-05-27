'use client';

import { PostFormState } from '@/types';
import { Button } from '../ui/button';

type PostFormProps = {
  formButton: string;
  formTitle: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  text: PostFormState;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const PostForm = ({
  handleSubmit,
  text,
  handleChange,
  formTitle,
  formButton,
}: PostFormProps) => {
  return (
    <main id='main'>
      <section className='create-post-content '>
        <div className='container  mx-auto px-4'>
          <div className='row d-flex justify-content-center flex justify-center'>
            <div className='col-lg-10 lg:w-10/12'>
              <div className='row d-flex justify-content-center mt-5  flex flex-col justify-center '>
                <div className='row '>
                  <div className='col-lg-12 text-center mb-5 '>
                    <h1 className='page-title text-2xl font-bold'>
                      {formTitle}
                    </h1>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className='row grid grid-cols-2 gap-4'>
                    <div className='col-lg-6 mb-3 '>
                      <label htmlFor='title' className='block'>
                        Title{' '}
                      </label>
                      <input
                        type='text'
                        name='title'
                        defaultValue={text.title}
                        className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        placeholder='Enter Title'
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-lg-6 mb-3 '>
                      <label htmlFor='img'>ImageURL </label>
                      <input
                        type='text'
                        name='img'
                        defaultValue={text.img || ''}
                        className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        placeholder='Enter Image url'
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-lg-6 mb-3 '>
                      <label htmlFor='category'>Category </label>
                      <input
                        type='text'
                        name='category'
                        defaultValue={text.category}
                        className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        placeholder='Enter Post Category'
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-lg-6 mb-3 '>
                      <label htmlFor='author'>Author </label>
                      <input
                        type='text'
                        name='author'
                        defaultValue={text.author}
                        className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        placeholder='Enter Author name'
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-12 mb-3  col-start-1 col-end-3 '>
                      <label htmlFor='brief'>Brief </label>
                      <textarea
                        rows={10}
                        cols={30}
                        name='brief'
                        defaultValue={text.brief}
                        className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        placeholder='Enter Post Brief'
                        onChange={handleChange}
                      />
                    </div>
                    <div className='mb-3 '>
                      {text.validate === 'loading' && (
                        <div className='loading text-rose-500 '>
                          Sending Post
                        </div>
                      )}
                      {text.validate === 'incomplete' && (
                        <div className='error-message  text-rose-500 '>
                          Field can not be empty
                        </div>
                      )}
                      {text.validate === 'success' && (
                        <div className='sent-message text-emerald-600'>
                          Successfully Posted
                        </div>
                      )}
                      {text.validate === 'error' && (
                        <div className='error-message text-rose-500 '>
                          Server Error
                        </div>
                      )}
                    </div>
                    <div className='col-12 d-flex justify-content-center col-span-2 flex justify-center'>
                      <Button type='submit' variant='outline'>
                        {formButton}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PostForm;
