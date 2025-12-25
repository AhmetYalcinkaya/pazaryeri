import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FavoriteProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

interface FavoritesState {
  favorites: Record<string, FavoriteProduct>;
  addFavorite: (product: FavoriteProduct) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: FavoriteProduct) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: {},
      addFavorite: (product) =>
        set((state) => ({
          favorites: {
            ...state.favorites,
            [product.id]: product,
          },
        })),
      removeFavorite: (productId) =>
        set((state) => {
          const { [productId]: _, ...rest } = state.favorites;
          return { favorites: rest };
        }),
      isFavorite: (productId) => {
        return !!get().favorites[productId];
      },
      toggleFavorite: (product) => {
        const isFavorite = get().isFavorite(product.id);
        if (isFavorite) {
          get().removeFavorite(product.id);
        } else {
          get().addFavorite(product);
        }
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);

