import { Heart } from 'lucide-react';
import { categories, getSubcategoriesForCategory } from '@/data/categories';
import { SearchInput } from './SearchInput';
import { TagChip } from './TagChip';
import type { FilterState, StyleCategory, UseCase } from '@/types/style';

interface FilterBarProps {
  filterState: FilterState;
  allTags: string[];
  allSubcategories: string[];
  allUseCases: UseCase[];
  favCount: number;
  onFilterChange: (update: Partial<FilterState>) => void;
}

export function FilterBar({ filterState, allTags, allSubcategories, allUseCases, favCount, onFilterChange }: FilterBarProps) {
  const handleCategoryChange = (id: StyleCategory | 'all') => {
    onFilterChange({ category: id, showFavoritesOnly: false });
  };

  const handleSubcategoryToggle = (subcatId: string) => {
    onFilterChange({
      subcategory: filterState.subcategory === subcatId ? 'all' : subcatId,
    });
  };

  const handleUseCaseToggle = (uc: UseCase) => {
    onFilterChange({
      useCase: filterState.useCase === uc ? 'all' : uc,
    });
  };

  const handleTagToggle = (tag: string) => {
    const selected = filterState.selectedTags;
    const next = selected.includes(tag)
      ? selected.filter((t) => t !== tag)
      : [...selected, tag];
    onFilterChange({ selectedTags: next });
  };

  const handleFavToggle = () => {
    onFilterChange({ showFavoritesOnly: !filterState.showFavoritesOnly, category: 'all', subcategory: 'all', useCase: 'all' });
  };

  // Get subcategory metadata for the selected category
  const subcategoryMetas = filterState.category !== 'all'
    ? getSubcategoriesForCategory(filterState.category).filter((s) => allSubcategories.includes(s.id))
    : [];

  return (
    <div className="space-y-4">
      {/* Search */}
      <SearchInput
        value={filterState.searchQuery}
        onChange={(searchQuery) => onFilterChange({ searchQuery })}
      />

      {/* Category tabs + favorites */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
              filterState.category === cat.id && !filterState.showFavoritesOnly
                ? 'text-white'
                : 'bg-gray-100 text-text-secondary hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            style={
              filterState.category === cat.id && !filterState.showFavoritesOnly
                ? { backgroundColor: cat.color }
                : undefined
            }
          >
            {cat.label_zh}
          </button>
        ))}

        {/* Favorites button */}
        <button
          onClick={handleFavToggle}
          className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
            filterState.showFavoritesOnly
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-text-secondary hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          <Heart size={14} fill={filterState.showFavoritesOnly ? 'currentColor' : 'none'} />
          收藏{favCount > 0 ? ` (${favCount})` : ''}
        </button>
      </div>

      {/* Subcategory chips - appears when a specific category is selected */}
      {subcategoryMetas.length > 0 && !filterState.showFavoritesOnly && (
        <div className="custom-scrollbar flex gap-2 overflow-x-auto pb-1">
          {subcategoryMetas.map((subcat) => (
            <TagChip
              key={subcat.id}
              label={subcat.label_zh}
              active={filterState.subcategory === subcat.id}
              onClick={() => handleSubcategoryToggle(subcat.id)}
              variant="subcategory"
            />
          ))}
        </div>
      )}

      {/* Use-case chips - always visible */}
      {allUseCases.length > 0 && !filterState.showFavoritesOnly && (
        <div>
          <span className="mb-1.5 block text-xs font-medium text-text-secondary dark:text-gray-400">
            按场景
          </span>
          <div className="custom-scrollbar flex gap-2 overflow-x-auto pb-1">
            {allUseCases.map((uc) => (
              <TagChip
                key={uc}
                label={uc}
                active={filterState.useCase === uc}
                onClick={() => handleUseCaseToggle(uc)}
                variant="usecase"
              />
            ))}
          </div>
        </div>
      )}

      {/* Tag chips - scrollable, top 20 by frequency */}
      {allTags.length > 0 && !filterState.showFavoritesOnly && (
        <div className="custom-scrollbar flex gap-2 overflow-x-auto pb-1">
          {allTags.map((tag) => (
            <TagChip
              key={tag}
              label={tag}
              active={filterState.selectedTags.includes(tag)}
              onClick={() => handleTagToggle(tag)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
