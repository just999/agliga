import { getPost, getPostByTopicAndSlug, getPosts } from '@/actions/get-post';
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
          const res = await getPost(postId);
          if (res) setItem(res);
        } else if (postId && slug) {
          const res: any = await getPostByTopicAndSlug(postId, slug);
          if (!res) throw new Error('data fetching failed');
          setItemBySlugAndPostId(res);
        } else {
          const res: any = await getPosts();
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
  }, [
    postId,
    slug,
    error,
    setItem,
    setIsLoading,
    setError,
    setItems,
    setItemBySlugAndPostId,
  ]);
  return { isLoading, error, item, items, itemBySlugAndPostId, setIsLoading };
};
