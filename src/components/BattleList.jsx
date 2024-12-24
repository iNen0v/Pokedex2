import React from 'react';
import { motion } from 'framer-motion';
import BattleCard from './BattleCard';

function BattleList({ pokemons, onPokemonSelect, selectedPokemonId }) {
  const containerStyle = {
    width: '100%',
    backgroundColor: '#1a1a1a',
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
    <div style={containerStyle}>
      <div style={listStyle}>
        {pokemons?.map((pokemon, index) => (
          <motion.div
            key={pokemon.id}
            style={cardStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => handlePokemonClick(pokemon)}
            className={`${selectedPokemonId === pokemon.id ? 'ring-2 ring-red-500 rounded-lg' : ''}`}
          >
            <BattleCard
              pokemon={pokemon}
              isSelected={selectedPokemonId === pokemon.id}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default BattleList;