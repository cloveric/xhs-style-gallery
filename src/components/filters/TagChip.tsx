interface TagChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  variant?: 'tag' | 'subcategory' | 'usecase';
}

const variantStyles = {
  tag: {
    active: 'bg-brand text-white',
    inactive: 'bg-gray-100 text-text-secondary hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
  },
  subcategory: {
    active: 'bg-indigo-500 text-white',
    inactive: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50',
  },
  usecase: {
    active: 'bg-emerald-500 text-white',
    inactive: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50',
  },
};

export function TagChip({ label, active, onClick, variant = 'tag' }: TagChipProps) {
  const styles = variantStyles[variant];

  return (
    <button
      onClick={onClick}
      className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
        active ? styles.active : styles.inactive
      }`}
    >
      {label}
    </button>
  );
}
