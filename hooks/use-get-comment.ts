// import { getCommentByPostId } from '@/actions/get-comment';
// import useCommentsStore from '@/store/use-comments-store';

// import { useEffect } from 'react';

// export const useGetComment = (postId?: string) => {
//   const { comments, error, setComments, isLoading, setIsLoading, setError } =
//     useCommentsStore();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);

//         if (postId) {
//           const res = await getCommentByPostId(postId);
//           if (res) setComments(res);
//         }
//       } catch (err) {
//         console.error('error fetch data', err);
//         setError('error');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [postId, error, setIsLoading, setError, setComments]);
//   return { isLoading, error, comments };
// };

//Alternative I

// import { getCommentByPostId } from '@/actions/get-comment';
// import useCommentsStore from '@/store/use-comments-store';

// import { useEffect, useRef } from 'react';

// export const useGetComment = (postId?: string) => {
//   const { comments, error, setComments, isLoading, setIsLoading, setError } =
//     useCommentsStore();

//   // Use a ref to store the previous postId and prevent unnecessary re-fetches
//   const prevPostIdRef = useRef(postId);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);

//         // Only fetch data if postId has changed or is initially provided
//         if (postId && postId !== prevPostIdRef.current) {
//           const res = await getCommentByPostId(postId);
//           if (res) setComments(res);
//           prevPostIdRef.current = postId; // Update ref after successful fetch
//         }
//       } catch (err) {
//         console.error('error fetch data', err);
//         setError('error');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();

//     // Cleanup function to avoid memory leaks (optional)
//     return () => {};
//   }, [postId, error, setIsLoading, setError, setComments]);

//   return { isLoading, error, comments };
// };

// Alternative II

// import { getCommentByPostId } from '@/actions/get-comment';
// import useCommentsStore from '@/store/use-comments-store';

// import { useEffect, useRef } from 'react';

// export const useGetComment = (postId?: string) => {
//   const { comments, error, setComments, isLoading, setIsLoading, setError } =
//     useCommentsStore();

//   // Use a ref to track the previous postId to prevent unnecessary re-fetches
//   const prevPostIdRef = useRef<string | undefined>(undefined);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);

//         // Only fetch data if postId has changed
//         if (postId && postId !== prevPostIdRef.current) {
//           prevPostIdRef.current = postId; // Update ref for next render

//           const res = await getCommentByPostId(postId);
//           if (res) setComments(res);
//         }
//       } catch (err) {
//         console.error('error fetch data', err);
//         setError('error');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [postId, error, setIsLoading, setError, setComments]); // Only include necessary dependencies

//   return { isLoading, error, comments };
// };

// Alternative III

// import { getCommentByPostId } from '@/actions/get-comment';
// import useCommentsStore from '@/store/use-comments-store';

// import { useEffect, useState } from 'react';

// export const useGetComment = (postId?: string) => {
//   const { comments, error, setComments, isLoading, setIsLoading, setError } =
//     useCommentsStore();

//   const [isInitialLoad, setIsInitialLoad] = useState(true); // Flag for initial load

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);

//         if (postId) {
//           const res = await getCommentByPostId(postId);
//           if (res) setComments(res);
//         }
//       } catch (err) {
//         console.error('error fetch data', err);
//         setError('error');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (isInitialLoad && postId) {
//       // Fetch only on initial load and presence of postId
//       fetchData();
//       setIsInitialLoad(false); // Mark initial load as complete
//     }
//   }, [postId, isInitialLoad]); // Dependency array includes only postId and isInitialLoad

//   return { isLoading, error, comments };
// };

//Alternative Number 4

import { getAllComments, getCommentByPostId } from '@/actions/get-comment';
import useCommentsStore from '@/store/use-comments-store';
import { useRef, useEffect } from 'react';

export const useGetComment = (postId?: string) => {
  const { comment, error, setComment, isLoading, setIsLoading, setError } =
    useCommentsStore();

  // Use a ref to store the previous postId and prevent unnecessary re-fetches
  const prevPostIdRef = useRef<string | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Only fetch data if postId has changed or is initially provided
        if (postId && postId !== prevPostIdRef.current) {
          const res = await getCommentByPostId(postId);
          if (res) setComment(res);
          prevPostIdRef.current = postId; // Update ref after successful fetch
        }
      } catch (err: any) {
        console.error('error fetch data', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [postId, setIsLoading, setError, comment, setComment]);

  return { isLoading, error, comment, setComment };
};

export const useGetAllComments = () => {
  const { comments, error, setComments, isLoading, setIsLoading, setError } =
    useCommentsStore();

  // Use a ref to store the previous postId and prevent unnecessary re-fetches
  const prevPostIdRef = useRef<string | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Only fetch data if postId has changed or is initially provided

        const res = await getAllComments();
        if (res) setComments(res);
      } catch (err: any) {
        console.error('error fetch data', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setIsLoading, setError, setComments]);

  return { isLoading, error, comments, setComments };
};
