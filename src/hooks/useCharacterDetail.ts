import { useEffect, useState } from 'react';
import { GetCharacterDetails } from '../application/useCases/GetCharacterDetails';
import { CharacterRepositoryImpl } from '../infrastructure/repositories/CharacterRepositoryImpl';
import { Character } from '../domain/entities/Character';

export const useCharacterDetails = (id: string | undefined) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const characterRepository = new CharacterRepositoryImpl();
  const getCharacterDetails = new GetCharacterDetails(characterRepository);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getCharacterDetails
        .execute(id)
        .then((data) => {
          setCharacter(data);
        })
        .catch(() => {
          setCharacter(null);
        });
      setLoading(false);
    }
  }, [id]);

  return { character, loading };
};
