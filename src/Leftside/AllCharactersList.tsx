import React, { use, useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import "./allCharactersList.css";
import { Character, DetailedCharacter } from "../types";
import SearchCharacter from "./SearchCharacter";
import { useFavorites } from "./../FavoritesContext";

export interface AllCharactersListProps {
  onCharacterClick: (character: DetailedCharacter) => void;
}

const AllCharactersList: React.FC<AllCharactersListProps> = (
  props: AllCharactersListProps
) => {
  const [page, setPage] = useState(1);
  const [currentCharacters, setCurrentCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isOnSearchMode, setIsOnSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { toggleFavorite, isFavorite } = useFavorites();

  const getPageRange = () => {
    const delta = 2;
    const start = Math.max(1, page - delta);
    const end = Math.min(totalPages, page + delta);
    const pages = [];

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handleCardClick = (characterId: number) => {
    const character = currentCharacters.find((char) => char.id === characterId);
    if (character) {
      props.onCharacterClick(createDetailedCharacter(character));
    }
  };

  // Create a DetailedCharacter instance from a Character
  const createDetailedCharacter = (character: any): DetailedCharacter => {
    return {
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      gender: character.gender,
      origin: character.origin?.name || "",
      episode: character.episode,
      imageUrl: character.image,
    };
  };

  const handleSearch = (searchTerm: string) => {
    setIsOnSearchMode(true);
    setSearchTerm(searchTerm);
    setPage(1);
  };

  const handleSearchClear = () => {
    setIsOnSearchMode(false);
    setSearchTerm("");
    setPage(1);
  };

  const fetchFilteredCharacters = async (searchTerm: string) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${searchTerm}&page=${page}`
      );
      const json = await response.json();
      setCurrentCharacters(json.results);
      setTotalPages(json?.info?.pages || 1);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setCurrentCharacters([]);
      setTotalPages(1);
    }
  };

  const fetchAllCharacters = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );
      const json = await response.json();
      setCurrentCharacters(json.results);
      setTotalPages(json.info.pages);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setCurrentCharacters([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (isOnSearchMode && searchTerm) {
      fetchFilteredCharacters(searchTerm).finally(() => setLoading(false));
    } else {
      fetchAllCharacters().finally(() => setLoading(false));
    }
  }, [page, searchTerm]);

  return (
    <div className="sidebar-wrapper">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <SearchCharacter
            value={searchTerm || ""}
            onSearch={handleSearch}
            onClear={handleSearchClear}
          />
          <div className="character-list-wrapper">
            {currentCharacters
              ? currentCharacters.map((character) => (
                  <CharacterCard
                    key={character.id}
                    name={character.name}
                    imageUrl={character.image}
                    onToggleFavorite={() => {
                      toggleFavorite(createDetailedCharacter(character));
                    }}
                    isFavorite={isFavorite(character.id)}
                    onClick={() => {
                      handleCardClick(character.id);
                    }}
                  />
                ))
              : `no characters found`}
          </div>
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              Prev
            </button>

            {getPageRange().map((pageNumber) => (
              <button
                key={pageNumber}
                className={pageNumber === page ? "active" : ""}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllCharactersList;
