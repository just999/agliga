'use client';

import EmblaCarousel from '@/components/carousel/embla-carousel';
import ClientOnly from '@/lib/client-only';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 4;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

type ClientEmblaCarouselProps = {
  children: React.ReactNode;
};

const ClientEmblaCarousel = ({ children }: ClientEmblaCarouselProps) => {
  return (
    <ClientOnly>
      <EmblaCarousel
        slides={SLIDES}
        options={OPTIONS}
        plugins={[Autoplay({ delay: 3000 })]}>
        {children}
      </EmblaCarousel>
    </ClientOnly>
  );
};

export default ClientEmblaCarousel;
