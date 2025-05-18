import React from "react";
import "./characterCard.css";

interface CharacterCardProps {
  name: string;
  imageUrl: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = (
  props: CharacterCardProps
) => {
  return (
    <div className="character-card" onClick={props.onClick}>
      <img src={props.imageUrl} alt={props.name} className="character-image" />
      <h3 className="character-name">{props.name}</h3>
      <button
        className="favorite-button"
        onClick={(e) => {
          e.stopPropagation();
          props.onToggleFavorite();
        }}
      >
        {props.isFavorite? `❌ Remove from Favorites`:`❤️ Add to Favorites`}
      </button>
    </div>
  );
};

export default CharacterCard;
