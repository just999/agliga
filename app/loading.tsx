import BarLoaderSpinner from '@/components/bar-loader-spinner';

const Loading = () => {
  return (
    <BarLoaderSpinner
      color='#ff790b'
      width='100%'
      height={4}
      speedMultiplier={1}
    />
  );
};

export default Loading;
