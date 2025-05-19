import React, { use, useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import "./allCharactersList.css";
import { Character, DetailedCharacter } from "../types/types";
import SearchCharacter from "./SearchCharacter";
import { useFavorites } from "../context/FavoritesContext";

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

  /**
   * Returns an array of page numbers for pagination, centered around the current page.
   * @returns {number[]} Array of page numbers to display.
   */
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

  /**
   * Handles the click event on a character card and triggers the parent callback with detailed character info.
   * @param {number} characterId - The ID of the character to handle.
   */
  const handleCardClick = (characterId: number) => {
    const character = currentCharacters.find((char) => char.id === characterId);
    if (character) {
      props.onCharacterClick(createDetailedCharacter(character));
    }
  };

  /**
   * Creates a DetailedCharacter object from a Character object.
   * @param {any} character - The character object to convert.
   * @returns {DetailedCharacter} The detailed character object.
   */
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

  /**
   * Handles the search action, enabling search mode and updating the search term.
   * @param {string} searchTerm - The search term entered by the user.
   */
  const handleSearch = (searchTerm: string) => {
    setIsOnSearchMode(true);
    setSearchTerm(searchTerm);
    setPage(1);
  };

  /**
   * Handles clearing the search, disabling search mode and resetting the search term.
   */
  const handleSearchClear = () => {
    setIsOnSearchMode(false);
    setSearchTerm("");
    setPage(1);
  };

  /**
   * Fetches characters filtered by the search term from the API.
   * @param {string} searchTerm - The search term to filter characters by.
   */
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

  /**
   * Fetches all characters for the current page from the API.
   */
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
