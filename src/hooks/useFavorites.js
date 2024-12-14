import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemonId) => {
    setFavorites(prevFavorites => 
      prevFavorites.includes(pokemonId)
        ? prevFavorites.filter(id => id !== pokemonId)
        : [...prevFavorites, pokemonId]
    );
  };

  return [favorites, toggleFavorite];
};