import { create } from "zustand";

const useFavoriteStore = create((set) => ({
  favorites: [],
  addFavorite: (book) =>
    set((state) => ({
      favorites: [...state.favorites, book],
    })),
  removeFavorite: (bookKey) =>
    set((state) => ({
      favorites: state.favorites.filter((book) => book.key !== bookKey),
    })),
}));

export default useFavoriteStore;
