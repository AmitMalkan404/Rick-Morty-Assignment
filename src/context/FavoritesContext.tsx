import React, { createContext, useContext, useState } from "react";
import { DetailedCharacter } from "../types/types";

type FavoritesMap = { [id: number]: DetailedCharacter };

interface FavoritesContextType {
  favorites: FavoritesMap;
  toggleFavorite: (character: DetailedCharacter) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoritesMap>({});

  /**
   * Toggles a character as favorite or removes it from favorites.
   * @param {DetailedCharacter} character - The character to toggle as favorite.
   */
  const toggleFavorite = (character: DetailedCharacter) => {
    setFavorites((prev) => {
      const newFavorites = { ...prev };
      if (newFavorites[character.id]) {
        delete newFavorites[character.id];
      } else {
        newFavorites[character.id] = character;
      }
      return newFavorites;
    });
  };

  /**
   * Checks if a character is marked as favorite.
   * @param {number} id - The ID of the character.
   * @returns {boolean} True if the character is a favorite, false otherwise.
   */
  const isFavorite = (id: number) => {
    return !!favorites[id];
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

/**
 * Custom hook to access the FavoritesContext.
 * @returns {FavoritesContextType} The favorites context value.
 * @throws Will throw an error if used outside of FavoritesProvider.
 */
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
