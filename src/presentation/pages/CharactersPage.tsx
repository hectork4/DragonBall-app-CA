import { useLocation } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import SearchBox from '../components/SearchBox';
import { useCharacters } from '../../hooks/useCharacter';
import Spinner from '../components/Spinner';
import styles from './CharactersPage.module.css';

const CharactersPage: React.FC = () => {
  const location = useLocation();
  const showFavorites = location.pathname === '/favorites';

  const {
    characters,
    filterWord,
    handleFilter,
    favorites,
    handleToggleFavorite,
    loading,
  } = useCharacters();

  if (loading && !characters.length) return <Spinner />;

  return (
    <div className={styles['App-main']}>
      <div className="App-results">
        <div className={styles['search-wrapper']}>
          <SearchBox onSearchChange={handleFilter} filterWord={filterWord} />
          <span className={styles['results-count']}>
            {showFavorites
              ? characters.filter((character) =>
                  favorites.includes(character.id),
                ).length
              : characters.length}{' '}
            RESULTS
          </span>
        </div>
        <div className={styles['characters-list']}>
          {characters.length > 0 &&
            characters.map((character) => {
              const isFavorite = favorites?.includes(character.id);
              if (showFavorites && !isFavorite) {
                return null;
              }
              return (
                <CharacterCard
                  key={character.id}
                  character={character}
                  onToggleFavorite={handleToggleFavorite}
                  favorite={isFavorite}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CharactersPage;
