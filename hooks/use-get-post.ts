'use client';

import { getPostByTopicAndSlug } from '@/actions/get-post';

import { fetchPosts, getPostByPostId } from '@/lib/queries/posts';
import usePostsStore from '@/store/use-posts-store';

import { useEffect } from 'react';

// const useGetPost = (postId?: string, slug?: string) => {
//   const {
//     item,
//     setItem,
//     items,
//     itemBySlugAndPostId,
//     setItems,
//     setItemByIdAndSlug,
//     isLoading,
//     setIsLoading,
//     error,
//     setError,
//   } = usePostsStore();

//   useEffect(() => {
//     if (!postId) return;
//     const fetchData = async (postId: string) => {
//       try {
//         setIsLoading(true);
//         const res = await getPost(postId);
//         setItem(res);
//       } catch (err) {
//         console.error('error fetch data', err);
//         setError('error');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData(postId);
//   }, [postId, setItem, setIsLoading, setError]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const res = await getPosts();
//         setItems(res);
//       } catch (err) {
//         console.error('error fetch data', err);
//         setError('error');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [setItems, setIsLoading, setError]);

//   useEffect(() => {
//     const fetchDataBySlugAndPostId = async (postId?: string, slug?: string) => {
//       if (!postId || !slug) throw new Error('No data found!');
//       try {
//         setIsLoading(true);
//         const res = await getPostByTopicAndSlug(postId, slug);
//         if (!res) throw new Error('failed fetching data');
//         setItemByIdAndSlug(res);
//       } catch (err) {
//         console.error('error fetch data', err);
//         setError('error');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchDataBySlugAndPostId(postId, slug);
//   }, [setItems, setIsLoading, setError]);

//   return { isLoading, error, item, items, itemBySlugAndPostId };
// };

// export default useGetPost;

export const useGetPost = (postId?: string, slug?: string) => {
  const {
    item,
    setItem,
    items,
    error,
    setItemBySlugAndPostId,
    itemBySlugAndPostId,
    setItems,
    isLoading,
    setIsLoading,
    setError,
  } = usePostsStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (postId && !slug) {
          const res = await getPostByPostId(postId);
          if (!res) throw new Error('No post found!');
          setItem(res);
        } else if (postId && slug) {
          const res: any = await getPostByTopicAndSlug(postId, slug);
          if (!res) throw new Error('data fetching failed');
          setItemBySlugAndPostId(res);
        } else {
          const res: any = await fetchPosts();
          setItems(res);
        }
      } catch (err) {
        console.error('error fetch data', err);
        setError('error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setError, setItem, setItems, postId]);
  return { isLoading, error, item, items, itemBySlugAndPostId, setIsLoading };
};

export const useRandomPost = () => {
  const {
    items,
    setRandomItem,
    randomItem,
    setItems,
    setIsLoading,
    setItem,
    setItemBySlugAndPostId,
    setError,
  } = usePostsStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res: any = await fetchPosts();
        setItems(res);
      } catch (err) {
        console.error('error fetch data', err);
        setError('error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setError, setIsLoading, setItems]);
  if (items.length > 0) {
    const randomPost = items.sort(() => Math.random() - Math.random())[0];
    setRandomItem(randomPost);
    return randomPost;
  } else {
    console.warn('No Posts available to select a random items');
  }

  return { randomItem };
};
