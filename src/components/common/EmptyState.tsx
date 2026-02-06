import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <SearchX size={48} className="mb-4 text-gray-300 dark:text-gray-600" />
      <h3 className="mb-2 text-lg font-medium text-text-primary dark:text-gray-200">
        没有找到匹配的模板
      </h3>
      <p className="mb-6 text-sm text-text-secondary dark:text-gray-400">
        No templates match your current filters. Try adjusting your search.
      </p>
      <button
        onClick={onClearFilters}
        className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        清除筛选 / Clear Filters
      </button>
    </div>
  );
}
