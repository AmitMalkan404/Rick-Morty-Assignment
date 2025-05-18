import React, { createContext, useContext, useState } from "react";
import { DetailedCharacter } from "./types";

type FavoritesMap = { [id: number]: DetailedCharacter };

interface FavoritesContextType {
  favorites: FavoritesMap;
  toggleFavorite: (character: DetailedCharacter) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoritesMap>({});

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

  const isFavorite = (id: number) => {
    return !!favorites[id];
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
