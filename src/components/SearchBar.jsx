import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/SearchBar.scss';

function SearchBar({ pokemons, onSelect }) {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (search.length >= 2) {
      const filtered = pokemons
        .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [search, pokemons]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        if (selectedIndex > -1) {
          handleSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        clearSearch();
        break;
      default:
        break;
    }
  };

  const handleSelect = (pokemon) => {
    onSelect(pokemon);
    setSearch(pokemon.name);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const clearSearch = () => {
    setSearch('');
    setSuggestions([]);
    setSelectedIndex(-1);
    onSelect({ name: '' }); // Изпращаме празен обект за да покажем всички покемони
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value === '') {
      clearSearch();
    } else {
      onSelect({ name: value }); // Актуализираме търсенето при всяка промяна
    }
  };

  return (
    <div className="search-bar">
      <div className="search-bar__input-container">
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search Pokémon..."
          className="search-bar__input"
          autoComplete="off"
        />
        {search && (
          <button 
            onClick={clearSearch}
            className="search-bar__clear-button"
          >
            ×
          </button>
        )}
      </div>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="search-bar__suggestions"
          >
            {suggestions.map((pokemon, index) => (
              <motion.div
                key={pokemon.id}
                className={`search-bar__suggestion ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleSelect(pokemon)}
                whileHover={{ 
                  scale: 1.02, 
                  backgroundColor: 'rgba(59, 130, 246, 0.2)' 
                }}
              >
                <img 
                  src={pokemon.sprites.front_default} 
                  alt={pokemon.name} 
                  className="search-bar__pokemon-sprite" 
                />
                <span className="search-bar__pokemon-name">
                  {pokemon.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchBar;