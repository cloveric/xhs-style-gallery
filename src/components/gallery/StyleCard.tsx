import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/common/Badge';
import { CopyButton } from '@/components/common/CopyButton';
import { getCategoryMeta, getSubcategoryMeta } from '@/data/categories';
import type { StyleTemplate } from '@/types/style';

interface StyleCardProps {
  style: StyleTemplate;
  onClick: () => void;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function StyleCard({ style, onClick, index, isFavorite, onToggleFavorite }: StyleCardProps) {
  const [imgError, setImgError] = useState(false);
  const categoryMeta = getCategoryMeta(style.category);
  const subcatMeta = getSubcategoryMeta(style.subcategory);
  const primaryColor = style.color_palette[0] || '#6b7280';

  return (
    <article
      className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-gray-900"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`${style.name_zh} - ${style.name_en}`}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {!imgError ? (
          <img
            src={style.preview_image}
            alt={`${style.name_zh} preview`}
            loading={index < 8 ? 'eager' : 'lazy'}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center p-4"
            style={{ backgroundColor: primaryColor }}
          >
            <span className="text-center text-lg font-bold text-white drop-shadow-md">
              {style.name_zh}
            </span>
          </div>
        )}

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Category badge - top right */}
        <div className="absolute right-2 top-2">
          <Badge
            label={categoryMeta.label_zh}
            color={categoryMeta.color}
            className="bg-white/90 backdrop-blur-sm dark:bg-gray-900/90"
          />
        </div>

        {/* Favorite button - top left */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`absolute left-2 top-2 rounded-full p-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
            isFavorite
              ? 'bg-red-500/90 text-white'
              : 'bg-white/90 text-gray-400 opacity-0 hover:text-red-500 group-hover:opacity-100 dark:bg-gray-900/90'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={14} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* Copy button - bottom right */}
        <div className="absolute bottom-2 right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <CopyButton text={style.prompt} />
        </div>

        {/* Info overlay - bottom */}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="text-base font-bold text-white">{style.name_zh}</h3>
          <p className="text-xs text-white/70">{style.name_en}</p>
          {subcatMeta && (
            <p className="mt-0.5 text-[10px] text-white/50">{subcatMeta.label_zh}</p>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 p-3">
        {style.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-text-secondary dark:bg-gray-800 dark:text-gray-400"
          >
            {tag}
          </span>
        ))}
        {style.tags.length > 3 && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-text-secondary dark:bg-gray-800 dark:text-gray-400">
            +{style.tags.length - 3}
          </span>
        )}
      </div>
    </article>
  );
}
