import React, { useState } from "react";
import { useFavorites } from "./../FavoritesContext";
import FavoriteCharacterCard from "./FavoriteCharacterCard";
import "./favoritesList.css";

const FavouritesList: React.FC = () => {
  const [backgroundImage, setBackgroundImage] =
    useState<string>("assets/1.jpg");

  const { favorites, toggleFavorite } = useFavorites();

  const favoriteCharacters = Object.values(favorites);

  const handleBackgroundChange = () => {
    const randomIndex = Math.floor(Math.random() * 12) + 1;
    setBackgroundImage(`assets/${randomIndex}.jpg`);
  };

  return (
    <div
      className="favorites-list-wrapper"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease",
      }}
    >
      <div className="favorites-list-header">
        <h2>Favorites</h2>
        <button onClick={handleBackgroundChange}>Change Background!</button>
      </div>
      <div className="favorites-list">
        {favoriteCharacters.map((character) => (
          <FavoriteCharacterCard character={character} key={character.id} />
        ))}
      </div>
    </div>
  );
};

export default FavouritesList;
