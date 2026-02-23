// src/components/ReactCarousel.jsx
import { useCallback, useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function ReactCarousel({ items, autoplay }) {
  const [api, setApi] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const plugins = autoplay
    ? [
        Autoplay({
          delay: autoplay,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]
    : [];

  const scrollTo = useCallback((index) => api?.scrollTo(index), [api]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    const onReInit = () => {
      setScrollSnaps(api.scrollSnapList());
      onSelect();
    };

    onReInit();
    api.on('select', onSelect);
    api.on('reInit', onReInit);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onReInit);
    };
  }, [api]);

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={plugins}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {(items || ['1', '2', '3', '4', '5', '6']).map((item, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="min-h-[200px] md:min-h-[300px] bg-slate-100 rounded-xl flex items-center justify-center text-6xl font-bold text-slate-400 hover:bg-slate-200 transition-colors">
                {item}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="mt-4 flex items-center justify-center gap-2">
        {scrollSnaps.map((_, index) => {
          const isActive = index === selectedIndex;

          return (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => scrollTo(index)}
              className={`size-2 rounded-full transition-all ${
                isActive ? 'bg-primary scale-125' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
