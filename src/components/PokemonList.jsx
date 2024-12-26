import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import SkeletonPokemonCard from './SkeletonPokemonCard';
import '../styles/PokemonList.scss';

const LoadingAnimation = () => (
  <div className="loading-animation">
    <motion.div 
      className="loading-pokeball"
      animate={{ 
        rotate: 360,
        scale: [1, 1.2, 1]
      }}
      transition={{ 
        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
        scale: { duration: 1, repeat: Infinity }
      }}
    >
      <div className="pokeball"></div>
    </motion.div>
    <p>Loading Pokémon...</p>
  </div>
);

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

function PokemonList({ pokemons, onPokemonSelect, selectedPokemonId, battleMode, onToggleBattleMode, loading }) {
  const navigate = useNavigate();
  const favorites = useSelector(state => state.favorites);
  const [showFavorites, setShowFavorites] = useState(false);
  const [visiblePokemons, setVisiblePokemons] = useState([]);
  const loaderRef = useRef(null);
  const ITEMS_PER_BATCH = 12;

  const displayedPokemons = showFavorites
    ? pokemons.filter(pokemon => favorites.includes(pokemon.id))
    : pokemons;

  useEffect(() => {
    setVisiblePokemons(displayedPokemons.slice(0, ITEMS_PER_BATCH));
  }, [showFavorites, pokemons]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visiblePokemons.length < displayedPokemons.length) {
          setVisiblePokemons(prev => {
            const newPokemons = [
              ...prev,
              ...displayedPokemons.slice(prev.length, prev.length + ITEMS_PER_BATCH)
            ];
            requestAnimationFrame(() => {
              window.scrollTo({
                top: window.scrollY - 100,
                behavior: 'smooth'
              });
            });
            return newPokemons;
          });
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [visiblePokemons, displayedPokemons]);

  const containerStyle = {
    width: '100%',
    backgroundColor: 'rgba(30, 41, 90, 0.4)',
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
    <AnimatePresence mode="wait">
      <motion.div 
        style={containerStyle}
        initial="hidden"
        animate="show"
        variants={containerAnimation}
      >
        <div style={headerStyle}>
          <motion.button 
            style={buttonStyle(showFavorites)}
            onClick={() => setShowFavorites(!showFavorites)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showFavorites ? 'Show All' : 'Show Favorites'}
          </motion.button>

          <motion.button 
            style={battleButtonStyle}
            onClick={() => navigate('/battle')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Battle Arena
          </motion.button>

          {showFavorites && (
            <motion.span 
              style={{ color: 'white' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Showing {displayedPokemons.length} favorite Pokemon
            </motion.span>
          )}
        </div>

        {loading ? (
          <motion.div style={listStyle} variants={containerAnimation}>
            {[...Array(12)].map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                style={cardStyle}
                variants={itemAnimation}
              >
                <SkeletonPokemonCard />
              </motion.div>
            ))}
          </motion.div>
        ) : visiblePokemons.length === 0 ? (
          <motion.div 
            className="no-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h3>No Pokémon Found</h3>
            <p>Try adjusting your filters or search criteria</p>
          </motion.div>
        ) : (
          <>
            <motion.div style={listStyle} variants={containerAnimation}>
              {visiblePokemons.map((pokemon, index) => (
                <motion.div
                  key={pokemon.id}
                  style={cardStyle}
                  variants={itemAnimation}
                  onClick={(e) => onPokemonSelect && onPokemonSelect(pokemon)}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
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
            </motion.div>
            {visiblePokemons.length < displayedPokemons.length && (
              <motion.div 
                ref={loaderRef}
                className="pokemon-list__loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingAnimation />
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default PokemonList;