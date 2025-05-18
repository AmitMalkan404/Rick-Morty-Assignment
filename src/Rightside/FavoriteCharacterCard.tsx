import React from "react";
import { DetailedCharacter } from "../types";
import "./favoriteCharacterCard.css";
import { useFavorites } from "./../FavoritesContext";


interface FavoriteCharacterCardProps {
    character: DetailedCharacter;
}

const FavoriteCharacterCard: React.FC<FavoriteCharacterCardProps> = ({ character }) => {
    const { toggleFavorite } = useFavorites();


    return (
    <div className="favorite-character-card">
        <img
            src={character.imageUrl}
            alt={character.name}
            style={{ borderRadius: "8px" }}
        />
        <div className="favorite-character-details">
            <h2>{character.name}</h2>
            <p><strong>Status:</strong> {character.status}</p>
            <p><strong>Species:</strong> {character.species}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
            <p><strong>Origin:</strong> {character.origin}</p>
            <p><strong>Episodes:</strong> {character.episode.length}</p>
        </div>
        <button
            className="remove-favorite-button"
            onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(character);
            }}>X</button>
    </div>
    );
};

export default FavoriteCharacterCard;