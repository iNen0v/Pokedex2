import React from 'react';
import { motion } from 'framer-motion';
import BattleCard from './BattleCard';
import '../styles/BattleList.scss';

function BattleList({ pokemons, onPokemonSelect, selectedPokemonId }) {
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
    <div className="battle-container">
      <div className="battle-container__background-pattern" />
      <div className="battle-container__decorative-line" />
      <div className="battle-title">Battle Arena</div>
      
      <div className="content">
        <div className="control-panel">
          <div style={listStyle}>
            {pokemons?.map((pokemon, index) => (
              <motion.div
                key={pokemon.id}
                style={cardStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => onPokemonSelect(pokemon)}
                className={`${selectedPokemonId === pokemon.id ? 'selected' : ''}`}
              >
                <BattleCard
                  pokemon={pokemon}
                  isSelected={selectedPokemonId === pokemon.id}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BattleList;