// BattleList.jsx
import React from 'react';
import { motion } from 'framer-motion';
import BattleCard from './BattleCard';
import '../styles/BattleList.scss';

function BattleList({ pokemons, onPokemonSelect, selectedPokemonId, opponentId }) {
  const containerStyle = {
    width: '100%',
    padding: '20px'
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

  const handlePokemonClick = (pokemon) => {
    console.log('Pokemon clicked:', pokemon);
    onPokemonSelect(pokemon);
  };

  return (
    <div style={containerStyle} className="battle-container">
      <div style={listStyle}>
        {pokemons?.map((pokemon, index) => (
          <motion.div
            key={pokemon.id}
            style={cardStyle}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              scale: selectedPokemonId === pokemon.id || opponentId === pokemon.id ? 1.02 : 1,
              boxShadow: selectedPokemonId === pokemon.id 
                ? '0 0 20px rgba(255, 215, 0, 0.5)'
                : opponentId === pokemon.id 
                ? '0 0 20px rgba(255, 215, 0, 0.3)'
                : 'none'
            }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.05 
            }}
            onClick={() => handlePokemonClick(pokemon)}
            className={`battle-card-wrapper ${
              selectedPokemonId === pokemon.id 
                ? 'selected' 
                : opponentId === pokemon.id 
                ? 'opponent'
                : ''
            }`}
            whileHover={{ 
              scale: selectedPokemonId === pokemon.id || opponentId === pokemon.id ? 1.02 : 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <BattleCard
              pokemon={pokemon}
              isSelected={selectedPokemonId === pokemon.id || opponentId === pokemon.id}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default BattleList;