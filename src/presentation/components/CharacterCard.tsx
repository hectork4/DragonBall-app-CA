import React, { useState } from 'react';
import { Character } from '../../domain/entities/Character';
import { Link } from 'react-router-dom';
import Fav from './Fav';
import styles from './CharacterCard.module.css';

interface CharacterCardProps {
  character: Character;
  onToggleFavorite: (id: string) => void;
  favorite: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles['character-wrapper']}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/character/${character.id}`}
        className={styles['character-link']}
      >
        <img loading="lazy" alt={character.name} src={character.image} />
      </Link>
      <div
        className={`${styles['character-presentation']} ${isHovered ? styles['hovered'] : ''}`}
      >
        <h4>{character.name}</h4>
        <div className={styles['favorite-button']}>
          <Fav id={character.id} isHovered={isHovered} />
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
