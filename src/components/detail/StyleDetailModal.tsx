import { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { Badge } from '@/components/common/Badge';
import { PromptBlock } from './PromptBlock';
import { ColorPalette } from './ColorPalette';
import { ImageCarousel } from './ImageCarousel';
import { getCategoryMeta, getSubcategoryMeta } from '@/data/categories';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import type { StyleTemplate } from '@/types/style';

interface StyleDetailModalProps {
  style: StyleTemplate | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const difficultyConfig = {
  easy: { label: '入门', color: '#22c55e' },
  medium: { label: '进阶', color: '#eab308' },
  advanced: { label: '高级', color: '#ef4444' },
};

export function StyleDetailModal({ style, onClose, isFavorite, onToggleFavorite }: StyleDetailModalProps) {
  const [tipsOpen, setTipsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Reset state when switching styles
  useEffect(() => {
    setTipsOpen(false);
    setImgError(false);
  }, [style?.id]);

  if (!style) return null;

  const categoryMeta = getCategoryMeta(style.category);
  const subcatMeta = getSubcategoryMeta(style.subcategory);
  const primaryColor = style.color_palette[0] || '#6b7280';

  const content = (
    <div className="custom-scrollbar h-full overflow-y-auto">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1.5 text-gray-500 shadow-sm transition-colors hover:text-gray-800 dark:bg-gray-800/90 dark:text-gray-400 dark:hover:text-gray-200"
        aria-label="Close detail panel"
      >
        <X size={20} />
      </button>

      {/* Preview image */}
      <div className="relative flex w-full items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-900">
        {!imgError ? (
          <img
            src={style.preview_image}
            alt={`${style.name_zh} preview`}
            className="max-h-[60vh] w-auto max-w-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="flex aspect-[3/4] w-full items-center justify-center"
            style={{ backgroundColor: primaryColor }}
          >
            <span className="text-2xl font-bold text-white drop-shadow-md">
              {style.name_zh}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-5 p-5">
        {/* Header */}
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge label={categoryMeta.label_zh} color={categoryMeta.color} />
            {subcatMeta && (
              <Badge label={subcatMeta.label_zh} color="#8b5cf6" />
            )}
            {style.difficulty && (
              <Badge
                label={difficultyConfig[style.difficulty].label}
                color={difficultyConfig[style.difficulty].color}
              />
            )}
            <button
              onClick={() => onToggleFavorite(style.id)}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                isFavorite
                  ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                  : 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={12} fill={isFavorite ? 'currentColor' : 'none'} />
              {isFavorite ? '已收藏' : '收藏'}
            </button>
          </div>
          <h2 className="text-xl font-bold text-text-primary dark:text-white">
            {style.name_zh}
          </h2>
          <p className="text-sm text-text-secondary dark:text-gray-400">
            {style.name_en}
          </p>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <p className="text-sm leading-relaxed text-text-primary dark:text-gray-200">
            {style.description_zh}
          </p>
          <p className="text-xs leading-relaxed text-text-secondary dark:text-gray-400">
            {style.description_en}
          </p>
        </div>

        {/* Reference images */}
        {style.reference_images.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-medium text-text-secondary dark:text-gray-400">
              参考图片 / References
            </h4>
            <ImageCarousel images={style.reference_images} alt={style.name_en} />
          </div>
        )}

        {/* Best for */}
        {style.best_for.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-medium text-text-secondary dark:text-gray-400">
              适用场景 / Best For
            </h4>
            <div className="flex flex-wrap gap-2">
              {style.best_for.map((item) => (
                <Badge key={item} label={item} color="#6366f1" />
              ))}
            </div>
          </div>
        )}

        {/* Use cases */}
        {style.use_cases && style.use_cases.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-medium text-text-secondary dark:text-gray-400">
              场景标签 / Use Cases
            </h4>
            <div className="flex flex-wrap gap-2">
              {style.use_cases.map((uc) => (
                <Badge key={uc} label={uc} color="#10b981" />
              ))}
            </div>
          </div>
        )}

        {/* Prompt */}
        <div>
          <h4 className="mb-2 text-sm font-medium text-text-secondary dark:text-gray-400">
            Prompt
          </h4>
          <PromptBlock prompt={style.prompt} />
        </div>

        {/* Prompt tips - collapsible */}
        {style.prompt_tips && (
          <div>
            <button
              onClick={() => setTipsOpen(!tipsOpen)}
              className="flex w-full items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary dark:text-gray-400 dark:hover:text-gray-200"
            >
              提示技巧 / Prompt Tips
              {tipsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {tipsOpen && (
              <p className="mt-2 rounded-lg bg-amber-50 p-3 text-sm leading-relaxed text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
                {style.prompt_tips}
              </p>
            )}
          </div>
        )}

        {/* Color palette */}
        <ColorPalette colors={style.color_palette} />

        {/* Tags */}
        <div>
          <h4 className="mb-2 text-sm font-medium text-text-secondary dark:text-gray-400">
            标签 / Tags
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {style.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-text-secondary dark:bg-gray-800 dark:text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal open={!!style} onClose={onClose}>
      {isDesktop ? (
        /* Desktop: side panel */
        <div className="fixed inset-y-0 right-0 w-[420px] animate-slide-in-right bg-white shadow-2xl dark:bg-gray-950">
          {content}
        </div>
      ) : (
        /* Mobile: bottom sheet */
        <div className="fixed inset-x-0 bottom-0 max-h-[90vh] animate-slide-in-bottom rounded-t-2xl bg-white shadow-2xl dark:bg-gray-950">
          {/* Drag handle */}
          <div className="flex justify-center py-2">
            <div className="h-1 w-10 rounded-full bg-gray-300 dark:bg-gray-600" />
          </div>
          {content}
        </div>
      )}
    </Modal>
  );
}
