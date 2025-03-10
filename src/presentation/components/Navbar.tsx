import React from 'react';
import { Link } from 'react-router-dom';
import dragonBallLogo from '../../assets/logo.png';
import { useCharacters } from '../../hooks/useCharacter';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const { favorites } = useCharacters();

  return (
    <nav className={styles['navbar']}>
      <div className={styles['nav-logo']}>
        <Link to="/">
          <img
            src={dragonBallLogo}
            alt="Dragon Ball Logo"
            className={styles['logo']}
          />
        </Link>
      </div>
      <div className={styles['nav-items']}>
        <Link to="/favorites">
          <span
            className={styles['fav-navbar']}
            aria-label={`Favorites: ${favorites.length} items`}
          >
            ❤️ {favorites.length}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
