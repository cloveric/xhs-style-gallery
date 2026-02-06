import { Copy, Check } from 'lucide-react';
import { useClipboard } from '@/hooks/useClipboard';

interface CopyButtonProps {
  text: string;
  className?: string;
  size?: number;
}

export function CopyButton({ text, className = '', size = 16 }: CopyButtonProps) {
  const { copied, copy } = useClipboard();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        copy(text);
      }}
      className={`inline-flex items-center justify-center rounded-lg p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
        copied
          ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
          : 'bg-white/90 text-text-secondary hover:bg-white hover:text-text-primary dark:bg-gray-800/90 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
      } ${className}`}
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? <Check size={size} /> : <Copy size={size} />}
    </button>
  );
}
