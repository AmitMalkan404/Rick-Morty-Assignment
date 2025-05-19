// CharacterDetailsModal displays detailed information about a character in a modal dialog.
import React from "react";
import "./characterDetailsModal.css";
import { DetailedCharacter } from "../types/types";

type CharacterDetailsModalProps = {
  character: DetailedCharacter;
  onClose: () => void;
};

const CharacterDetailsModal: React.FC<CharacterDetailsModalProps> = ({
  character,
  onClose,
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{character.name}</h2>
          <button className="close-button" onClick={onClose}>
            ✖
          </button>
        </div>
        <div className="modal-body">
          <img
            src={character.imageUrl}
            alt={character.name}
            className="character-image"
          />
          <p>
            <strong>Status:</strong> {character.status}
          </p>
          <p>
            <strong>Species:</strong> {character.species}
          </p>
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
          <p>
            <strong>Episode Count:</strong> {character.episode.length}
          </p>
          <p>
            <strong>Origin:</strong> {character.origin}
          </p>
        </div>
      </div>
    </div>
  );
};
export default CharacterDetailsModal;
