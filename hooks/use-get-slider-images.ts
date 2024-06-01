'use client';

import { fetchSliderImageById, fetchSliders } from '@/lib/queries/sliders';
import { useImageStore } from '@/store/use-image-store';
import { useCallback, useEffect } from 'react';

export const useSliderImages = (id?: string) => {
  const { images, error, isLoading, setImages, setError, setIsLoading } =
    useImageStore();

  const fetchData = useCallback(async () => {
    if (!id) {
      try {
        setIsLoading(true);
        const res = await fetchSliders();
        if (!res) throw new Error('error fetching images slider');
        res.map((img) => setImages(img.images));
        return res;
      } catch (err) {
        console.error('Error fetching slider images', err);
        setError('Error');
      }
    } else {
      try {
        setIsLoading(true);
        const res = await fetchSliderImageById(id);
        if (!res) throw new Error('error fetching images slider');
        return res;
      } catch (err) {
        console.error('Error fetching slider images', err);
        setError('Error');
      }
    }
  }, [id, setError, setImages, setIsLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { isLoading, error, images, setImages, setIsLoading };
};

// export const useGetSliderImagesById = (id: string) => {
//   const { images, error, isLoading, setImages, setError, setIsLoading } =
//     useImageStore();

//   const fetchData = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const res = await fetchSliderImageById(id);
//       if (!res) throw new Error('error fetching images slider');
//       // setImages(res);
//       return res;
//     } catch (err) {
//       console.error('Error fetching slider images', err);
//       setError('Error');
//     }
//   }, [id, setError, setIsLoading]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return { isLoading, error, images, setImages, setIsLoading };
// };
