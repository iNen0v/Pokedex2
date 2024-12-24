import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import PokemonCard from './PokemonCard';

function PokemonList({ pokemons, onPokemonSelect, selectedPokemonId, battleMode, onToggleBattleMode }) {
  const navigate = useNavigate();
  const favorites = useSelector(state => state.favorites);
  const [showFavorites, setShowFavorites] = useState(false);

  const displayedPokemons = showFavorites
    ? pokemons.filter(pokemon => favorites.includes(pokemon.id))
    : pokemons;

  const containerStyle = {
    width: '100%',
    backgroundColor: '#1a1a1a',
    padding: '20px'
  };

  const headerStyle = {
    maxWidth: '1400px',
    margin: '0 auto 20px',
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  };

  const buttonStyle = (isActive) => ({
    backgroundColor: isActive ? '#ff4444' : '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer'
  });

  const battleButtonStyle = {
    backgroundColor: battleMode ? '#ff4444' : '#dc2626',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const listStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const cardStyle = {
    width: '300px'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <button 
          style={buttonStyle(showFavorites)}
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites ? 'Show All' : 'Show Favorites'}
        </button>

        <button 
          style={battleButtonStyle}
          onClick={() => navigate('/battle')}
        >
          Battle Arena
        </button>

        {showFavorites && (
          <span style={{ color: 'white' }}>
            Showing {displayedPokemons.length} favorite Pokemon
          </span>
        )}
      </div>

      <div style={listStyle}>
        {displayedPokemons.map((pokemon, index) => (
          <motion.div
            key={pokemon.id}
            style={cardStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={(e) => onPokemonSelect && onPokemonSelect(pokemon)}
          >
            <Link 
              to={`/pokemon/${pokemon.id}`}
              style={{ textDecoration: 'none' }}
              onClick={(e) => battleMode && e.preventDefault()}
            >
              <PokemonCard
                pokemon={pokemon}
                isFavorite={favorites.includes(pokemon.id)}
                isSelected={selectedPokemonId === pokemon.id}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;