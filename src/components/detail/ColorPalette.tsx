import { useClipboard } from '@/hooks/useClipboard';

interface ColorPaletteProps {
  colors: string[];
}

export function ColorPalette({ colors }: ColorPaletteProps) {
  const { copy } = useClipboard();

  if (colors.length === 0) return null;

  return (
    <div>
      <h4 className="mb-2 text-sm font-medium text-text-secondary dark:text-gray-400">
        配色方案 / Color Palette
      </h4>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => copy(color)}
            className="group/swatch relative h-7 w-7 rounded-full border-2 border-white shadow-sm transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-gray-700"
            style={{ backgroundColor: color }}
            aria-label={`Copy color ${color}`}
          >
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-gray-900 px-2 py-1 text-[10px] font-mono text-white opacity-0 transition-opacity group-hover/swatch:opacity-100 dark:bg-gray-200 dark:text-gray-900">
              {color}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
