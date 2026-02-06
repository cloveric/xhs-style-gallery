import { useState, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FilterBar } from '@/components/filters/FilterBar';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { StyleDetailModal } from '@/components/detail/StyleDetailModal';
import { EmptyState } from '@/components/common/EmptyState';
import { useTheme } from '@/hooks/useTheme';
import { useStyles } from '@/hooks/useStyles';
import { useFavorites } from '@/hooks/useFavorites';
import type { FilterState } from '@/types/style';

const initialFilter: FilterState = {
  category: 'all',
  subcategory: 'all',
  useCase: 'all',
  searchQuery: '',
  selectedTags: [],
  showFavoritesOnly: false,
};

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const [filterState, setFilterState] = useState<FilterState>(initialFilter);
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null);
  const { favorites, toggle: toggleFavorite, isFavorite, count: favCount } = useFavorites();

  const { styles, allStyles, allTags, allSubcategories, allUseCases, total } = useStyles(filterState, favorites);

  const selectedStyle = selectedStyleId
    ? styles.find((s) => s.id === selectedStyleId)
      ?? allStyles.find((s) => s.id === selectedStyleId)
      ?? null
    : null;

  const handleFilterChange = useCallback((update: Partial<FilterState>) => {
    setFilterState((prev) => {
      const next = { ...prev, ...update };
      // Reset subcategory when category changes
      if (update.category !== undefined && update.subcategory === undefined) {
        next.subcategory = 'all';
      }
      return next;
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilterState(initialFilter);
  }, []);

  return (
    <div className="min-h-screen bg-surface-alt dark:bg-gray-950">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Filter section */}
        <section className="mb-6">
          <FilterBar
            filterState={filterState}
            allTags={allTags}
            allSubcategories={allSubcategories}
            allUseCases={allUseCases}
            favCount={favCount}
            onFilterChange={handleFilterChange}
          />
        </section>

        {/* Results count */}
        <div className="mb-4 text-sm text-text-secondary dark:text-gray-400">
          {filterState.showFavoritesOnly
            ? `${styles.length} 个收藏 / ${styles.length} favorites`
            : styles.length === total
              ? `${total} 个模板 / ${total} templates`
              : `${styles.length} / ${total} 个模板`}
        </div>

        {/* Gallery or empty state */}
        {styles.length > 0 ? (
          <GalleryGrid
            styles={styles}
            onSelectStyle={setSelectedStyleId}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        ) : (
          <EmptyState onClearFilters={handleClearFilters} />
        )}
      </main>

      <Footer />

      {/* Detail modal */}
      <StyleDetailModal
        style={selectedStyle}
        onClose={() => setSelectedStyleId(null)}
        isFavorite={selectedStyle ? isFavorite(selectedStyle.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
