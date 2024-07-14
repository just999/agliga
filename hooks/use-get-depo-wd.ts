'use client';

import { useEffect } from 'react';
import {
  fetchDepo,
  fetchDepoById,
  fetchWd,
  fetchWdById,
} from '@/lib/queries/depo-wd';

import useDepoWdStore from '@/store/use-depo-wd-store';

export const useGetDepo = (id?: string) => {
  const {
    depo,
    depos,
    setDepo,
    setDepos,
    error,
    isLoading,
    setIsLoading,
    setError,
  } = useDepoWdStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (id) {
          const depo: any = await fetchDepoById(id);
          if (depo) setDepo(depo);
        } else if (!id) {
          const depos: any = await fetchDepo();
          if (depos) setDepos(depos);
        }
      } catch (err) {
        console.error('error fetch data', err);
        setError('error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setError, setDepo, setDepos, setIsLoading]);
  return { isLoading, error, depo, depos };
};

export const useGetWd = (id?: string) => {
  const { wd, wds, setWd, setWds, error, isLoading, setIsLoading, setError } =
    useDepoWdStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (id) {
          const wd: any = await fetchWdById(id);
          if (wd) setWd(wd);
        } else if (!id) {
          const wds: any = await fetchWd();
          if (wds) setWds(wds);
        }
      } catch (err) {
        console.error('error fetch data', err);
        setError('error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setError, setWd, setWds, setIsLoading]);
  return { isLoading, error, wd, wds };
};
