import { useMemo } from 'react';
import Fuse from 'fuse.js';
import stylesData from '@/data/styles.json';
import type { StyleTemplate, FilterState, UseCase } from '@/types/style';

const allStyles = stylesData as StyleTemplate[];

const fuseOptions = {
  keys: [
    { name: 'name_zh', weight: 3 },
    { name: 'name_en', weight: 3 },
    { name: 'tags', weight: 2 },
    { name: 'best_for', weight: 1.5 },
    { name: 'subcategory', weight: 1.5 },
    { name: 'use_cases', weight: 1 },
    { name: 'description_zh', weight: 1 },
    { name: 'description_en', weight: 1 },
  ],
  threshold: 0.4,
  minMatchCharLength: 1,
};

const fuse = new Fuse(allStyles, fuseOptions);

export function useStyles(filterState: FilterState, favoriteIds?: Set<string>) {
  const styles = useMemo(() => {
    let result = allStyles;

    // Favorites filter
    if (filterState.showFavoritesOnly && favoriteIds) {
      result = result.filter((s) => favoriteIds.has(s.id));
    }

    // Search filter
    if (filterState.searchQuery.trim()) {
      const searchResults = fuse.search(filterState.searchQuery.trim());
      const searchIds = new Set(searchResults.map((r) => r.item.id));
      result = result.filter((s) => searchIds.has(s.id));
    }

    // Category filter
    if (filterState.category !== 'all') {
      result = result.filter((s) => s.category === filterState.category);
    }

    // Subcategory filter
    if (filterState.subcategory !== 'all') {
      result = result.filter((s) => s.subcategory === filterState.subcategory);
    }

    // Use-case filter
    if (filterState.useCase !== 'all') {
      result = result.filter((s) => s.use_cases.includes(filterState.useCase as UseCase));
    }

    // Tag filter
    if (filterState.selectedTags.length > 0) {
      result = result.filter((s) =>
        filterState.selectedTags.every((tag) => s.tags.includes(tag)),
      );
    }

    return result;
  }, [filterState, favoriteIds]);

  // Top tags: sorted by frequency, limited to most useful ones
  const allTags = useMemo(() => {
    const categoryFiltered = filterState.category === 'all'
      ? allStyles
      : allStyles.filter((s) => s.category === filterState.category);
    const tagCount = new Map<string, number>();
    categoryFiltered.forEach((s) =>
      s.tags.forEach((t) => tagCount.set(t, (tagCount.get(t) || 0) + 1)),
    );
    // Sort by frequency descending, take top 20
    return [...tagCount.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([tag]) => tag);
  }, [filterState.category]);

  // Subcategories present in the category-filtered styles
  const allSubcategories = useMemo(() => {
    const categoryFiltered = filterState.category === 'all'
      ? allStyles
      : allStyles.filter((s) => s.category === filterState.category);
    const subcatSet = new Set<string>();
    categoryFiltered.forEach((s) => {
      if (s.subcategory) subcatSet.add(s.subcategory);
    });
    return [...subcatSet];
  }, [filterState.category]);

  // Use-case values present in current filtered set (after category + subcategory filters)
  const allUseCases = useMemo(() => {
    let base = allStyles;
    if (filterState.category !== 'all') {
      base = base.filter((s) => s.category === filterState.category);
    }
    if (filterState.subcategory !== 'all') {
      base = base.filter((s) => s.subcategory === filterState.subcategory);
    }
    const useCaseSet = new Set<UseCase>();
    base.forEach((s) => {
      if (s.use_cases) {
        s.use_cases.forEach((uc) => useCaseSet.add(uc));
      }
    });
    return [...useCaseSet].sort();
  }, [filterState.category, filterState.subcategory]);

  return { styles, allTags, allStyles, allSubcategories, allUseCases, total: allStyles.length };
}
