import { create } from 'zustand';

export type CaptchaProps = {
  captcha: string;
  isLoading: boolean;
  error: any;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: any) => void;
  setCaptcha: (captcha: string) => void;
};

const initialState = {
  captcha: '',
  isLoading: false,
  error: null,
};

const useCaptchaStore = create<CaptchaProps>((set) => ({
  ...initialState,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setError: (error) => set(() => ({ error })),
  setCaptcha: (captcha: string) => set(() => ({ captcha })),
}));

export default useCaptchaStore;
