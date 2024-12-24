import React from 'react';
import { motion } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';

function FavoriteButton({ pokemonId }) {
  const [favorites, toggleFavorite] = useFavorites();
  const isFavorite = favorites.includes(pokemonId);

  return (
    <motion.button
      className={`favorite-btn ${isFavorite ? 'active' : ''}`}
      onClick={() => toggleFavorite(pokemonId)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isFavorite ? '♥' : '♡'}
    </motion.button>
  );
}
export default FavoriteButton;