"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchCampers } from "../lib/api";
import type { Camper, Filters } from "../lib/types";

interface CampersState {
  campers: Camper[];
  page: number;
  limit: number;
  isEnd: boolean;
  isLoading: boolean;
  error: string | null;
  filters: Filters;
  favorites: string[];

  setFilters: (filters: Filters) => void;
  resetAndFetch: () => Promise<void>;
  loadMore: () => Promise<void>;

  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const defaultFilters: Filters = {
  location: "",
  bodyType: null,
  equipment: [],
};

export const useCampersStore = create<CampersState>()(
  persist(
    (set, get) => ({
      campers: [],
      page: 1,
      limit: 4,
      isEnd: false,
      isLoading: false,
      error: null,
      filters: defaultFilters,
      favorites: [],

      setFilters: (filters) => {
        set({
          filters,
          page: 1,
          campers: [],
          isEnd: false,
        });
      },

      resetAndFetch: async () => {
        const { limit, filters } = get();
        set({
          isLoading: true,
          error: null,
          campers: [],
          page: 1,
          isEnd: false,
        });

        try {
          const data = await fetchCampers({ page: 1, limit, filters });

          set({
            campers: data,
            isEnd: data.length < limit,
          });
        } catch (error) {
          console.error(error);
          set({
            error:
              "The selected cars are not available, please contact us next time, but in the meantime you can look at others",
          });
        } finally {
          set({ isLoading: false });
        }
      },

      loadMore: async () => {
        const { page, limit, filters, isEnd, isLoading, campers } = get();
        if (isEnd || isLoading) return;

        const nextPage = page + 1;
        set({ isLoading: true, error: null });

        try {
          const data = await fetchCampers({ page: nextPage, limit, filters });

          set({
            campers: [...campers, ...data],
            page: nextPage,
            isEnd: data.length < limit,
          });
        } catch (error) {
          console.error(error);
          set({
            error:
              "The selected cars are not available, please contact us next time, but in the meantime you can look at others",
          });
        } finally {
          set({ isLoading: false });
        }
      },

      toggleFavorite: (id) => {
        const { favorites } = get();
        const exists = favorites.includes(id);

        set({
          favorites: exists
            ? favorites.filter((favId) => favId !== id)
            : [...favorites, id],
        });
      },

      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: "travel-trucks-store",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
