export type Character = {
  id: number;
  name: string;
  image: string;
};

export type DetailedCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  episode: string[];
  origin: string;
  imageUrl: string;
};
