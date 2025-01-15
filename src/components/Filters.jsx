import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Filters.scss';

const pokemonTypes = [
  "normal", "fire", "water", "grass", "electric", "ice", 
  "fighting", "poison", "ground", "flying", "psychic", 
  "bug", "rock", "ghost", "dark", "dragon", "steel", "fairy"
];

const typeColors = {
  normal: '#A8A878',
  fire: '#fa0707',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#c06c28',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dark: '#705848',
  dragon: '#7038F8',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

const typeIcons = {
  normal: '⚪',
  fire: '🔥',
  water: '💧',
  grass: '🌿',
  electric: '⚡',
  ice: '❄️',
  fighting: '👊',
  poison: '☠️',
  ground: '🌍',
  flying: '🦅',
  psychic: '🔮',
  bug: '🐛',
  rock: '🪨',
  ghost: '👻',
  dragon: '🐉',
  dark: '🌑',
  steel: '⚔️',
  fairy: '✨'
};

function getTypeButtonStyle(type, isActive) {
  return {
    backgroundColor: isActive ? typeColors[type] : `${typeColors[type]}30`,
    borderColor: typeColors[type],
    color: isActive ? '#fff' : typeColors[type],
  };
}

function Filters({ filters, setFilters }) {
  const handleClearFilters = () => {
    setFilters({
      types: [],
      showRare: false
    });
  };

  const handleTypeSelect = (type) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];

    setFilters({ ...filters, types: newTypes });
  };

  const hasActiveFilters = filters.types.length > 0 || filters.showRare;

  return (
    <motion.div 
      className="filters"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="filters__section">
        <div className="filters__quick">
          <button 
            className={`filters__quick-btn ${filters.showRare ? 'active' : ''}`}
            onClick={() => setFilters({ ...filters, showRare: !filters.showRare })}
          >
            ⭐ Rare Pokémon
          </button>
          <button 
            className="filters__quick-btn"
            onClick={() => setFilters({ 
              ...filters, 
              types: ['dragon', 'psychic'] 
            })}
          >
            🌟 Legendary Types
          </button>
          <button 
            className="filters__quick-btn"
            onClick={() => setFilters({ 
              ...filters, 
              types: ['fire', 'water', 'grass'] 
            })}
          >
            🌱 Starter Types
          </button>
        </div>

        <div className="filters__types">
          {pokemonTypes.map(type => (
            <button
              key={type}
              onClick={() => handleTypeSelect(type)}
              className={`filters__type-button ${filters.types.includes(type) ? 'active' : ''}`}
              style={getTypeButtonStyle(type, filters.types.includes(type))}
            >
              <span className="type-icon">{typeIcons[type]}</span>
              <span className="type-name">{type}</span>
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <motion.button 
          onClick={handleClearFilters}
          className="filters__clear"
          initial={{ opacity: 0.6 }}
          animate={{ 
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🔄 Clear All Filters
        </motion.button>
      )}
    </motion.div>
  );
}

export default Filters;