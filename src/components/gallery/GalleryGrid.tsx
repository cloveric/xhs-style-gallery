import Masonry from 'react-masonry-css';
import { StyleCard } from './StyleCard';
import type { StyleTemplate } from '@/types/style';

interface GalleryGridProps {
  styles: StyleTemplate[];
  onSelectStyle: (id: string) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

const breakpointColumns = {
  default: 4,
  1280: 3,
  1024: 2,
  640: 1,
};

export function GalleryGrid({ styles, onSelectStyle, isFavorite, onToggleFavorite }: GalleryGridProps) {
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {styles.map((style, index) => (
        <div key={style.id} className="mb-4">
          <StyleCard
            style={style}
            onClick={() => onSelectStyle(style.id)}
            index={index}
            isFavorite={isFavorite(style.id)}
            onToggleFavorite={() => onToggleFavorite(style.id)}
          />
        </div>
      ))}
    </Masonry>
  );
}
