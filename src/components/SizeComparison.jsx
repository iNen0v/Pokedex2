// SizeComparison.jsx
import React from 'react';
import { motion } from 'framer-motion';

function SizeComparison({ pokemonHeight, pokemonName, pokemonId }) {  // добавяме pokemonId в props
  const HUMAN_HEIGHT = 170; // 170cm
  const SCALE_FACTOR = HUMAN_HEIGHT / 20;
  const pokemonHeightScaled = (pokemonHeight * 10 * SCALE_FACTOR) / 10;

  return (
    <div className="size-comparison">
      <div className="size-comparison__container">
        <motion.div 
          className="human-silhouette"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="height-label">170cm</span>
          👤
        </motion.div>
        <motion.div 
          className="pokemon-height"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ height: `${pokemonHeightScaled}px` }}
        >
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} alt={pokemonName} />
          <span className="height-label">{pokemonHeight * 10}cm</span>
        </motion.div>
      </div>
    </div>
  );
}

export default SizeComparison;