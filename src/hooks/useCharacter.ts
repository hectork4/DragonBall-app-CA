import { useState, useCallback, useRef, useEffect } from 'react';
import { CharacterRepositoryImpl } from '../infrastructure/repositories/CharacterRepositoryImpl';
import { GetCharactersByName } from '../application/useCases/GetCharactersByName';
import { Character } from '../domain/entities/Character';
import { useFavoriteContext } from '../infrastructure/store/FavoriteStore';
import { GetCharacters } from '../application/useCases/GetCharacters';

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filterWord, setFilterWord] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const filterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const characterRepository = new CharacterRepositoryImpl();
  const getCharacters = new GetCharacters(characterRepository);
  const getCharactersByName = new GetCharactersByName(characterRepository);
  const { addFavorite, removeFavorite, favorites } = useFavoriteContext();

  useEffect(() => {
    setLoading(true);
    getCharacters.execute(50).then(setCharacters);
    setLoading(false);
  }, []);

  const handleToggleFavorite = (id: string) => {
    console.log(favorites, id);
    if (favorites?.some((fav) => fav === id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const handleFilter = useCallback(
    (word: string, isEnterPressed: boolean = false) => {
      setFilterWord(word);

      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }

      const fetchCharacters = async () => {
        setLoading(true);
        try {
          const data =
            word.length === 0
              ? await getCharacters.execute(50)
              : await getCharactersByName.execute(word);
          setCharacters(data);
        } finally {
          setLoading(false);
        }
      };

      if (isEnterPressed || word.length === 0) {
        fetchCharacters();
      } else {
        filterTimeoutRef.current = setTimeout(fetchCharacters, 2000);
      }
    },
    [],
  );

  return {
    characters,
    handleFilter,
    filterWord,
    setFilterWord,
    loading,
    handleToggleFavorite,
    favorites,
  };
}
