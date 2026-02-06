import { useState, useRef } from 'react';

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  if (images.length === 0) return null;

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.clientWidth;
    const newIndex = Math.round(scrollLeft / itemWidth);
    setActiveIndex(newIndex);
  };

  return (
    <div>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="custom-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto rounded-lg"
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${alt} reference ${i + 1}`}
            loading="lazy"
            className="h-32 w-auto shrink-0 snap-center rounded-lg object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ))}
      </div>
      {images.length > 1 && (
        <div className="mt-2 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex
                  ? 'w-4 bg-brand'
                  : 'w-1.5 bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
