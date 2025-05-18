import React from "react";
import "./App.css";
import AllCharactersList from "./Leftside/AllCharactersList";
import FavouritesList from "./Rightside/FavouritesList";
import { DetailedCharacter } from "./types";
import CharacterDetailsModal from "./Modal/CharacterDetailsModal";
import { FavoritesProvider } from "./FavoritesContext";

function App() {
  const [selectedDetailedCharacter, setSelectedDetailedCharacter] =
    React.useState<DetailedCharacter | null>(null);
  const handleCharacterClick = (character: DetailedCharacter) => {
    setSelectedDetailedCharacter(character);
  };
  return (
    <FavoritesProvider>
      <div className="App">
        <AllCharactersList onCharacterClick={handleCharacterClick} />
        <FavouritesList />
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
