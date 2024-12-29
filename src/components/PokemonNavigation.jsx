import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function PokemonNavigation({ currentId }) {
  return (
    <div className="pokemon-navigation">
      {currentId > 1 && (
        <motion.div
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to={`/pokemon/${currentId - 1}`} 
            className="nav-button prev"
          >
            ← Previous
          </Link>
        </motion.div>
      )}
      <motion.div
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link 
          to={`/pokemon/${currentId + 1}`} 
          className="nav-button next"
        >
          Next →
        </Link>
      </motion.div>
    </div>
  );
}

export default PokemonNavigation;