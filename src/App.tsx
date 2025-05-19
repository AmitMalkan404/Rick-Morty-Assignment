import React from "react";
import "./App.css";
import AllCharactersList from "./Leftside/AllCharactersList";
import FavoritesList from "./Rightside/FavoritesList";
import { DetailedCharacter } from "./types/types";
import CharacterDetailsModal from "./Modal/CharacterDetailsModal";
import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  const [selectedDetailedCharacter, setSelectedDetailedCharacter] =
    React.useState<DetailedCharacter | null>(null);

  /**
   * Handles when a character is clicked in the character list.
   * @param {DetailedCharacter} character - The character to show in the modal.
   */
  const handleCharacterClick = (character: DetailedCharacter) => {
    setSelectedDetailedCharacter(character);
  };
  return (
    <FavoritesProvider>
      <div className="App">
        <AllCharactersList onCharacterClick={handleCharacterClick} />
        <FavoritesList />
        {selectedDetailedCharacter && (
          <CharacterDetailsModal
            character={selectedDetailedCharacter}
            onClose={() => setSelectedDetailedCharacter(null)}
          />
        )}
      </div>
    </FavoritesProvider>
  );
}

export default App;
