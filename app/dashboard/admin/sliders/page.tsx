import { getAllSliders } from '@/actions/slider-actions';
import SliderForm from './slider-form';

export const dynamic = 'force-dynamic';

type SliderPageProps = {};

const SlidersPage = async () => {
  const result = await getAllSliders();
  if (result.status === 'error') {
    // Handle the error case
    console.error('Error fetching sliders:');
    return <div>Error fetching sliders.</div>;
  }

  if (Array.isArray(result.data) && result.data.length > 0) {
    // Handle the success case
    return <SliderForm images={result.data} />;
  } else {
    // Handle the case when no sliders are found
    return <SliderForm images={[]} />;
  }
};

export default SlidersPage;
