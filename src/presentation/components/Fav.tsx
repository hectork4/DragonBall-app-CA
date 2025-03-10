import { useFavoriteContext } from '../../infrastructure/store/FavoriteStore';
import styles from './Fav.module.css';

export default function Fav({
  id,
  isHovered,
}: {
  id: string;
  isHovered: boolean;
}) {
  const { addFavorite, removeFavorite, favorites } = useFavoriteContext();

  const handleToggleFavorite = () => {
    if (favorites.some((fav) => fav === id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const [label, emoji, color] = favorites.includes(id)
    ? [
        'Remove Character from favorites',
        '♥',
        isHovered ? { color: 'white' } : { color: 'red' },
      ]
    : ['Add Character to favorites', '♡'];

  return (
    <>
      <button
        className={styles['fav-button']}
        onClick={handleToggleFavorite}
        aria-label={`${label} button`}
        data-testid="fav"
      >
        <span role="img" aria-label={label} style={color}>
          {emoji}
        </span>
      </button>
    </>
  );
}
