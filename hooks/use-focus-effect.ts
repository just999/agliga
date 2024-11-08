import { EffectCallback, useEffect, useRef } from 'react';

export const useMountEffect = (fn: EffectCallback) => {
  useEffect(fn, []);
};

export const useFocus = () => {
  const htmlElRef = useRef<HTMLInputElement | null>(null);
  const setFocus = () => {
    if (htmlElRef.current) {
      htmlElRef.current.focus();
    } else {
      console.warn('useFocus: Element not found');
    }
  };

  return [htmlElRef, setFocus];
};
