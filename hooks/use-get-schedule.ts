import { getSchedule, getSchedules } from '@/actions/get-schedule';
import useSchedulesStore from '@/store/use-schedule-store';
import { id } from 'date-fns/locale';
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

        if (id) {
          const res = await getSchedule(id);
          if (res) setItem(res);
        } else {
          const res = await getSchedules();
          setItems(res);
        }
      } catch (err) {
        console.error('Error fetching data', err);
        setError('error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, error, setItem, setIsLoading, setError, setItems]);

  return { isLoading, error, items, item, setIsLoading };
};
