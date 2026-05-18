import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StickerState {
  inventory: Record<string, number>;
  toggleSticker: (id: string) => void;
  addSticker: (id: string) => void;
  removeSticker: (id: string) => void;
  setStickerCount: (id: string, count: number) => void;
  clearAlbum: () => void;
}

export const useStickerStore = create<StickerState>()(
  persist(
    (set) => ({
      inventory: {},
      toggleSticker: (id) =>
        set((state) => {
          const currentCount = state.inventory[id] || 0;
          let nextCount = currentCount + 1;
          if (nextCount > 2) nextCount = 0;
          return { inventory: { ...state.inventory, [id]: nextCount } };
        }),
      addSticker: (id) =>
        set((state) => ({ inventory: { ...state.inventory, [id]: (state.inventory[id] || 0) + 1 } })),
      removeSticker: (id) =>
        set((state) => {
          const currentCount = state.inventory[id] || 0;
          if (currentCount <= 0) return state;
          return { inventory: { ...state.inventory, [id]: currentCount - 1 } };
        }),
      setStickerCount: (id, count) =>
        set((state) => ({ inventory: { ...state.inventory, [id]: Math.max(0, count) } })),
      clearAlbum: () => set({ inventory: {} }),
    }),
    {
      name: 'panini-2026-v2-storage',
    }
  )
);
