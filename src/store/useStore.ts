import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  theme: 'light' | 'dark' | 'system';
  favoriteTools: string[];
  searchHistory: string[];
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleFavorite: (toolId: string) => void;
  addSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  isFavorite: (toolId: string) => boolean;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      favoriteTools: [],
      searchHistory: [],
      setTheme: (theme) => set({ theme }),
      toggleFavorite: (toolId) => set((state) => ({
        favoriteTools: state.favoriteTools.includes(toolId)
          ? state.favoriteTools.filter(id => id !== toolId)
          : [...state.favoriteTools, toolId]
      })),
      addSearchHistory: (query) => {
        if (!query.trim()) return;
        set((state) => ({
          searchHistory: [
            query.trim(),
            ...state.searchHistory.filter(item => item !== query.trim()).slice(0, 9)
          ]
        }));
      },
      clearSearchHistory: () => set({ searchHistory: [] }),
      isFavorite: (toolId) => get().favoriteTools.includes(toolId)
    }),
    {
      name: 'mustknowai-storage',
      version: 1,
      // 只持久化需要的状态
      partialize: (state) => ({
        theme: state.theme,
        favoriteTools: state.favoriteTools,
        searchHistory: state.searchHistory
      })
    }
  )
); 