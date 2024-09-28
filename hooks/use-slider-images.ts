import { getAllSliders } from '@/actions/slider-actions';
import { useQuery } from '@tanstack/react-query';

export function useSliderImages() {
  return useQuery({
    queryKey: ['sliderImages'],
    queryFn: getAllSliders,
    staleTime: 60000, // 1 minute
  });
}
