'use client';

import { fetchSchedule, fetchScheduleById } from '@/lib/queries/schedule';
import useSchedulesStore from '@/store/use-schedule-store';
import { ScheduleProps } from '@/types';

import { useEffect } from 'react';

export const useGetSchedules = (id?: string) => {
  const {
    items,
    item,
    isLoading,
    setItems,
    error,
    setItem,
    setError,
    setIsLoading,
  } = useSchedulesStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (!id) {
          const res = await fetchSchedule();
          if (res) {
            setItems(res);
          }
        } else if (id) {
          const res = await fetchScheduleById(id);
          if (res) setItem(res);
        }
      } catch (err) {
        console.error('Error fetching data', err);
        setError('error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, setError, setIsLoading, setItem, setItems]);

  return { isLoading, error, items, item, setIsLoading };
};
