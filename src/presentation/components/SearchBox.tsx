import React from 'react';
import { SearchIcon } from '../../assets/search';
import styles from './SearchBox.module.css';

interface SearchBoxProps {
  onSearchChange: (value: string, isEnterPressed?: boolean) => void;
  filterWord: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  onSearchChange,
  filterWord,
}) => {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const onEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearchChange(filterWord, true);
    }
  };

  return (
    <form
      role="search"
      aria-labelledby="search-label"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={styles['search']}>
        <SearchIcon />
        <input
          className={styles['search-input']}
          type="search"
          placeholder="SEARCH A CHARACTER"
          value={filterWord}
          onChange={onInputChange}
          onKeyDown={onEnterKeyPress}
          aria-label="Search for a character"
        />
      </div>
    </form>
  );
};

export default SearchBox;
