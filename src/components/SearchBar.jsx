import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/SearchBar.scss';

function SearchBar({ pokemons, onSelect }) {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length >= 2) {
        setIsLoading(true);
        const filtered = pokemons
          .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
          .slice(0, 5);
        setSuggestions(filtered);
        setIsLoading(false);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search, pokemons]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex > -1) {
      onSelect(suggestions[selectedIndex]);
      setSearch('');
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  const handleSelect = (pokemon) => {
    onSelect(pokemon);
    setSearch('');
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search Pokémon..."
        className="search-bar__input"
      />
      
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="search-bar__suggestions"
          >
            {isLoading ? (
              <div className="search-bar__loading">Loading...</div>
            ) : (
              suggestions.map((pokemon, index) => (
                <motion.div
                  key={pokemon.id}
                  className={`search-bar__suggestion ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => handleSelect(pokemon)}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                >
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-8 h-8" />
                  <span className="capitalize">{pokemon.name}</span>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchBar;