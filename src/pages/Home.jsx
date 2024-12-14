import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import PokemonList from '../components/PokemonList';
import Filters from '../components/Filters';
import LoadMore from '../components/LoadMore';
import { useFavorites } from '../hooks/useFavorites';

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [displayLimit, setDisplayLimit] = useState(20);
  const [sortBy, setSortBy] = useState('id');
  const [filters, setFilters] = useState({
    type: '',
    minAttack: '',
    minDefense: '',
  });
  const [favorites, toggleFavorite] = useFavorites();
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      const results = response.data.results;
      
      const detailedPokemons = await Promise.all(
        results.map(async (pokemon) => {
          const detailResponse = await axios.get(pokemon.url);
          return detailResponse.data;
        })
      );
      
      setPokemons(detailedPokemons);
    } catch (err) {
      console.error('Error fetching Pokemon:', err);
      setError('Error loading Pokémon');
    }
    setLoading(false);
  };

  const loadMore = () => {
    setDisplayLimit(prev => prev + 20);
  };

  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = !filters.type || pokemon.types.some(t => t.type.name === filters.type);
    const matchesAttack = !filters.minAttack || pokemon.stats[1].base_stat >= parseInt(filters.minAttack);
    const matchesDefense = !filters.minDefense || pokemon.stats[2].base_stat >= parseInt(filters.minDefense);
    const matchesFavorites = !showOnlyFavorites || favorites.includes(pokemon.id);
    
    return matchesSearch && matchesType && matchesAttack && matchesDefense && matchesFavorites;
  });

  const sortedPokemon = [...filteredPokemons].sort((a, b) => {
    switch(sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'attack':
        return b.stats[1].base_stat - a.stats[1].base_stat;
      case 'defense':
        return b.stats[2].base_stat - a.stats[2].base_stat;
      default:
        return a.id - b.id;
    }
  });

  const currentPokemons = sortedPokemon.slice(0, displayLimit);

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="logo-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
          alt="Pokémon Logo"
          className="pokemon-logo"
        />
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="id">Number</option>
          <option value="name">Name</option>
          <option value="attack">Attack</option>
          <option value="defense">Defense</option>
        </select>

        <Filters filters={filters} setFilters={setFilters} />

        <button onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}>
          {showOnlyFavorites ? 'Show All' : 'Show Favorites'}
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <PokemonList 
            pokemons={currentPokemons}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
          {displayLimit < sortedPokemon.length && (
            <LoadMore
              loadMore={loadMore}
              isLoading={loading}
            />
          )}
        </>
      )}
    </motion.div>
  );
}

export default Home;