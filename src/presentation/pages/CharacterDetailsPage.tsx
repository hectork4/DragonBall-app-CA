import React from 'react';
import { useParams } from 'react-router-dom';
import { useCharacterDetails } from '../../hooks/useCharacterDetail';
import Fav from '../components/Fav';
import Spinner from '../components/Spinner';
import styles from './CharacterDetailsPage.module.css';

const CharacterDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { character, loading } = useCharacterDetails(id);

  if (loading) {
    return <Spinner />;
  }

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <>
      <div className={styles['single-character-wrapper']}>
        <div className={styles['character-image']}>
          <img src={character.image} alt={character.name} />
        </div>
        <div className={styles['character-desc']}>
          <div className={styles['character-title']}>
            <h3>{character.name}</h3>
            <Fav id={character.id} isHovered={false} />
          </div>
          <p>{character.description}</p>
        </div>
      </div>
      {character.transformations?.length ? (
        <div className={styles['transformation-wrapper']}>
          <h2>Transformations</h2>
          <div className={styles['transformations-list']}>
            {character.transformations.map((transformation) => (
              <div
                className={styles['transformations']}
                key={transformation.id}
              >
                <div className={styles['img-wrapper']}>
                  <img src={transformation.image} alt={transformation.name} />
                </div>
                <p className={styles['transformation-title']}>
                  {transformation.name}
                </p>
                <p>KI: {transformation.ki}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CharacterDetailsPage;
