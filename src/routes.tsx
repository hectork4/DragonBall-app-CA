import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharactersPage from './presentation/pages/CharactersPage';
import CharacterDetailsPage from './presentation/pages/CharacterDetailsPage';
import Navbar from './presentation/components/Navbar';
import { FavoriteProvider } from './infrastructure/store/FavoriteStore';

const AppRoutes: React.FC = () => {
  return (
    <FavoriteProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<CharactersPage />} />
            <Route path="/character/:id" element={<CharacterDetailsPage />} />
            <Route path="/favorites" element={<CharactersPage />} />
          </Routes>
        </div>
      </Router>
    </FavoriteProvider>
  );
};

export default AppRoutes;
