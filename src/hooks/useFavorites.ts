import { useState, useCallback } from 'react';

const STORAGE_KEY = 'xhs-gallery-favorites';

function getStoredFavorites(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return new Set(JSON.parse(stored));
  } catch {
    // ignore parse errors
  }
  return new Set();
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(getStoredFavorites);

  const toggle = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // Ignore storage write errors (quota, privacy mode, etc.)
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.has(id), [favorites]);

  return { favorites, toggle, isFavorite, count: favorites.size };
}
